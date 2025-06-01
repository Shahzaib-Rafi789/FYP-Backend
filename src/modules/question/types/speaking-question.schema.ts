import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Question } from '../question.model';

@Schema()
export class SpeakingQuestion extends Question {
  @Prop({ type: [String] })
  prompts: string[];

  @Prop({ required: true })
  timeToThink: number;
}

export const SpeakingQuestionSchema = SchemaFactory.createForClass(SpeakingQuestion);
