const Sequelize = require('sequelize');
const db = require('./db');

const Question = db.define('question', {
  question: {
    type: Sequelize.STRING,
    // quizId: Sequelize.NUMBER,
    // answers: Sequelize.ARRAY
  }
});
module.exports = Question;
