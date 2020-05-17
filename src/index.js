// const express = require('express');
// const cors = require('cors');
// const routes = require('./routes');

const { googleSearch } = require("./models/GoogleModel");

// const app = express();

// try {
//     app.use(cors());

//     app.use(express.json());
//     app.use(express.urlencoded({ extended: true }));

//     app.use(routes)

//     app.listen(3333, () => console.log('Server running on port 3333'));
// } catch (error) {
//     console.log('[ERROR!] Fail at index.js', error)   
// }

googleSearch()