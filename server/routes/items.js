const express = require('express');
const router = express.Router();
const Item = require('../models/items');


router.get('/', async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
    const items = await Item.find({}, 'itemName'); 
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    const { qntyAvailable } = req.body;
    
    
    const item = await Item.findByIdAndUpdate(id, { qntyAvailable }, { new: true });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
