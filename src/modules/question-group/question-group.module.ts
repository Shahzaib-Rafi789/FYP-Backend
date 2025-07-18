import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionGroupService } from './question-group.service';
import { QuestionGroupController } from './question-group.controller';
import { QuestionGroup, QuestionGroupSchema } from './question-group.model';
import { QuestionModule } from '../question/question.module';
import { QuestionGroupEvaluator } from './question-group.evaluator';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QuestionGroup.name, schema: QuestionGroupSchema },
    ]),
    QuestionModule,
  ],
  controllers: [QuestionGroupController],
  providers: [QuestionGroupService, QuestionGroupEvaluator],
  exports: [QuestionGroupService],
})
export class QuestionGroupModule {}
