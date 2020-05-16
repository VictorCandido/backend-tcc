const express = require('express');
const AssistantController = require('./controllers/AssistantController');
const UnderstandingController = require('./controllers/UnderstandingController');

const routes = express.Router();

routes.get('/api/chatbot', AssistantController.startConversation);

routes.post('/api/chatbot', AssistantController.DealConversation);

routes.post('/api/understanding', UnderstandingController.getUnderstanding);

module.exports = routes;