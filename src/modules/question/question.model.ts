import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  // @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  // id: string; // Maps to MongoDB's _id

  @Prop({ required: true })
  statement: string;

  @Prop({ type: [String], required: false })
  options?: string[];

  @Prop({ required: true })
  max_marks: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
