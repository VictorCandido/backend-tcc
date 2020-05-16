const NaturalLanguageUnderstantingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
require('dotenv').config();

const naturalLanguageUnderstanding = new NaturalLanguageUnderstantingV1({
    version: process.env.VERSION,
    authenticator: new IamAuthenticator({
        apikey: process.env.UNDERSTANDING_APIKEY
    }),
    url: process.env.UNDERSTANDING_URL
});

module.exports = naturalLanguageUnderstanding;