const NeedsAnswerController = require("./NeedsAnswerController");
const QuestionController = require("./QuestionController");

module.exports = {
    async findAll(req, res, next) {
        try {
            const questions = await NeedsAnswerController.findAll();

            res.status(200).json(questions);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deleteResponse = await NeedsAnswerController.delete(id);

            res.status(200).json(deleteResponse);
        } catch (error) {
            next(error);
        }
    },

    async store(req, res, next) {
        try {
            const newQuestion = await QuestionController.store(req.body);

            res.status(200).json(newQuestion);
        } catch (error) {
            next(error);
        }
    }
}