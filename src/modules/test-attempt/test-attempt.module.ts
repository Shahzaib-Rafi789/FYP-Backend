import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TestAttemptService } from './test-attempt.service';
import { TestAttemptController } from './test-attempt.controller';
import { TestAttempt, TestAttemptSchema } from './entities/test-attempt.entity';
import { TestModule } from '../test/test.module';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: TestAttempt.name, schema: TestAttemptSchema }]),
      TestModule,
    ],
  controllers: [TestAttemptController],
  providers: [TestAttemptService],
  exports: [TestAttemptService]
})
export class TestAttemptModule {}
