const Score = require('../models/Score');

exports.recordScore = async (req, res) => {
  try {
    const { user, quiz, score } = req.body;

    const newScore = new Score({
      user,
      quiz,
      score
    });

    const savedScore = await newScore.save();
    res.status(201).json(savedScore);
  } catch (error) {
    console.error('Erro ao gravar a pontuação:', error);
    res.status(500).json({ error: 'Erro ao gravar a pontuação' });
  }
};

exports.getRankings = async (req, res) => {
  try {
    const rankings = await Score.find().populate('user', 'name').populate('quiz', 'title').sort({ score: -1 }).limit(10);
    res.json(rankings);
  } catch (error) {
    console.error('Erro ao recuperar os rankings:', error);
    res.status(500).json({ error: 'Erro ao recuperar os rankings' });
  }
};

exports.getRankingsByQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const rankings = await Score.find({ quiz: quizId })
      .populate('user', 'name')
      .populate('quiz', 'title')
      .sort({ score: -1 })

    res.json(rankings);
  } catch (error) {
    console.error('Erro ao recuperar os rankings por quiz:', error);
    res.status(500).json({ error: 'Erro ao recuperar os rankings por quiz' });
  }
};