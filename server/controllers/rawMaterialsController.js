const RawMaterial = require('../models/rawMaterial');

exports.getRawMaterials = async (req, res) => {
    try {
        const rawMaterials = await RawMaterial.find({});
        res.json(rawMaterials);
    } catch (err) {
        res.status(500).json({ message: "Error fetching raw materials", error: err });
    }
};
