const mongoose = require('mongoose');

const NeedsAnswerSchema = new mongoose.Schema({
    question: String,
    keywords: String
})

module.exports = mongoose.model('NeedsAnswer', NeedsAnswerSchema);