const createOrders = require('./models/createOrder');

async function getTotalCustomers() {
  try {
    const orders = await createOrders.distinct('customerName');
    return orders.length;
  } catch (error) {
    console.error('Error fetching total customers:', error);
    throw error;
  }
}

async function getSalesToday() {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const orders = await createOrders.aggregate([
      { $match: { orderDate: { $gte: startOfDay, $lte: endOfDay } } },
      { $unwind: '$items' },
      { $group: { _id: null, total: { $sum: { $multiply: ['$items.quantity', '$items.price'] } } } }
    ]);

    return orders.length > 0 ? orders[0].total : 0;
  } catch (error) {
    console.error('Error fetching sales today:', error);
    throw error;
  }
}

async function getMonthlySales() {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

    const orders = await createOrders.aggregate([
      { $match: { orderDate: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $unwind: '$items' },
      { $group: { _id: null, total: { $sum: { $multiply: ['$items.quantity', '$items.price'] } } } }
    ]);

    return orders.length > 0 ? orders[0].total : 0;
  } catch (error) {
    console.error('Error fetching monthly sales:', error);
    throw error;
  }
}

async function getYearlySales() {
  try {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

    const orders = await createOrders.aggregate([
      { $match: { orderDate: { $gte: startOfYear, $lte: endOfYear } } },
      { $unwind: '$items' },
      { $group: { _id: null, total: { $sum: { $multiply: ['$items.quantity', '$items.price'] } } } }
    ]);

    return orders.length > 0 ? orders[0].total : 0;
  } catch (error) {
    console.error('Error fetching yearly sales:', error);
    throw error;
  }
}

module.exports = {
  getTotalCustomers,
  getSalesToday,
  getMonthlySales,
  getYearlySales
};
