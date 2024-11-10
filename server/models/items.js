const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true, unique: true },
  price: { type: Number, required: true, min: 0 },
  category: {type: String, required: true},
  qntyAvailable: {type: Number, required: true}
});

const Item = mongoose.model("items", itemSchema);

module.exports = Item;
