const assistant = require('../models/AssistantModel');
const UnderstandingController = require('./UnderstandingController');
const QuestionController = require('./QuestionController');
const NeedsAnswerController = require('./NeedsAnswerController');
require('dotenv').config();

module.exports = {
    async startConversation (req, res, next) {
        try {
            const { result } = await assistant.message({
                workspaceId: process.env.WORKSPACE_ID
            })
            
            res.status(200).json({
                type: 'startConversation-answer',
                response: result
            });
        } catch (error) {
            console.log('[ERROR!] Fail at AssistantController.js in startConversation function.', error);
            next(error)
        }
    },

    async DealConversation (req, res, next) {
        try {
            const { context, input } = req.body;
    
            let payload = {
                workspaceId: process.env.WORKSPACE_ID,
                context: context.context || {},
                input: input || {}
            }
        
            const { result } = await assistant.message(payload)

            if (result.intents.length) {
                if (result.intents[0].intent === "duvida") {
                    const { text } = result.input;
    
                    const understandingResponse = await UnderstandingController.getUnderstanding(text)
    
                    res.status(200).json({
                        type: 'question-success',
                        response: understandingResponse
                    })
                    return;
                } 

                if (context.foiUtil) {
                    if (result.entities[0].value === 'sim') {
                        // Resposta útil, segue a vida
                        res.status(200).json({
                            type: 'util-sim'
                        })

                        return;
                    } else {
                        // Registra como uma pergunta e espera uma resposta
                        const dbQuestions = await QuestionController.findAll();
                        let resposta = false;

                        for (var i in dbQuestions) {
                            const keywords = JSON.parse(dbQuestions[i].keywords);

                            let counter = 0;

                            for (var k in keywords) {
                                for (var j in context.keywords) {
                                    if (context.keywords[j].text.toLocaleLowerCase() === keywords[k].text.toLocaleLowerCase()) {
                                        const relevanceDiff = Math.abs(context.keywords[j].relevance - keywords[k].relevance);

                                        if (relevanceDiff > 0.2) continue;

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

                        if (resposta) {
                            console.log('ENCONTROU A RESPOSTA')
                            console.log(resposta)
                            res.status(200).json({
                                type: 'db-answer',
                                response: resposta
                            })

                            return;
                        } else {
                            console.log('NÃO ENCONTROU A RESPOSTA')
                            NeedsAnswerController.store({
                                question: context.originalQuestion,
                                keywords: JSON.stringify(context.keywords)
                            })

                            res.status(200).json({
                                type: 'answer-not-found'
                            })

                            return;
                        }
                    }
                }
            } 

            res.status(200).json({
                type: 'chat-answer',
                response: result
            });
        } catch (error) {
            console.log('[ERROR!] Fail at AssistantController.js in DealConversation function.', error);
            next(error)
        }
    }
}