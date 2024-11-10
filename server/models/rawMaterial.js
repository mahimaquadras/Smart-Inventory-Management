const mongoose = require('mongoose');

const rawMaterialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  pricePerKg: { type: Number, required: true }
});

const LOW_STOCK_THRESHOLD = 3; 

rawMaterialSchema.post('save', async function(doc, next) {
  if (doc.quantity < LOW_STOCK_THRESHOLD) {
    const message = `Low stock alert: ${doc.name} has only ${doc.quantity} units left.`;
    console.log(message);
  }
  next();
});

const RawMaterial = mongoose.model('RawMaterial', rawMaterialSchema);

module.exports = RawMaterial;
