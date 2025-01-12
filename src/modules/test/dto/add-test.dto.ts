import mongoose from "mongoose";

export class AddTestDto {
    alias: string;
    isPublic: boolean;
    test_owner: string;
    modules: mongoose.Schema.Types.ObjectId[]; // Array of module IDs

  }
  