const mongoose = require('mongoose');

const rotaSchema = mongoose.Schema({
  pontoOrigem: {type: String, required: true},
  pontoDestino: {type: String, required: true},
  dist: {type: Number, required: true}
})

module.exports = mongoose.model('Rota', rotaSchema)
