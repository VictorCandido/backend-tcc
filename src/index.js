// const express = require('express');
// const cors = require('cors');

const TranslatorController = require("./controllers/TranslatorController");

// const routes = require('./routes');

// const app = express();
// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(routes)

// app.listen(3333, () => console.log('Server running on port 3333'));

teste();

async function teste(){
    const text = 'Use o serviço Classificador de Linguagem Natural para criar uma instância classificadora, fornecendo um conjunto de strings representativas e um conjunto de uma ou mais classes corretas para cada um como treinamento. Em seguida, use o classificador treinado para classificar sua nova pergunta para obter melhores respostas correspondentes ou para recuperar próximas ações para sua aplicação.'
    const translatedText = await TranslatorController.translate(text, 'en');
    console.log('>> Translated text: ' + translatedText)
}