const fs = require('fs');
const textToSpeech = require('../models/SpeechToTextModel');

module.exports = {
    getVoiceAudio(text) {
        const params = {
            text,
            voice: 'pt-BR_IsabelaV3Voice',
            accept: 'audio/wav'
        };

        textToSpeech.synthesize(params).then(response => {
            const audio = response.result;
            return textToSpeech.repairWavHeaderStream(audio);
        }).then(repairedFile => {
            fs.writeFileSync('audio.wav', repairedFile);
            console.log('audio.wav written with a corrected wav header');
        }).catch(err => {
            console.log('[ERROR!] Fail in get speech audio.', err)
        })
    }
}