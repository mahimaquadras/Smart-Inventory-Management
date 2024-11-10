const express = require('express');
const router = express.Router();

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


router.get('/new', async (req, res) => {
  try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

     
      const newOrders = await createOrders.find({
          orderDate: { $gte: startOfDay, $lte: endOfDay },
          status: 'Placed'
      }).sort({ orderDate: -1 }); 

      res.json({ newOrders });
  } catch (error) {
      console.error('Error fetching new orders:', error);
      res.status(500).json({ message: 'Server Error' });
  }
});




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

router.get('/items', async (req, res) => {
  try {
    const items = await Order.aggregate([
      { $unwind: '$items' },
      { $group: { _id: '$items.itemName', quantity: { $sum: '$items.quantity' } } },
      { $project: { _id: 0, itemName: '$_id', quantity: 1 } },
    ]);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await createOrders.findByIdAndUpdate(id, { status }, { new: true });
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;  

    const order = await createOrders.findByIdAndUpdate(id, { status }, { new: true });
    if (order) {
      res.status(200).json(order);  
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
