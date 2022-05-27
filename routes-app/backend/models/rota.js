const mongoose = require('mongoose');

const rotaSchema = mongoose.Schema({
  pontoOrigem: {type: String, required: true},
  pontoDestino: {type: String, required: true},
  dist: {type: Number, required: true},
  status: {type: Boolean, required: false, default: true}
})

module.exports = mongoose.model('Rota', rotaSchema)
