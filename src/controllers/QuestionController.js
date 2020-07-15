const QuestionModel = require("../models/QuestionModel")

module.exports = {
    async store(questionData) {
        const newQuestion = await QuestionModel.create(questionData);
        return newQuestion;
    },
    
    async findAll() {
        const allQuestions = await QuestionModel.find();
        return allQuestions;
    },

    async findAnswer(context, systemRelevance) {
        const dbQuestions = await this.findAll();
        let resposta = false;

        for (var i in dbQuestions) {
            const keywords = JSON.parse(dbQuestions[i].keywords);

            let counter = 0;

            for (var k in keywords) {
                for (var j in context.keywords) {
                    if (context.keywords[j].text.toLocaleLowerCase() === keywords[k].text.toLocaleLowerCase()) {
                        const relevanceDiff = Math.abs(context.keywords[j].relevance - keywords[k].relevance);

                        if (relevanceDiff > systemRelevance) continue;

                        counter++;
                        break;
                    }
                }                                
            }

            if (counter === context.keywords.length) {
                resposta = dbQuestions[i];
                break;
            }
        }

        return resposta;
    }
}