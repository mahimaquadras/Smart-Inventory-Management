const express = require('express');
const router = express.Router();
const RawMaterial = require('../models/rawMaterial');
const { getRawMaterials } = require('../controllers/rawMaterialsController');

const LOW_STOCK_THRESHOLD = 3;

// GET 
router.get('/low-stock', async (req, res) => {
    try {
        const lowStockMaterials = await RawMaterial.find({
            quantity: { $lt: LOW_STOCK_THRESHOLD }
        });

        res.json({ lowStock: lowStockMaterials });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/', getRawMaterials);

router.post('/', async (req, res) => {
  try {
    const { name, quantity, pricePerKg } = req.body;

    
    const newRawMaterial = new RawMaterial({
      name,
      quantity,
      pricePerKg
    });

    
    await newRawMaterial.save();

    res.status(201).json(newRawMaterial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const rawMaterials = await RawMaterial.find();
    res.json(rawMaterials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




router.get('/unique-names', async (req, res) => {
    try {
      const rawMaterialNames = await RawMaterial.distinct('name');
      res.json(rawMaterialNames);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
