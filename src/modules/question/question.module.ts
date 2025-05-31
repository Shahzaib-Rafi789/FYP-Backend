import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Question, QuestionSchema } from './question.model';
import { MCQQuestionSchema } from './types/mcq-question.schema';
import { WritingQuestionSchema } from './types/writing-question.schema';
import { FillInBlankQuestionSchema } from './types/fillInBlank-question.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Question.name,
        useFactory: () => {
          const schema = QuestionSchema;
          schema.discriminator('mcq', MCQQuestionSchema);
          schema.discriminator('fillInBlank', FillInBlankQuestionSchema);
          schema.discriminator('writingPara', WritingQuestionSchema);
          return schema;
        },
      },
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
