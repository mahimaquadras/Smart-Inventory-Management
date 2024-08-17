const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const createOrders = require('../models/createOrder'); 

router.post('/', async (req, res) => {
  const { orderId, customerName, items, orderDate, status } = req.body;
  const newOrder = new createOrders({
    orderId,
    customerName,
    items,
    orderDate,
    status
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).send({message: "Internal server error"});
  }
});

// router.get('/', async (req, res) => {
//   try {
//     const orders = await createOrders.find();
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalOrders = await createOrders.countDocuments();
    
    const orders = await createOrders.find();
    var end = page*limit 
    var start = end - limit
    if(end > orders.length){
      end = orders.length
      start = (page-1)*limit
    }
    
    var newOrders = orders.slice(start,end)

    var data = {
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
      newOrders
    }
    console.log(data)
    res.json(data);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
});

const updateData = async () => {
  await createOrders.updateMany(
    { 'items.quantity': { $not: { $type: 'number' } } },
    { $set: { 'items.$[].quantity': 0 } }
  );

  await createOrders.updateMany(
    { 'items.price': { $not: { $type: 'number' } } },
    { $set: { 'items.$[].price': 0 } }
  );
};

updateData().then(() => {
  console.log('Data update complete');
});





module.exports = router;
