import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionGroup, QuestionGroupDocument } from './question-group.model';
import { CreateQuestionGroupDto } from './dto/create-question-group.dto';
import { QuestionGroupResponseDto } from './dto/question-group-response.dto';
import { QuestionService } from '../question/question.service';
import { CreateQuestionDto } from '../question/dto/create-question.dto';
import { AddQuestionGroupDto } from './dto/add-question-group.dto';
import { QuestionGroupEvaluator } from './question-group.evaluator';

@Injectable()
export class QuestionGroupService {
  constructor(
    @InjectModel(QuestionGroup.name)
    private readonly questionGroupModel: Model<QuestionGroupDocument>,
    private readonly questionService: QuestionService,
    private readonly questionGroupEvaluator: QuestionGroupEvaluator
  ) {}

  async createQuestionGroup(
    createQuestionGroupDto: CreateQuestionGroupDto,
  ): Promise<QuestionGroupResponseDto> {
    const questions = [];

    // Create each question and collect their IDs
    for (const questionDto of createQuestionGroupDto.questions) {
      const createdQuestion =
        await this.questionService.createQuestion(questionDto); // Create question
      questions.push(createdQuestion.questionId); // Collect the ID of the created question
    }

    // Construct the AddQuestionGroupDto
    const addQuestionGroupDto: AddQuestionGroupDto = {
      group_type: createQuestionGroupDto.group_type,
      total_marks: createQuestionGroupDto.total_marks,
      ans_limit: createQuestionGroupDto.ans_limit,
      instructions: createQuestionGroupDto.instructions,
      group_question: createQuestionGroupDto.group_question,
      group_options: createQuestionGroupDto.group_options,
      // text: createQuestionGroupDto.text,
      questions, // Array of question IDs
    };

    // Save the question group in the database
    const questionGroup = new this.questionGroupModel(addQuestionGroupDto);
    const savedGroup = await questionGroup.save();

    // Format the saved group as a Response DTO
    return new QuestionGroupResponseDto(savedGroup);
  }

  async getQuestionGroupById(id: string): Promise<QuestionGroupResponseDto> {
    const questionGroup = await this.questionGroupModel
      .findById(id)
      .populate('questions');
    if (!questionGroup) {
      throw new NotFoundException(`Question Group with ID ${id} not found`);
    }
    return new QuestionGroupResponseDto(questionGroup);
  }

  async getAllQuestionGroups(): Promise<QuestionGroupResponseDto[]> {
    const questionGroups = await this.questionGroupModel
      .find()
      .populate('questions');
    return questionGroups.map((group) => new QuestionGroupResponseDto(group));
  }

  async deleteAllQuestionGroups(): Promise<{ deletedCount: number }> {
    const result = await this.questionGroupModel.deleteMany({});
    return { deletedCount: result.deletedCount };
  }

  async evaluateQuestionGroupAnswers(questionGroup: any) {
    const group = await this.getQuestionGroupById(questionGroup.questionGroupId);
    questionGroup['total_marks'] = group.total_marks;
    return this.questionGroupEvaluator.evaluateGroup(questionGroup);
  }
}
