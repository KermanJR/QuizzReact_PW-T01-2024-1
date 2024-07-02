const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res) => {
  const { title, topic, difficulty, questions } = req.body;

  const quiz = new Quiz({
    title,
    topic,
    difficulty,
    questions
  });

  const createdQuiz = await quiz.save();
  res.status(201).json(createdQuiz);
};

exports.getQuizzes = async (req, res) => {
  const quizzes = await Quiz.find({ isDeleted: false });
  res.json(quizzes);
};

exports.getQuizById = async (req, res) => {
  const { id } = req.params;
  console.log(id)

  try {
    const quiz = await Quiz.findById(id).populate('questions');
    if (!quiz || quiz.isDeleted) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    res.status(200).json({ success: true, quiz });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getQuizzesByCategory = async (req, res) => {
  const { category } = req.query;

  try {
    const quizzes = await Quiz.find({ topic: category, isDeleted: false }).populate('questions');
    res.status(200).json({ success: true, quizzes });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title, topic, difficulty, questions } = req.body;

  const quiz = await Quiz.findById(id);

  if (quiz) {
    quiz.title = title || quiz.title;
    quiz.topic = topic || quiz.topic;
    quiz.difficulty = difficulty || quiz.difficulty;
    quiz.questions = questions || quiz.questions;

    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } else {
    res.status(404).json({ message: 'Quiz not found' });
  }
};

exports.deleteQuiz = async (req, res) => {
  const { id } = req.params;

  const quiz = await Quiz.findById(id);

  if (quiz) {
    quiz.isDeleted = true;
    await quiz.save();
    res.json({ message: 'Quiz removed' });
  } else {
    res.status(404).json({ message: 'Quiz not found' });
  }
};

exports.answerQuiz = async (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;

  const quiz = await Quiz.findById(id);

  if (quiz) {
    let score = 0;
    const feedback = quiz.questions.map((question, index) => {
      const isCorrect = question.correctAnswer === answers[index];
      if (isCorrect) {
        score += 1;
      }
      return { question: question.question, isCorrect };
    });

    res.json({ score, feedback });
  } else {
    res.status(404).json({ message: 'Quiz not found' });
  }
};
