const naturalLanguageUnderstanding = require("../models/UnderstandingModel");
const TranslatorController = require("./TranslatorController");
const WikipediaController = require("./WikipediaController");
const SpeechToTextController = require("./SpeechToTextController");

module.exports = {
    async getUnderstanding (req, res) {
        try {
            const { text } = req.body;
        
            const textInEnglish = await TranslatorController.translate(text);

            const analyzeParams = {
                text: textInEnglish,
                'features': {
                    'categories': {},
                    'concepts': {},
                    'entities': {},
                    'keywords': {},
                    'relations': {},
                    'semantic_roles': {},
                    'sentiment': {},
                    'syntax': {}
                }
            };
            
            const analysisResults = await naturalLanguageUnderstanding.analyze(analyzeParams)
            const { keywords } = analysisResults.result;
            console.log('>> keywords:', keywords)

            const wikipediaSentences = await WikipediaController.getWikipediaSentences(keywords[0].text)
            const sentence = wikipediaSentences[0] + ' ' + wikipediaSentences[1];
            console.log('>> Wikipedia return\n', sentence)

            const backToPortuguese = await TranslatorController.translate(sentence, 'pt')
            
            SpeechToTextController.getVoiceAudio(backToPortuguese)

            res.status(200).json(backToPortuguese);
        } catch (error) {
            console.log('[ERROR!] Fail at UnderstaningController.js.', error)

            res.status(404).json({
                message: 'Fail at fetch some data from Wikipedia API',
                error
            });

            throw error;
        }
    }
}