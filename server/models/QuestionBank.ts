import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestionBank extends Document {
  name: string;
  description: string;
}

const QuestionBankSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<IQuestionBank>('QuestionBank', QuestionBankSchema);
