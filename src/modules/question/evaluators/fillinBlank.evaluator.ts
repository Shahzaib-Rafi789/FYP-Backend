import { QuestionEvaluator, EvaluationResult } from '../../../common/interfaces/evaluator.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FillInBlankEvaluator implements QuestionEvaluator {
  evaluate(question: any, response: any): EvaluationResult {
    console.log(question)
    console.log(response)
    const isCorrect = question.correctAnswer.toLowerCase() === response.answer.toLowerCase().trim();
    return {
      marksObtained: isCorrect ? question.max_marks : 0,
      isCorrect,
    };
  }
}