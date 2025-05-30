import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Question } from '../question.model';

@Schema()
export class MCQQuestion extends Question {
  @Prop({ required: true, type: [String] })
  options: string[];

  @Prop({ required: true })
  correctAnswer: string;
}

export const MCQQuestionSchema = SchemaFactory.createForClass(MCQQuestion);
