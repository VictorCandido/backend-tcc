const assistant = require('../models/AssistantModel');
require('dotenv').config();

module.exports = {
    startConversation (req, res) {
        assistant.message({
            workspaceId: process.env.WORKSPACE_ID
        }).then(response => {
            res.status(200).json(response.result);
        }).catch(err => {
            console.error(err);
            res.status(err.code || 500).json({ 
                message: 'Falha ao iniciar chat', 
                error: err.message 
            });
        });
    },

    DealConversation (req, res) {
        const { context, input } = req.body;
    
        let payload = {
            workspaceId: process.env.WORKSPACE_ID,
            context: context || {},
            input: input || {}
        }
    
        assistant.message(payload).then(response => {
            res.status(200).json(response.result);
        }).catch(err => {
            console.error(err);
            res.status(err.code || 500).json({ 
                message: 'Falha na comunicação com o chat', 
                error: err.message 
            });
        });
    }
}