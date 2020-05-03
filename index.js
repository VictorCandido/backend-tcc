const express = require('express');
const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const prompt = require('prompt-sync')();
require('dotenv').config();

const app = express();

const workspaceId = process.env.WORKSPACE_ID;

const assistant = new AssistantV1({
    version: process.env.VERSION,
    authenticator: new IamAuthenticator({
        apikey: process.env.APIKEY
    }),
    url: process.env.URL
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/chatbot', (req, res) => {
    assistant.message({
        workspaceId
    }).then(response => {
        res.status(200).json(response.result);
    }).catch(err => {
        console.error(err);
        res.status(err.code || 500).json({ 
            message: 'Falha ao iniciar chat', 
            error: err.message 
        });
    });
});

app.post('/api/chatbot', (req, res) => {
    const { context, input } = req.body;

    let payload = {
        workspaceId,
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
});

app.listen(3333, () => console.log('Server running on port 3333'));