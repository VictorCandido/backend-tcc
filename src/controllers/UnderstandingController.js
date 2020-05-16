const naturalLanguageUnderstanding = require("../models/UnderstandingModel");

module.exports = {
    getUnderstanding (req, res) {
        const { text } = req.body;
        const analyzeParams = {
            text,
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
        
        naturalLanguageUnderstanding.analyze(analyzeParams).then(analysisResults => {
              console.log(JSON.stringify(analysisResults, null, 2));
        
            //   console.log('Eu identifiquei as palavras-chave:');
            //   analysisResults.result.keywords.forEach(keyword => {
            //       console.log(keyword.text + ' com relevância de ' + (keyword.relevance * 100) + '%')
            //   })
    
              res.status(200).json(analysisResults);
        }).catch(err => {
            console.log('error:', err);
            res.status(err.code || 500).json({ 
                message: 'Falha na comunicação com o watson', 
                error: err.message 
            });
        });
    }
}