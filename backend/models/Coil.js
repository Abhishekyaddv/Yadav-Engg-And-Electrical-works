const mongoose = require('mongoose');

const coilSchema = new mongoose.Schema({
    type: { type: String, enum: ['New', 'Recoil'], required: true },
    size: { type: String, required: true }, // e.g., "M8" or "8mm"
    unitPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Coil', coilSchema);