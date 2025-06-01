export class QuestionResponseDto {
  questionId: string;
  questionType: string; // e.g., 'mcq', 'writing', etc.
  statement: string;
  options?: string[];
  max_marks: number;
  min_words?: number; // For writing questions
  correctAnswer?: string;
  time_allowed?: number

  constructor(question: any) {
    this.questionId = question._id.toString();
    this.questionType = question.questionType;
    this.statement = question.statement;
    this.max_marks = question.max_marks;

    if (question.options) {
      this.options = question.options;
    }
    if (question.min_words) {
      this.min_words = question.min_words;
    }
    if (question.correctAnswer) {
      this.correctAnswer = question.correctAnswer;
    }
    if (question.time_allowed) {
      this.time_allowed = question.time_allowed;
  }
}
}