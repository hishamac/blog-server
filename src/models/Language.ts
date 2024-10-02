import mongoose, { Document, Schema } from "mongoose";

// Enum for language direction
export enum LanguageDirection {
  RTL = "rtl",
  LTR = "ltr",
}

// Define an interface for Language
export interface ILanguage extends Document {
  name: string;
  direction: LanguageDirection;
  posts: mongoose.Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Define Language Schema
const LanguageSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    direction: {
      type: String,
      enum: Object.values(LanguageDirection),
      required: true,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the Language model
export default mongoose.model<ILanguage>("Language", LanguageSchema);