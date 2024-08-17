const express = require('express');
const router = express.Router();
const Item = require('../models/items');

// GET - Fetch all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Fetch price of a specific item by itemName
router.get('/price/:itemName', async (req, res) => {
  try {
    const item = await Item.findOne({ itemName: req.params.itemName });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ price: item.price });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/itemName', async (req, res) => {
  try {
    const items = await Item.find({}, 'itemName'); // Only select the 'name' field
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
