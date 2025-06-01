
export interface QuestionEvaluator {
    evaluate(question: any, response: any): EvaluationResult;
  }
   
  export interface EvaluationResult {
    marksObtained: number;
    isCorrect: boolean;
    feedback?: string;
  }