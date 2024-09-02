import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import questionBankRoutes from './routes/questionBanks';
import quizRoutes from './routes/quiz';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 连接到MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/my_quiz_game')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 设置 Mongoose 的严格查询模式为 false
mongoose.set('strictQuery', false);

// 路由
app.use('/api/question-banks', questionBankRoutes);
app.use('/api/quiz', quizRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
