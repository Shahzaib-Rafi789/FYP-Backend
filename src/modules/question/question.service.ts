import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from './question.model';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionResponseDto } from './dto/question-response.dto';
import { EvaluatorFactory } from './evaluators/index';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    private evaluatorFactory: EvaluatorFactory,
  ) {}

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<QuestionResponseDto> {
    const createdQuestion = new this.questionModel(createQuestionDto);
    const savedQuestion = await createdQuestion.save();
    return new QuestionResponseDto(savedQuestion);
  }

  async getQuestionById(id: string): Promise<QuestionResponseDto> {
    const question = await this.questionModel.findById(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return new QuestionResponseDto(question);
  }

  async getAllQuestions(): Promise<QuestionResponseDto[]> {
    const questions = await this.questionModel.find();
    return questions.map((question) => new QuestionResponseDto(question));
  }

  async deleteAllQuestions(): Promise<{ deletedCount: number }> {
    const result = await this.questionModel.deleteMany({});
    return { deletedCount: result.deletedCount };
  }
  async evaluateAnswer(questionId: string, response: any) {
    const question = await this.getQuestionById(questionId);
    const evaluator = this.evaluatorFactory.getEvaluator(question.questionType);
    return evaluator.evaluate(question, response);
  }
}

