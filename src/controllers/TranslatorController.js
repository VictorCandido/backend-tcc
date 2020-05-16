const languageTranslator = require("../models/TranslatorModel");

module.exports = {
    async identify(text) {
        try {
            const identifiedLanguageResponse = await languageTranslator.identify({
                text
            })
    
            const { language } = identifiedLanguageResponse.result.languages[0];
            console.log('>> Detected Language: ' + language);
    
            return language;
        } catch (error) {
            console.log('[ERROR!] Fail in identify text language', error)
        }
    },

    async translate(text, target) {
        console.log('>> Original Text: ' + text)

        const language = await this.identify(text);

        try {
            const translatedLanguageResponse = await languageTranslator.translate({
                text,
                source: language,
                target
            })
    
            const { translation } = translatedLanguageResponse.result.translations[0];
            return translation;
        } catch (error) {
            console.log('[ERROR!] Fail in translate text', error)
        }
    }
}