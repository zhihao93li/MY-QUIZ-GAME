import express from 'express';
import { getQuestionBanks, getQuestionBank, createQuestionBank, getQuestions } from '../controllers/questionBankController';

const router = express.Router();

router.get('/', getQuestionBanks);
router.get('/:id', getQuestionBank);
router.post('/', createQuestionBank);
router.get('/:bankId/questions', getQuestions);

export default router;
