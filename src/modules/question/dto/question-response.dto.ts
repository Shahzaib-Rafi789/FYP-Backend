export class QuestionResponseDto {
    questionId: string;
    statement: string;
    options?: string[];
    max_marks: number;
  
    constructor(question: any) {
      this.questionId = question._id.toString();
      this.statement = question.statement;
      this.options = question.options;
      this.max_marks = question.max_marks;
    }
  }
  