
const createOrders = require('../models/createOrder');

const getDateRange = (range) => {
  const endDate = new Date();
  let startDate;
  
  if (range === 'today') {
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
  } else if (range === '7days') {
    startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);
  } else {
    startDate = new Date(0); 
  }

  return { startDate, endDate };
};

// total orders
exports.getTotalOrders = async (req, res) => {
  try {
    const { range } = req.query;
    const { startDate, endDate } = getDateRange(range);
    
    const totalOrders = await createOrders.countDocuments({
      orderDate: { $gte: startDate, $lt: endDate }
    });
    
    res.json({ totalOrders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch total orders' });
  }
};

// total sales
exports.getTotalSales = async (req, res) => {
  try {
    const { range } = req.query;
    const { startDate, endDate } = getDateRange(range);
    
    const totalSales = await createOrders.aggregate([
      { $match: { orderDate: { $gte: startDate, $lt: endDate } } },
      { $unwind: '$items' },
      { $group: { _id: null, totalSales: { $sum: { $multiply: ['$items.quantity', '$items.price'] } } } }
    ]);
    
    res.json({ totalSales: totalSales[0]?.totalSales || 0 });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch total sales' });
  }
};
