import { Request, Response } from 'express';
import Question from '../models/Question';
import UserAnswer from '../models/UserAnswer';

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find({ bankId: req.params.bankId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const { userId, bankId, questionId, answer } = req.body;
    const userAnswer = await UserAnswer.findOneAndUpdate(
      { userId, bankId },
      { $push: { answers: { questionId, answer } } },
      { upsert: true, new: true }
    );
    res.json(userAnswer);
  } catch (error) {
    res.status(400).json({ message: 'Error submitting answer', error });
  }
};

export const getUserProgress = async (req: Request, res: Response) => {
  try {
    const { userId, bankId } = req.params;
    const userAnswer = await UserAnswer.findOne({ userId, bankId });
    const totalQuestions = await Question.countDocuments({ bankId });
    const progress = {
      completedQuestions: userAnswer ? userAnswer.answers.length : 0,
      totalQuestions
    };
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user progress', error });
  }
};

export const getSimilarPaths = async (req: Request, res: Response) => {
  try {
    const { userId, bankId } = req.params;
    const userAnswer = await UserAnswer.findOne({ userId, bankId });
    if (!userAnswer) {
      return res.json({ count: 0 });
    }
    const similarPathsCount = await UserAnswer.countDocuments({
      bankId,
      $expr: {
        $and: [
          { $eq: [{ $size: "$answers" }, userAnswer.answers.length] },
          { $eq: ["$answers", userAnswer.answers] }
        ]
      }
    });
    res.json({ count: similarPathsCount });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error fetching similar paths', error: errorMessage });
  }
};
