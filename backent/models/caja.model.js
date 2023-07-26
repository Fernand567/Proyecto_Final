// caja.model.js

const mongoose = require('mongoose');

const cajaSchema = new mongoose.Schema({
  nombre: { type: String },
  tamano: { type: String, required: true },
  cantidad: { type: Number, default: 0 },
});

const Caja = mongoose.model('Caja', cajaSchema);

module.exports = Caja;
