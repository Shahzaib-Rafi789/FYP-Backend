import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  statement: string; // Question text

  @IsArray()
  @IsOptional()
  options?: string[]; // Optional list of options for MCQ-type questions

  @IsNotEmpty()
  max_marks: number;
}
