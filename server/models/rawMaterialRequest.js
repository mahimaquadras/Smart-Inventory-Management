
const mongoose = require('mongoose');

const rawMaterialRequestSchema = new mongoose.Schema({
  materialName: { type: String, required: true },
  requestedQuantity: { type: Number, required: true },
  requestDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }, // Possible statuses: Pending, Approved, Rejected
  notes: { type: String }
});

const RawMaterialRequest = mongoose.model('RawMaterialRequest', rawMaterialRequestSchema);

module.exports = RawMaterialRequest;
