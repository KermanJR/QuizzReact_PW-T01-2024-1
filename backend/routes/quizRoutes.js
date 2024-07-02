const express = require('express');
const { createQuiz, getQuizzes, updateQuiz, deleteQuiz, answerQuiz, getQuizzesByCategory, getQuizById } = require('../controllers/quizController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .post(createQuiz)
  .get(getQuizzes);

router.route('/category')
  .get(getQuizzesByCategory);

router.route('/:id')
  .get(getQuizById) 
  .put(protect, admin, updateQuiz)
  .delete(protect, admin, deleteQuiz);

router.route('/:id/answer')
  .post(protect, answerQuiz);

module.exports = router;
