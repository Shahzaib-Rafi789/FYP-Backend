
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AudioDocument = Audio & Document;

@Schema()
export class Audio {
  @Prop({ required: true })
  url: string;

//   @Prop()
//   originalName: string;

  @Prop()
  format: string;

  @Prop()
  size: number;

//   @Prop({ default: Date.now })
//   uploadedAt: Date;
}

export const AudioSchema = SchemaFactory.createForClass(Audio);
