const express = require('express');
const router = express.Router();
const {
  getTotalCustomers,
  getSalesToday,
  getMonthlySales,
  getYearlySales
} = require('../metricsFunctions');

router.get('/api/metrics', async (req, res) => {
  try {
    const totalCustomers = await getTotalCustomers();
    const salesToday = await getSalesToday();
    const monthlySales = await getMonthlySales();
    const yearlySales = await getYearlySales();

    res.json({
      totalCustomers,
      salesToday,
      monthlySales,
      yearlySales
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch metrics data' });
  }
});

module.exports = router;
