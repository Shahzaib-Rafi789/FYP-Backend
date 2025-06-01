
import { Injectable } from '@nestjs/common';
// import { EvaluatorFactory } from '../question/evaluators';
// import { QuestionEvaluator } from 'src/common/interfaces/evaluator.interface';
import { PartService } from '../part/part.service';

@Injectable()
export class ModuleEvaluator {
  constructor(
    // private readonly evaluatorFactory: EvaluatorFactory,
    private readonly PartService: PartService
  ) {}

  async evaluateModule(module: any) {
    let Score = 0, totalScore = 0;
    const partResults = [];
    console.log(module)

    for (const part of module.parts)  {
      const result = await this.PartService.evaluatePartAnswers(part);
    //   const evaluator: QuestionEvaluator = this.evaluatorFactory.getEvaluator(question);
    //   const response = responses[question.questionId]; // Or your ID field
    //   const result = await evaluator.evaluate(question, response);
      
      Score += result.Obtained;
      totalScore += result.Total;
      partResults.push({
        PartId: part.PartId,
        ...result
      });
    }

    return {
      Obtained: Score,
      Total: totalScore,
      Percentage: Score/totalScore,
      partResults,
    //   groupPassed: totalScore >= (Part.total_marks * 0.6) // Example 60% threshold
    };
  }
}