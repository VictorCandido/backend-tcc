const QuestionModel = require("../models/QuestionModel")

module.exports = {
    async store(questionData) {
        const newQuestion = await QuestionModel.create(questionData);
        return newQuestion;
    },
    
    async findAll() {
        const allQuestions = await QuestionModel.find();
        return allQuestions;
    }
}