
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/total-orders', dashboardController.getTotalOrders);
router.get('/total-sales', dashboardController.getTotalSales);

module.exports = router;
