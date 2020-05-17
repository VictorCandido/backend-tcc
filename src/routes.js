const express = require('express');
const AssistantController = require('./controllers/AssistantController');
const UnderstandingController = require('./controllers/UnderstandingController');

try {
    const routes = express.Router();

    routes.get('/api/chatbot', AssistantController.startConversation);

    routes.post('/api/chatbot', AssistantController.DealConversation);

    routes.post('/api/understanding', UnderstandingController.getUnderstanding);

    module.exports = routes;
} catch (error) {
    console.log('[ERROR!] Fail at routes.js', error)  
    res.status(error.code || 500).json({ 
        message: 'Falha na comunicação com o watson', 
        error: error.message 
    });
    
    throw error;
}