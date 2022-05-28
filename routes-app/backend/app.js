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
  const rota = new Rota ({
    pontoOrigem: req.body.pontoOrigem,
    pontoDestino: req.body.pontoDestino,
    dist: req.body.dist
  })
  rota.save()
    .then(rotaInserida => {
      res.status(201).json({
        message: 'Rota inserida',
        id: rotaInserida._id
      })
    });
});

app.get('/api/rotas', (req, res, next) => {
  Rota.find().then(documents => {
    res.status(200).json({
      message: "OK",
      rotas: documents
    });
  })
});

app.get('/api/rotas/:id', (req, res, next) => {
  Rota.findById(req.params.id).then(cli => {
    if(cli) {
      res.status(200).json(cli);
    } else {
      res.status(404).json({message: "Rota não encontrada!"})
    }
  })
})

app.put('/api/rotas/:id', (req, res, next) => {
  console.log(req.params);
  const rota = new Rota({
    _id: req.params.id,
    pontoOrigem: req.body.pontoOrigem,
    pontoDestino: req.body.pontoDestino,
    dist: req.body.dist
  });
  Rota.updateOne({_id: req.params.id}, rota)
    .then((result) => {
      res.status(200).json({message: 'Atualizacao feito com exito'})
    });
});

app.delete('/api/rotas/:id', (req, res, next) => {
  Rota.deleteOne({_id: req.params.id})
    .then((result) => {
      res.status(200).json({message: "Cliente removido!"})
    })
});

module.exports = app;
