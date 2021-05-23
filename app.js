const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const toolRoutes = require('./api/routes/tools');

mongoose.connect('mongodb+srv://rafaelpessoa12:' + process.env.MONGO_ATLAS_PW + '@cluster0.05jl7.mongodb.net/vuttrDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/tools', toolRoutes);

module.exports = app;