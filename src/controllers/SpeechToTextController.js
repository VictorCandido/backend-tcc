const fs = require('fs');
const textToSpeech = require('../models/SpeechToTextModel');

module.exports = {
    async getVoiceAudio(text) {
        try {
            const params = {
                text,
                voice: 'pt-BR_IsabelaV3Voice',
                accept: 'audio/wav'
            };
    
            const speechResponse = await textToSpeech.synthesize(params)
            const audio = speechResponse.result;

            const repairedFile = await textToSpeech.repairWavHeaderStream(audio);
            fs.writeFileSync(`audios/${new Date().getTime()}audio.wav`, repairedFile);
            console.log('audio.wav written with a corrected wav header');
        } catch (error) {
            console.log('[ERROR!] Fail SpeechToTextController.js.', error)
            throw error;
        }
    }
}