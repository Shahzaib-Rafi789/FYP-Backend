export class PartResponseDto {
  partId: string;
  module_type: string;
  sequence: number;
  heading: string;
  passage?: string;
  audio_link?: string;
  question_groups: string[];
  total_marks: number;

  constructor(part: any) {
    this.partId = part._id.toString();
    this.module_type = part.module_type;
    this.sequence = part.sequence;
    this.heading = part.heading;
    this.passage = part.passage;
    this.audio_link = part.audio_link;
    this.question_groups = part.question_groups;
    this.total_marks = part.total_marks;
  }
}
