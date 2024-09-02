import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  bankId: string;
  content: string;
  optionA: string;
  optionB: string;
  order: number;
}

const QuestionSchema: Schema = new Schema({
  bankId: { type: Schema.Types.ObjectId, ref: 'QuestionBank', required: true },
  content: { type: String, required: true },
  optionA: { type: String, required: true },
  optionB: { type: String, required: true },
  order: { type: Number, required: true },
});

export default mongoose.model<IQuestion>('Question', QuestionSchema);
