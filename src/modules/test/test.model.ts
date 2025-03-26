import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema()
export class Test extends Document {
  @Prop({ required: true })
  alias: string; // e.g., "Kangaroo"

  @Prop({ default: true })
  isPublic: boolean;

  @Prop({ required: true })
  test_owner: string; // e.g., "Platform" or a specific coach

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TestModule' }],
  })
  modules: mongoose.Schema.Types.ObjectId[]; // References to Module documents
}

export const TestSchema = SchemaFactory.createForClass(Test);
