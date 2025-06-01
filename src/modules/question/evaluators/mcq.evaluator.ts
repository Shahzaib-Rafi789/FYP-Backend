import { QuestionEvaluator, EvaluationResult } from '../../../common/interfaces/evaluator.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class McqEvaluator implements QuestionEvaluator {
  async evaluate(question: any, response: any): Promise<EvaluationResult> {
    const isCorrect = question.correctAnswer === response.answer;
    return {
      marksObtained: isCorrect ? question.max_marks : 0,
      isCorrect,
    //   feedback: isCorrect ? 'Correct answer!' : `Incorrect. The right answer was ${question.correctAnswer}`
    };
  }
}