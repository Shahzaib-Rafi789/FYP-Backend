import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateQuestionGroupDto } from '../../question-group/dto/create-question-group.dto';

export class CreatePartDto {
  @IsNotEmpty()
  @IsString()
  module_type: string;

  @IsNotEmpty()
  @IsNumber()
  sequence: number;

  @IsNotEmpty()
  @IsString()
  heading: string;

  @IsOptional()
  @IsString()
  passage?: string;

  @IsOptional()
  @IsString()
  audio_link?: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  question_group: CreateQuestionGroupDto[]; // List of QuestionGroup IDs
}
