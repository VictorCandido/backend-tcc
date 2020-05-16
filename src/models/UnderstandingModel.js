const NaturalLanguageUnderstantingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
require('dotenv').config();

const naturalLanguageUnderstanding = new NaturalLanguageUnderstantingV1({
    version: process.env.VERSION,
    authenticator: new IamAuthenticator({
        apikey: 'iARlYy-vvf74vAQvTVXC5L0ncet3PkYhUv_d4NHw0dVY'
    }),
    url: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/6bb11dd3-34df-4557-b22c-99d436142f9f'
});

module.exports = naturalLanguageUnderstanding;