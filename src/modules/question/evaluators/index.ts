// questions/evaluators/index.ts
import { Injectable } from '@nestjs/common';
import { McqEvaluator } from './mcq.evaluator';
import { FillInBlankEvaluator } from './fillInBlank.evaluator';
// import { MatchingEvaluator } from './matching.evaluator';
import { QuestionEvaluator } from '../../../common/interfaces/evaluator.interface';
import { SpeakingEvaluator } from './speaking.evaluator';

@Injectable()
export class EvaluatorFactory {
  constructor(
    private readonly mcqEvaluator: McqEvaluator,
    private readonly fillInBlankEvaluator: FillInBlankEvaluator,
    private readonly speakingQuestionEvaluator: SpeakingEvaluator
    // private readonly matchingEvaluator: MatchingEvaluator,
  ) {}

  getEvaluator(questionType: string): QuestionEvaluator {
    switch (questionType) {
      case 'mcq':
        return this.mcqEvaluator;
      case 'fillInBlank':
        return this.fillInBlankEvaluator;
      case 'speaking-question':
        return this.speakingQuestionEvaluator
    //   case 'matching':
    //     return this.matchingEvaluator;
      default:
        throw new Error(`No evaluator found for question type: ${questionType}`);
    }
  }
}