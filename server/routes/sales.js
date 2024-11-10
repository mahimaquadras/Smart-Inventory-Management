const express = require('express');
const router = express.Router();
const createOrders = require('../models/createOrder');
const { getTotalSales } = require('../controllers/salesController');

router.get('/', getTotalSales);

router.get('/', async (req, res) => {
  try {
    const { range } = req.query;
    let startDate;

    
    switch (range) {
      case '1day':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 1);
        break;
      case '1week':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'all':
      default:
        startDate = new Date(0); 
        break;
    }

    console.log(`Fetching sales from ${startDate} for range: ${range}`);

    
    const sales = await createOrders.aggregate([
      { $match: { orderDate: { $gte: startDate } } },
      { $unwind: '$items' },
      { 
        $match: { 
          'items.quantity': { $type: 'number' }, 
          'items.price': { $type: 'number' }
        } 
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
        },
      },
    ]);

    const totalSales = sales.length > 0 ? sales[0].totalSales : 0;
    res.json({ totalSales });
  } catch (err) {
    console.error('Error fetching sales data:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
