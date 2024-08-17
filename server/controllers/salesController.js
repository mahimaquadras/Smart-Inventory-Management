const CreateOrder = require('../models/createOrder');

exports.getTotalSales = async (req, res) => {
    const { range } = req.query;
    let dateFilter = {};

    if (range === '1day') {
        dateFilter = { orderDate: { $gte: new Date(Date.now() - 24*60*60*1000) } };
    } else if (range === '1week') {
        dateFilter = { orderDate: { $gte: new Date(Date.now() - 7*24*60*60*1000) } };
    }

    try {
        const orders = await CreateOrder.find(dateFilter);
        const totalSales = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.price * item.quantity, 0), 0);
        const totalOrders = orders.length;

        res.json({ totalSales, totalOrders });
    } catch (err) {
        res.status(500).json({ message: "Error fetching sales data", error: err });
    }
};
