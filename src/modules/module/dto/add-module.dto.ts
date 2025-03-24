import mongoose from 'mongoose';

export class AddModuleDto {
  module_type: string;
  parts: mongoose.Schema.Types.ObjectId[]; // Array of Part IDs
}
