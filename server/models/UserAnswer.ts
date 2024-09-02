import mongoose, { Schema, Document } from 'mongoose';

export interface IUserAnswer extends Document {
  userId: string;
  bankId: string;
  answers: Array<{ questionId: string; answer: string }>;
}

const UserAnswerSchema: Schema = new Schema({
  userId: { type: String, required: true },
  bankId: { type: Schema.Types.ObjectId, ref: 'QuestionBank', required: true },
  answers: [
    {
      questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
      answer: { type: String, required: true },
    },
  ],
});

export default mongoose.model<IUserAnswer>('UserAnswer', UserAnswerSchema);
