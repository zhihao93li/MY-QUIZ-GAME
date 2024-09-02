import { Request, Response } from 'express';
import QuestionBank, { IQuestionBank } from '../models/QuestionBank';
import Question, { IQuestion } from '../models/Question';

export const getQuestionBanks = async (req: Request, res: Response) => {
  try {
    const questionBanks: IQuestionBank[] = await QuestionBank.find();
    res.json(questionBanks);
  } catch (error) {
    res.status(500).json({ message: '获取题库列表失败', error });
  }
};

export const getQuestionBank = async (req: Request, res: Response) => {
  try {
    const questionBank: IQuestionBank | null = await QuestionBank.findById(req.params.id);
    if (!questionBank) {
      return res.status(404).json({ message: '题库不存在' });
    }
    res.json(questionBank);
  } catch (error) {
    res.status(500).json({ message: '获取题库失败', error });
  }
};

export const createQuestionBank = async (req: Request, res: Response) => {
  try {
    const newQuestionBank: IQuestionBank = new QuestionBank(req.body);
    const savedQuestionBank: IQuestionBank = await newQuestionBank.save();
    res.status(201).json(savedQuestionBank);
  } catch (error) {
    res.status(400).json({ message: '创建题库失败', error });
  }
};

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const questions: IQuestion[] = await Question.find({ bankId: req.params.bankId }).sort({ order: 1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: '获取题目失败', error });
  }
};
