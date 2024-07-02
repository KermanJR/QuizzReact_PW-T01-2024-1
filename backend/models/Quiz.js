const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Question = require('./Question');

const quizSchema = new Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: Question }], 
  isDeleted: { type: Boolean, default: false }
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
