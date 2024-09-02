import axios from 'axios';

const API_URL = '/api'; // 替换为您的后端 API URL

interface Answer {
  userId: string;
  bankId: string;
  questionId: string;
  answer: string;
}

export const fetchQuestionBanks = () => axios.get(`${API_URL}/question-banks`);
export const fetchQuestionBank = (_id: string) => axios.get(`${API_URL}/question-banks/${_id}`);
export const fetchQuestions = (bankId: string) => axios.get(`${API_URL}/question-banks/${bankId}/questions`);
export const submitAnswer = (answer: Answer) => 
  axios.post(`${API_URL}/quiz/answer`, answer);
export const fetchUserProgress = (userId: string, bankId: string) => 
  axios.get(`${API_URL}/quiz/progress/${userId}/${bankId}`);
export const fetchSimilarPaths = (userId: string, bankId: string) => 
  axios.get(`${API_URL}/quiz/similar-paths/${userId}/${bankId}`)
    .catch(error => {
      console.error('获取相似路径数失败:', error);
      throw error;
    });
