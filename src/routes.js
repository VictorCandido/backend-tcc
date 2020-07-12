/**
 * Controle de rotas para requisição das APIs
 */

const express = require('express');
const AssistantController = require('./controllers/AssistantController');
const UnderstandingController = require('./controllers/UnderstandingController');
const PerguntasAPIController = require('./controllers/PerguntasAPIController');

try {
    const routes = express.Router();

    routes.get('/chatbot', AssistantController.startConversation);

    routes.post('/chatbot', AssistantController.DealConversation);

    routes.post('/understanding', UnderstandingController.getUnderstanding);

    routes.get('/questions/findAll', PerguntasAPIController.findAll)
    routes.delete('/questions/delete/:id', PerguntasAPIController.delete)
    routes.post('/questions/save', PerguntasAPIController.store)

    module.exports = routes;
} catch (error) {
    console.log('[ERROR!] Fail at routes.js', error)      
    throw error;
}