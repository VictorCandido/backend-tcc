// const algorithmia = require('algorithmia');
const superAgent = require('superagent');
const sentenceBoundaryDetection = require('sbd');
const environment = require('../config/environment.test');
require('dotenv').config();

async function fetchContentFromWikipedia(searchTerm) {
    // try {
    //     const algorithmiaAuthenticated = algorithmia(process.env.WIKIPEDIA_APIKEY);
    //     const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2');
    //     const wikipediaResponse = await wikipediaAlgorithm.pipe({
    //         lang: 'pt',
    //         articleName: searchTerm
    //     });
    //     const wikipediaContent = wikipediaResponse.get();
        
    //     return wikipediaContent.content;
    // } catch (error) {
    //     console.log('[ERROR!] Fail at WikipediaController.js in fetchContentFromWikipedia function.', error)
    //     throw error;
    // }

    try {
        const res = await superAgent.get(environment.wikipediaApiUrl).query({
            'action': 'opensearch',
            'search': searchTerm,
            'limit': 5,
            'namespace': 0,
            'format': "json"
        })

        if(res.body[1].length == 0){
            throw {
                errorType: 'No Result!',
                errorMessage: 'Fail at getting a result from Wikipedia. There\'s no result for the search!'
            }
        }

        const title = res.body[1][0];

        const ret = await superAgent.get(environment.wikipediaApiUrl).query({
            'action':'query',
            'prop': 'extracts|images|links|info|extlinks',
            'redirects': 1,
            'exsectionformat':'wiki',
            'explaintext':true,
            'titles': title,
            'format':"json"
        })
        
        const { query } = ret.body;
        const pageId = Object.keys(query.pages);
        const content = query.pages[pageId].extract;

        return content;
    } catch (error) {
        console.log('[ERROR!] Fail at WikipediaController.js in fetchContentFromWikipedia function.', error)
        throw error;
    }
}

function sanitizeContent(sourceContentOriginal) {
    try {
        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(sourceContentOriginal);
        const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown)
        
        return withoutDatesInParentheses;
    
        function removeBlankLinesAndMarkdown(text) {
            const allLines = text.split('\n');
            
            const withoutBlankLinesAndMarkdown = allLines.filter(line => {
                if (line.trim().length === 0 || line.trim().startsWith('=')) {
                    return false
                }
                return true
            })
    
            return withoutBlankLinesAndMarkdown.join(' ');
        }
    
        function removeDatesInParentheses(text) {
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ');
        }
    } catch (error) {
        console.log('[ERROR!] Fail at WikipediaController.js in sanitizeContent function.', error)
        throw error;
    }
}

function breakContentIntoSentences(sourceContentSanitized) {
    try {
        const sentences = sentenceBoundaryDetection.sentences(sourceContentSanitized);
        return sentences        
    } catch (error) {
        console.log('[ERROR!] Fail at WikipediaController.js in breakContentIntoSentences function.', error)
        throw error;
    }
}

async function _getWikipediaSentences(searchTerm) {
    try {
        const sourceContentOriginal = await fetchContentFromWikipedia(searchTerm);
        const sourceContentSanitized = sanitizeContent(sourceContentOriginal);
        const sentences = breakContentIntoSentences(sourceContentSanitized);
        return sentences;        
    } catch (error) {
        console.log('[ERROR!] Fail at WikipediaController.js in _getWikipediaSentences function.', error)
        throw error;
    }
}

module.exports = {
    getWikipediaSentences: _getWikipediaSentences
};