// modules/question/model/question.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema({ discriminatorKey: 'questionType', timestamps: true })
export class Question {
  // @Prop({ required: true })
  // questionType: string; // e.g., 'mcq', 'writing', etc.

  @Prop({ required: true })
  statement: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);


// import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
// import mongoose, { Document } from 'mongoose';

// export type QuestionDocument = Question & Document;

// @Schema()
// export class Question {
//   // @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
//   // id: string; // Maps to MongoDB's _id

//   @Prop({ required: true })
//   statement: string;

//   @Prop({ type: [String], required: false })
//   options?: string[];

//   @Prop({ required: true })
//   max_marks: number;
// }

// export const QuestionSchema = SchemaFactory.createForClass(Question);
