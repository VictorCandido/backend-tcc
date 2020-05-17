const naturalLanguageUnderstanding = require("../models/UnderstandingModel");
const TranslatorController = require("./TranslatorController");

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

            console.log('keywords:', keywords)
            
            res.status(200).json(analysisResults);
        } catch (error) {
            console.log('[ERROR!] Fail at UnderstaningController.js.', error)
            throw error;
        }
    }
}