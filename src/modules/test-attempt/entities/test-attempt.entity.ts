import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class TestAttempt extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Test', required: true })
  testId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ default: 'in_progress' })
  status: string;

  @Prop({ default: Date.now })
  startedAt: Date;

  @Prop([{
    moduleName: String,
    status: { type: String, default: 'pending' },
    startedAt: Date,
    completedAt: Date
  }])
  modules: Array<{
    moduleName: string;
    status: string;
    startedAt?: Date;
    completedAt?: Date;
  }>;
}

export const TestAttemptSchema = SchemaFactory.createForClass(TestAttempt);