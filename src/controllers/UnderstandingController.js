const naturalLanguageUnderstanding = require("../models/UnderstandingModel");
const TranslatorController = require("./TranslatorController");
const WikipediaController = require("./WikipediaController");
const SpeechToTextController = require("./SpeechToTextController");

module.exports = {
    async getUnderstanding (text) {
        try {        
            const textInEnglish = await TranslatorController.translate(text);

            const analyzeParams = {
                text: textInEnglish,
                // url: text,
                'features': {
                    'categories': {},
                    'concepts': {},
                    'entities': {},
                    'keywords': {},
                    'relations': {},
                    'semantic_roles': {},
                    'sentiment': {},
                    'syntax': {},
                    // 'metadata': {}
                }
            };
            
            const analysisResults = await naturalLanguageUnderstanding.analyze(analyzeParams)

            const { keywords } = analysisResults.result;
            console.log('>> keywords:', keywords)

            // const wikipediaSentences = await WikipediaController.getWikipediaSentences(keywords[0].text)
            // const sentence = wikipediaSentences[0] + ' ' + wikipediaSentences[1];
            // console.log('>> Wikipedia return\n', sentence)

            // const backToPortuguese = await TranslatorController.translate(sentence, 'pt')
            const backToPortuguese = ''
            
            return {
                originalQuestion: text,
                text: backToPortuguese,
                keywords
            };
        } catch (error) {
            console.log('[ERROR!] Fail at UnderstaningController.js.', error)

            next(error);
        }
    }
}