const express = require('express');
const { getMostSoldItem } = require('../controllers/mostSoldItemController');
const router = express.Router();

router.get('/', getMostSoldItem);

module.exports = router;
