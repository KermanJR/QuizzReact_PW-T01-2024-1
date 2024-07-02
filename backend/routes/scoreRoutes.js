const express = require('express');
const { recordScore, getRankingsByQuiz } = require('../controllers/scoreController');

const router = express.Router();

router.route('/').post(recordScore);
router.route('/rankings/:quizId').get(getRankingsByQuiz);

module.exports = router;
