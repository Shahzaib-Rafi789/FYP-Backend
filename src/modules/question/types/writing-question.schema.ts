import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Question } from '../question.model';

@Schema()
export class WritingQuestion extends Question {
  @Prop()
  time_allowed: number;

  @Prop({ required: true })
  min_words: number;
}

export const WritingQuestionSchema = SchemaFactory.createForClass(WritingQuestion);
