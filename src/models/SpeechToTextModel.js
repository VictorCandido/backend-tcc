const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
require('dotenv').config();

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({ apikey: process.env.SPEECH_TO_TEXT_APIKEY }),
    url: process.env.SPEECH_TO_TEXT_URL
});

module.exports = textToSpeech;