const CreateOrder = require('../models/createOrder');

exports.getMostSoldItem = async (req, res) => {
    try {
        const orders = await CreateOrder.aggregate([
            { $unwind: "$items" },
            { $group: { _id: "$items.itemName", totalQuantity: { $sum: "$items.quantity" } } },
            { $sort: { totalQuantity: -1 } },
            { $limit: 1 }
        ]);

        if (orders.length > 0) {
            res.json({ mostSoldItem: orders[0]._id, quantity: orders[0].totalQuantity });
        } else {
            res.json({ mostSoldItem: null, quantity: 0 });
        }
    } catch (err) {
        res.status(500).json({ message: "Error fetching most sold item", error: err });
    }
};
