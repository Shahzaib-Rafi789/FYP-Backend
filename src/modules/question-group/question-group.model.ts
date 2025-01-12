import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Question } from '../question/question.model';

export type QuestionGroupDocument = QuestionGroup & Document;

@Schema()
export class QuestionGroup {
  @Prop({ required: true })
  group_type: string;

  @Prop({ required: true })
  total_marks: number;

  @Prop({ required: true })
  ans_limit: number;

  @Prop({ required: false })
  instructions?: string;

  @Prop({ required: false })
  group_question?: string;

  @Prop({ required: false })
  group_options?: string[];

  @Prop({ required: true })
  text: string;

  // Update this to store only the references (IDs) of questions
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }] })
  questions: mongoose.Schema.Types.ObjectId[]; // This will store question IDs only
}

export const QuestionGroupSchema = SchemaFactory.createForClass(QuestionGroup);
