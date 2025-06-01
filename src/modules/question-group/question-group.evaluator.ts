
import { Injectable } from '@nestjs/common';
// import { EvaluatorFactory } from '../question/evaluators';
// import { QuestionEvaluator } from 'src/common/interfaces/evaluator.interface';
import { QuestionService } from '../question/question.service';

@Injectable()
export class QuestionGroupEvaluator {
  constructor(
    // private readonly evaluatorFactory: EvaluatorFactory,
    private readonly questionService: QuestionService
  ) {}

  async evaluateGroup(questionGroup: any) {
    let totalScore = 0;
    const questionResults = [];
    console.log(questionGroup)

    for (const question of questionGroup.questions) {
      const result = await this.questionService.evaluateAnswer(question.questionId, question.response);
    //   const evaluator: QuestionEvaluator = this.evaluatorFactory.getEvaluator(question);
    //   const response = responses[question.questionId]; // Or your ID field
    //   const result = await evaluator.evaluate(question, response);
      
      totalScore += result.marksObtained;
      questionResults.push({
        questionId: question.questionId,
        ...result
      });
    }

    return {
      Total: totalScore,
      Obtained: questionGroup.total_marks,
      Percentage: totalScore/questionGroup.total_marks,
      questionResults,
    //   groupPassed: totalScore >= (questionGroup.total_marks * 0.6) // Example 60% threshold
    };
  }
}