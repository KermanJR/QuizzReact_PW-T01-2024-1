const Question = require('../models/Question');


exports.createQuestion = async (req, res) => {
  const { question, options, correctAnswer } = req.body;

  const newQuestion = new Question({
    question,
    options,
    correctAnswer
  });

  try {
    const createdQuestion = await newQuestion.save();
    res.status(201).json(createdQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { question, options, correctAnswer } = req.body;

  try {
    const existingQuestion = await Question.findById(id);

    if (existingQuestion) {
      existingQuestion.question = question || existingQuestion.question;
      existingQuestion.options = options || existingQuestion.options;
      existingQuestion.correctAnswer = correctAnswer || existingQuestion.correctAnswer;

      const updatedQuestion = await existingQuestion.save();
      res.json(updatedQuestion);
    } else {
      res.status(404).json({ message: 'Pergunta não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findByIdAndDelete(id);

    if (question) {
      res.json({ message: 'Pergunta removida' });
    } else {
      res.status(404).json({ message: 'Pergunta não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.answerQuestion = async (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;

  try {
    const question = await Question.findById(id);

    if (question) {
      const isCorrect = question.correctAnswer === answer;
      res.json({ question: question.question, isCorrect });
    } else {
      res.status(404).json({ message: 'Pergunta não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
