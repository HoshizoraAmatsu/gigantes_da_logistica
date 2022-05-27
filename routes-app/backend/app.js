const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Rota = require('./models/rota');

mongoose.connect('mongodb+srv://HoshizoraAmatsu:PassWord@cluster0.wohre.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log("Connected!")
  }).catch(() => {
    console.log("Connection error!!")
  });
app.use(bodyParser.json());

app.use(cors({
  origin: '*'
}));

app.post('/api/rotas', (req, res, next) => {
  const rota = new Rota({
    pontoOrigem: req.body.pontoOrigem,
    pontoDestino: req.body.pontoDestino,
    dist: req.body.dist
  })
  rota.save();
  console.log(rota);
  res.status(201).json({message: 'Rota registrada'})
});

app.get('/api/rotas', (req, res, next) => {
  Rota.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: "OK",
      rotas: documents
    });
  })
});

app.delete('/api/rotas/:id', (req, res, next) => {
  console.log(req.params);
  res.status(200).end();
})

module.exports = app;
