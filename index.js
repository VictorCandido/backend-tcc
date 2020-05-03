const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const prompt = require('prompt-sync')();
require('dotenv').config();

const assistantId = process.env.ASSISTANT_ID;
const workspaceId = process.env.WORKSPACE_ID;

const assistant = new AssistantV1({
    version: process.env.VERSION,
    authenticator: new IamAuthenticator({
        apikey: process.env.APIKEY
    }),
    url: process.env.URL
});

// assistant.createSession({
//     assistantId
// }).then(res => {
//     const sessionId = res.result.session_id;

//     assistant.message({
//         assistantId,
//         sessionId,
//     }).then(result => handleResponse(result, sessionId)).catch(handleError);
// }).catch(err => {
//     console.log(err);
// });

assistant.message({
    workspaceId
}).then(handleResponse).catch(handleError);

let continuaConversa = true;

function handleResponse (res) {
    const { intents, context, output } = res.result;

    if (output.text.length) {
        output.text.forEach(msg => console.log(msg));
    }

    if (intents.length) {
        const intent = intents[0].intent;
        if (intent == 'Despedida') {
            continuaConversa = false;
        }
    }

    
    if (continuaConversa) {
        const mensagem = prompt('>> ');
        assistant.message({
            workspaceId,
            input: {
                message_type: 'text',
                text: mensagem
            },
            context
        }).then(handleResponse).catch(handleError);
    }

    // console.log(JSON.stringify(res, true, 2));
}
function handleError (err) {
    console.log(err);
}