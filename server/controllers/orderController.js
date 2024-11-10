
const createOrders = require('../models/createOrder');


exports.createOrder = async (req, res) => {
  try {
    const { customerName, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item.' });
    }


    const newOrder = new createOrders({
      customerName,
      items
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Get all orders with pagination
exports.getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { orderDate: -1 }
    };

    const orders = await createOrders.paginate({}, options);

    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
