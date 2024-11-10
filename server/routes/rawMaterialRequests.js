
const express = require('express');
const router = express.Router();
const RawMaterialRequest = require('../models/rawMaterialRequest');

// POST 
router.post('/', async (req, res) => {
    try {
        const { materialName, requestedQuantity, notes } = req.body;

      
        if (!materialName || !requestedQuantity) {
            return res.status(400).json({ message: 'Material name and requested quantity are required.' });
        }

        const newRequest = new RawMaterialRequest({
            materialName,
            requestedQuantity,
            notes
        });

        await newRequest.save();

        res.status(201).json({ message: 'Raw material request submitted successfully.', request: newRequest });
    } catch (error) {
        console.error('Error creating raw material request:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET 
router.get('/', async (req, res) => {
    try {
        const requests = await RawMaterialRequest.find().sort({ requestDate: -1 });
        res.json({ requests });
    } catch (error) {
        console.error('Error fetching raw material requests:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
