
import { Injectable } from '@nestjs/common';
// import { EvaluatorFactory } from '../question/evaluators';
// import { QuestionEvaluator } from 'src/common/interfaces/evaluator.interface';
import { QuestionGroupService } from '../question-group/question-group.service';

@Injectable()
export class PartEvaluator {
  constructor(
    // private readonly evaluatorFactory: EvaluatorFactory,
    private readonly questionGroupService: QuestionGroupService
  ) {}

  async evaluatePart(part: any) {
    let totalScore = 0;
    const groupResults = [];
    console.log(part)

    for (const group of part.question_groups)  {
      const result = await this.questionGroupService.evaluateQuestionGroupAnswers(group);
    //   const evaluator: QuestionEvaluator = this.evaluatorFactory.getEvaluator(question);
    //   const response = responses[question.questionId]; // Or your ID field
    //   const result = await evaluator.evaluate(question, response);
      
      totalScore += result.Obtained;
      groupResults.push({
        questionGroupId: group.questionGroupId,
        ...result
      });
    }

    return {
      Obtained: totalScore,
      Total: part.total_marks,
      Percentage: totalScore/part.total_marks,
      groupResults,
    //   groupPassed: totalScore >= (questionGroup.total_marks * 0.6) // Example 60% threshold
    };
  }
}