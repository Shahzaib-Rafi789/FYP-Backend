export class QuestionGroupResponseDto {
  questionGroupId: string;
  group_type: string;
  total_marks: number;
  ans_limit: number;
  instructions?: string;
  group_question?: string;
  group_options?: string[];
  // text: string;
  questions: string[];

  constructor(questionGroup: any) {
    this.questionGroupId = questionGroup._id.toString();
    this.group_type = questionGroup.group_type;
    this.total_marks = questionGroup.total_marks;
    this.ans_limit = questionGroup.ans_limit;
    this.instructions = questionGroup.instructions;
    this.group_question = questionGroup.group_question;
    this.group_options = questionGroup.group_options;
    // this.text = questionGroup.text;
    this.questions = questionGroup.questions;
  }
}
