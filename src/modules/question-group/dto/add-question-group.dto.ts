import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddQuestionGroupDto {
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

  // @IsNotEmpty()
  // @IsString()
  // text: string;

  @IsArray()
  @IsNotEmpty()
  questions: string[]; // List of question IDs
}
