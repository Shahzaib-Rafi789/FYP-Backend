import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateQuestionDto } from '../../question/dto/create-question.dto';

export class CreateQuestionGroupDto {
  @IsNotEmpty()
  @IsString()
  group_type: string;

  @IsNotEmpty()
  total_marks: number;

  @IsNotEmpty()
  ans_limit: number;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsString()
  group_question?: string;

  @IsOptional()
  @IsArray()
  group_options?: string[];

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsArray()
  questions: CreateQuestionDto[]; // List of question IDs
}
