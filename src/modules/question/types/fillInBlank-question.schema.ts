import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Question } from '../question.model';

@Schema()
export class FillInBlankQuestion extends Question {
  @Prop({ required: true })
  correctAnswer: string;
}

export const FillInBlankQuestionSchema = SchemaFactory.createForClass(FillInBlankQuestion);
