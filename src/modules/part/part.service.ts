import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Part, PartDocument } from './part.model';
import { CreatePartDto } from './dto/create-part.dto';
import { AddPartDto } from './dto/add-part.dto';
import { PartResponseDto } from './dto/part-response.dto';
import { QuestionGroupService } from '../question-group/question-group.service';

@Injectable()
export class PartService {
  constructor(
    @InjectModel(Part.name) private readonly partModel: Model<PartDocument>,
    private readonly questionGroupService: QuestionGroupService,
  ) {}

  async createPart(createPartDto: CreatePartDto): Promise<PartResponseDto> {
    const questionGroupIds = [];

    // Create question groups and collect their IDs
    for (const questionGroupDto of createPartDto.question_groups) {
      const createdGroup =
        await this.questionGroupService.createQuestionGroup(questionGroupDto);
      questionGroupIds.push(createdGroup.questionGroupId); // Use the Response DTO's `id` property
    }

    // Construct the AddPartDto
    const addPartDto: AddPartDto = {
      module_type: createPartDto.module_type,
      sequence: createPartDto.sequence,
      heading: createPartDto.heading,
      passage: createPartDto.passage,
      audio_link: createPartDto.audio_link,
      total_marks: createPartDto.total_marks,
      question_groups: questionGroupIds, // Array of question group IDs
    };

    // Save the part in the database
    const part = new this.partModel(addPartDto);
    const savedPart = await part.save();

    // Format the saved part as a Response DTO
    return new PartResponseDto(savedPart);
  }

  async getPartById(id: string): Promise<PartResponseDto> {
    const part = await this.partModel.findById(id).populate('question_groups');
    if (!part) {
      throw new NotFoundException(`Part with ID ${id} not found.`);
    }
    return new PartResponseDto(part);
  }

  async getAllParts(): Promise<PartResponseDto[]> {
    const parts = await this.partModel.find().populate({
      path: 'question_groups',
      populate: {
        path: 'questions', // Populate questions inside question_group
      },
    });

    return parts.map((part) => new PartResponseDto(part));
  }

  async deleteAllParts(): Promise<{ deletedCount: number }> {
    const result = await this.partModel.deleteMany({});
    return { deletedCount: result.deletedCount };
  }
}
