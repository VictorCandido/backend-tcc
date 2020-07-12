const naturalLanguageUnderstanding = require("../models/UnderstandingModel");

module.exports = {
    async getUnderstanding (text) {
        try {     
            const analyzeParams = {
                text,
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

            return analysisResults;
        } catch (error) {
            console.log('[ERROR!] Fail at UnderstaningController.js.', error)
            throw error;
        }
    }
}