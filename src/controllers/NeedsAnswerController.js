const NeedsAnswerModel = require("../models/NeedsAnswerModel");

module.exports = {
    async store(questionData) {
        const newQuestion = await NeedsAnswerModel.create(questionData);
        return newQuestion;
    },
    
    async findAll() {
        const allQuestions = await NeedsAnswerModel.find();
        return allQuestions;
    },

    async delete(id) {
        const response = await NeedsAnswerModel.deleteOne({ _id: id });
        return response;
    }
}