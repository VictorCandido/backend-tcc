const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const environment = require('./config/environment.test');

const app = express();

try {
    app.use(cors());

    mongoose.connect(environment.mongooseConnector, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })


    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(routes)

    app.use((error, req, res, next) => {
        console.log('>> final error', error)

        if (error.code === 404) {
            res.send(200).json({
                error: true,
                message: 'Sinto muito, não foi possível encontrar uma resposta.'
            })

            return;
        }

        res.status(error.code || 500).json(error);
    })

    app.listen(3333, () => console.log('Server running on port 3333'));
} catch (error) {
    console.log('[ERROR!] Fail at index.js', error)   
}