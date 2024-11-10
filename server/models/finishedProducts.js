const mongoose = require('mongoose');

const finishedProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rawMaterials: [
    {
      materialName: { type: String, required: true },
      quantityUsed: { type: Number, required: true }
    }
  ]
});

const FinishedProduct = mongoose.model('FinishedProduct', finishedProductSchema);

module.exports = FinishedProduct;
