import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateQuestionGroupDto {
  @IsOptional()
  @IsString()
  group_type?: string;

  @IsOptional()
  total_marks?: number;

  @IsOptional()
  ans_limit?: number;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsString()
  group_question?: string;

  @IsOptional()
  @IsArray()
  group_options?: string[];

  // @IsOptional()
  // @IsString()
  // text?: string;

  @IsOptional()
  @IsArray()
  questions?: string[]; // List of question IDs
}
