const express = require('express');
const router = express.Router();
const db = require('../models/db');
const Models = require('../models');

function addOne(req, res, next) {
  const questionToAdd = {
    name: req.body.name,
    description: req.body.description,
    quizId: req.body.quizId,
  };

  Models.Question
    .create(questionToAdd)
    .then((question) => {
      // questionid: question.id
      console.log('what the fuck is question', req.body.questionId)
      console.log('questions', req.body.questions)
      console.log('answers', req.body.answers)
      // also create answers
      // only need to send back question info - then update state
      res.status(200).send(question);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = QuestionController;