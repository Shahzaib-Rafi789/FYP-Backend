import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Question, QuestionSchema } from './question.model';
import { MCQQuestionSchema } from './types/mcq-question.schema';
import { WritingQuestionSchema } from './types/writing-question.schema';
import { FillInBlankQuestionSchema } from './types/fillInBlank-question.schema';
import { SpeakingQuestionSchema } from './types/speaking-question.schema';
import { EvaluatorFactory } from './evaluators';
import { McqEvaluator } from './evaluators/mcq.evaluator';
import { FillInBlankEvaluator } from './evaluators/fillInBlank.evaluator';
import { AudioService } from '../audio/audio.service';
import { SpeakingEvaluator } from './evaluators/speaking.evaluator';
import { SpeechEvaluationModule } from 'src/common/ai/speech-evaluation.module';
import { AudioModule } from '../audio/audio.module';

@Module({
  imports: [
    SpeechEvaluationModule,
    AudioModule,
    MongooseModule.forFeatureAsync([
      {
        name: Question.name,
        useFactory: () => {
          const schema = QuestionSchema;
          schema.discriminator('mcq', MCQQuestionSchema);
          schema.discriminator('fillInBlank', FillInBlankQuestionSchema);
          schema.discriminator('speaking-question', SpeakingQuestionSchema);
          schema.discriminator('writingPara', WritingQuestionSchema);
          return schema;
        },
      },
    ])
  ],
  controllers: [QuestionController],
  providers: [QuestionService, EvaluatorFactory, McqEvaluator, FillInBlankEvaluator, SpeakingEvaluator],
  exports: [QuestionService, EvaluatorFactory],
})
export class QuestionModule {}
