import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class TestModule extends Document {
  @Prop({ required: true })
  module_type: string; // e.g., Reading, Writing, etc.

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref:  'Part' }] })
  parts: mongoose.Schema.Types.ObjectId[]; // Reference to Part documents
}

export const TestModuleSchema = SchemaFactory.createForClass(TestModule);
