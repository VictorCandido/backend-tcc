const assistant = require('../models/AssistantModel');
require('dotenv').config();

module.exports = {
    async startConversation (req, res) {
        try {
            const assistantResponse = await assistant.message({
                workspaceId: process.env.WORKSPACE_ID
            })
            
            res.status(200).json(assistantResponse.result);
        } catch (error) {
            console.log('[ERROR!] Fail at AssistantController.js in startConversation function.', error);
            throw error
        }
    },

    async DealConversation (req, res) {
        try {
            const { context, input } = req.body;
    
            let payload = {
                workspaceId: process.env.WORKSPACE_ID,
                context: context || {},
                input: input || {}
            }
        
            const assistantResponse = await assistant.message(payload)
                
            res.status(200).json(assistantResponse.result);
        } catch (error) {
            console.log('[ERROR!] Fail at AssistantController.js in DealConversation function.', error);
            throw error
        }
    }
}