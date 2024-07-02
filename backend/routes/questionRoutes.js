const express = require('express');
const { answerQuestion, createQuestion, deleteQuestion, getQuestions, updateQuestion } = require('../controllers/questionController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .post(createQuestion) 
  .get(getQuestions);  

router.route('/:id')
  .put(protect, admin, updateQuestion)  
  .delete(protect, admin, deleteQuestion);  

router.route('/:id/answer')
  .post(protect, answerQuestion);  

module.exports = router;
