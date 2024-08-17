// routes/finishedProducts.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RawMaterial = require('../models/rawMaterial');
const FinishedProduct = require('../models/finishedProducts');

// Create a new finished product and update raw materials
router.post('/', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, rawMaterials } = req.body;

    // Validate input
    if (!name || !Array.isArray(rawMaterials) || rawMaterials.length === 0) {
      return res.status(400).json({ message: 'Invalid input data' });
    }

    // Create the finished product
    const newProduct = new FinishedProduct({
      name,
      rawMaterials
    });

    // Save the finished product to the database
    await newProduct.save({ session });

//     // Deduct raw materials used
//     for (const item of rawMaterials) {
//       const rawMaterial = await RawMaterial.findOne({ name: item.materialName }).session(session);
//       if (rawMaterial) {
//         if (rawMaterial.quantity < item.quantityUsed) {
//           await session.abortTransaction();
//           session.endSession();
//           return res.status(400).json({ message: `Not enough ${item.materialName} in stock` });
//         }
//         rawMaterial.quantity -= item.quantityUsed;
//         await rawMaterial.save({ session });
//       } else {
//         await session.abortTransaction();
//         session.endSession();
//         return res.status(404).json({ message: `${item.materialName} not found` });
//       }
//     }

//     await session.commitTransaction();
//     session.endSession();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     await session.abortTransaction();
//     session.endSession();
//     res.status(500).json({ message: err.message });
//   }
// });

// Aggregate raw materials quantities
for (const item of rawMaterials) {
    const totalQuantity = await RawMaterial.aggregate([
      { $match: { name: item.materialName } },
      { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } }
    ]);

    if (totalQuantity.length === 0 || totalQuantity[0].totalQuantity < item.quantityUsed) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: `Not enough ${item.materialName} in stock` });
    }

    // Deduct the quantity from raw materials
    let remainingQuantity = item.quantityUsed;
    const rawMaterialsToUpdate = await RawMaterial.find({ name: item.materialName }).sort({ quantity: -1 });

    for (const rawMaterial of rawMaterialsToUpdate) {
      if (remainingQuantity <= 0) break;
      if (rawMaterial.quantity >= remainingQuantity) {
        rawMaterial.quantity -= remainingQuantity;
        remainingQuantity = 0;
      } else {
        remainingQuantity -= rawMaterial.quantity;
        rawMaterial.quantity = 0;
      }
      await rawMaterial.save({ session });
    }
  }

  await session.commitTransaction();
  session.endSession();

  res.status(201).json(newProduct);
} catch (err) {
  await session.abortTransaction();
  session.endSession();
  res.status(500).json({ message: err.message });
}
});


// Get all finished products
router.get('/', async (req, res) => {
  try {
    const finishedProducts = await FinishedProduct.find();
    res.json(finishedProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
