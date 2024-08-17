const express = require('express');
const router = express.Router();
const RawMaterial = require('../models/rawMaterial');
const { getRawMaterials } = require('../controllers/rawMaterialsController');

router.get('/', getRawMaterials);
// Add a new raw material
router.post('/', async (req, res) => {
  try {
    const { name, quantity, pricePerKg } = req.body;

    // Create a new raw material
    const newRawMaterial = new RawMaterial({
      name,
      quantity,
      pricePerKg
    });

    // Save to the database
    await newRawMaterial.save();

    res.status(201).json(newRawMaterial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all raw materials
router.get('/', async (req, res) => {
  try {
    const rawMaterials = await RawMaterial.find();
    res.json(rawMaterials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific raw material by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const rawMaterial = await RawMaterial.findById(req.params.id);
//     if (rawMaterial) {
//       res.json(rawMaterial);
//     } else {
//       res.status(404).json({ message: 'Raw material not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Update a raw material by ID (this example assumes updating the quantity and price)
// router.put('/:id', async (req, res) => {
//   try {
//     const { quantity, pricePerKg } = req.body;
//     const rawMaterial = await RawMaterial.findById(req.params.id);
//     if (rawMaterial) {
//       rawMaterial.quantity = quantity;
//       rawMaterial.pricePerKg = pricePerKg;
//       await rawMaterial.save();
//       res.json(rawMaterial);
//     } else {
//       res.status(404).json({ message: 'Raw material not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// Delete a raw material by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const result = await RawMaterial.findByIdAndDelete(req.params.id);
//     if (result) {
//       res.json({ message: 'Raw material deleted' });
//     } else {
//       res.status(404).json({ message: 'Raw material not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

router.get('/unique-names', async (req, res) => {
    try {
      const rawMaterialNames = await RawMaterial.distinct('name');
      res.json(rawMaterialNames);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
