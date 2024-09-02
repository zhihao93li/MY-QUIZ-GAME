import express from 'express';
import { submitAnswer, getUserProgress, getSimilarPaths } from '../controllers/quizController';

const router = express.Router();

router.post('/answer', submitAnswer);
router.get('/progress/:userId/:bankId', getUserProgress);
router.get('/similar-paths/:userId/:bankId', getSimilarPaths);

export default router;
