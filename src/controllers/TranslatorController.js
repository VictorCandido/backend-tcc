const languageTranslator = require("../models/TranslatorModel");

async function identify(text) {
    try {
        const identifiedLanguageResponse = await languageTranslator.identify({
            text
        })

        const { language } = identifiedLanguageResponse.result.languages[0];
        console.log('>> Detected Language: ' + language);

        return language;
    } catch (error) {
        console.log('[ERROR!] Fail at TranslatorController.js in identify function.', error)
        throw error;
    }
}

async function _translate(text, target) {
    console.log('>> Original Text: ' + text)

    const language = await identify(text);

    try {
        const translatedLanguageResponse = await languageTranslator.translate({
            text,
            source: language,
            target: target || 'en'
        })

        const { translation } = translatedLanguageResponse.result.translations[0];
        return translation;
    } catch (error) {
        console.log('[ERROR!] Fail at TranslatorController.js in _translate function.', error)
        throw error;
    }
}

module.exports = {
    translate: _translate
};