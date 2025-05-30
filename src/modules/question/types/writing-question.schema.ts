import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Question } from '../question.model';

@Schema()
export class WritingQuestion extends Question {
  @Prop()
  resourceUrl?: string;

  @Prop({ required: true })
  minimumWords: number;
}

export const WritingQuestionSchema = SchemaFactory.createForClass(WritingQuestion);
