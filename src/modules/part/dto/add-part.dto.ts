import mongoose from 'mongoose';

export class AddPartDto {
  module_type: string;
  sequence: number;
  heading: string;
  passage?: string;
  audio_link?: string;
  question_groups: mongoose.Schema.Types.ObjectId[];
  total_marks: number;
}
