const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3')
const { IamAuthenticator } = require('ibm-watson/auth')
require('dotenv').config()

try {
    const languageTranslator = new LanguageTranslatorV3({
        authenticator: new IamAuthenticator({ 
            apikey: process.env.TRANSLATOR_APIKEY
        }),
        url: process.env.TRANSLATOR_URL,
        version: process.env.VERSION
    })
    
    module.exports = languageTranslator
} catch (error) {
    console.log('[ERROR!] Fail at AssistantModel.js')
    throw error;    
}