
const express = require('express');
const router = express.Router();
const RawMaterialRequest = require('../models/rawMaterialRequest');
const RawMaterial = require('../models/rawMaterial');

router.get('/', async (req, res) => {
    try {
        const requests = await RawMaterialRequest.find().sort({ requestDate: -1 });
        res.json({ requests });
    } catch (error) {
        console.error('Error fetching raw material requests:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// PUT 
router.put('/:id/approve', async (req, res) => {
    try {
        const requestId = req.params.id;
        const managerName = req.body.managerName || 'Manager'; 

        
        const request = await RawMaterialRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found.' });
        }

        if (request.status !== 'Pending') {
            return res.status(400).json({ message: 'Request has already been processed.' });
        }

        // Update the request status to Approved
        request.status = 'Approved';
        request.approvedBy = managerName;
        await request.save();

        // Add the requested quantity to the raw material inventory
        let rawMaterial = await RawMaterial.findOne({ name: request.materialName });
        if (rawMaterial) {
            rawMaterial.quantity += request.requestedQuantity;
            await rawMaterial.save();
        } else {
            // If the raw material doesn't exist, create a new entry
            rawMaterial = new RawMaterial({
                name: request.materialName,
                quantity: request.requestedQuantity,
                pricePerKg: 0, 
            });
            await rawMaterial.save();
        }

        res.json({ message: 'Request approved and inventory updated.', request });
    } catch (error) {
        console.error('Error approving raw material request:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// PUT 
// Reject a raw material request
router.put('/:id/reject', async (req, res) => {
    try {
        const requestId = req.params.id;
        const managerName = req.body.managerName || 'Manager'; 

       
        const request = await RawMaterialRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found.' });
        }

        if (request.status !== 'Pending') {
            return res.status(400).json({ message: 'Request has already been processed.' });
        }

        // Update the request status to Rejected
        request.status = 'Rejected';
        request.rejectedBy = managerName;
        await request.save();

        res.json({ message: 'Request rejected.', request });
    } catch (error) {
        console.error('Error rejecting raw material request:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
