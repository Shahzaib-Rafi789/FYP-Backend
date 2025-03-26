import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
// import { QuestionGroup } from '../question-group/question-group.model';

export type PartDocument = Part & Document;

@Schema()
export class Part {
  @Prop({ required: true })
  module_type: string; // E.g., 'reading', 'listening'

  @Prop({ required: true })
  sequence: number;

  @Prop({ required: true })
  heading: string;

  @Prop({ required: false })
  passage?: string;

  @Prop({ required: false })
  audio_link?: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuestionGroup' }],
  })
  question_group: mongoose.Schema.Types.ObjectId[]; // Array of QuestionGroup IDs

  @Prop({ default: 0 })
  total_marks: number;
}

export const PartSchema = SchemaFactory.createForClass(Part);
