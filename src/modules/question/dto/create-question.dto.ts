// import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';

// export class CreateQuestionDto {
//   @IsString()
//   statement: string; // Question text

//   @IsArray()
//   @IsOptional()
//   options?: string[]; // Optional list of options for MCQ-type questions

//   @IsNotEmpty()
//   max_marks: number;
// }

// modules/question/dto/create-question.dto.ts
export class CreateQuestionDto {
  // type: string;          // 'mcq', 'writing', etc.
  statement: string;
  max_marks: number;

  // MCQ only
  options?: string[];
  correctAnswer?: string;

  // Writing only
  resourceUrl?: string;
  minimumWords?: number;
}

