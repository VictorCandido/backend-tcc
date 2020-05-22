const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: String,
    answer: String,
    keywords: String
})

module.exports = mongoose.model('Questions', QuestionSchema);