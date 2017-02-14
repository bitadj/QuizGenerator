const Sequelize = require('sequelize');
const uuidV4 = require('uuid/v4');
const db = require('./db');

const Quiz = db.define('quiz', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  link: {
    type: Sequelize.STRING,
    defaultValue: uuidV4(),
  }
});
module.exports = Quiz;
