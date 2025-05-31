export class QuestionResponseDto {
  questionId: string;
  questionType: string; // e.g., 'mcq', 'writing', etc.
  statement: string;
  options?: string[];
  max_marks: number;
  min_words?: number; // For writing questions

  constructor(question: any) {
    this.questionId = question._id.toString();
    this.questionType = question.questionType;
    this.statement = question.statement;
    this.max_marks = question.max_marks;

    if (question.type === 'mcq') {
      this.options = question.options;
    }

    if (question.type === 'writing') {
      this.min_words = question.min_words;
    }
  }
}
