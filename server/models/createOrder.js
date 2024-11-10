
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const createOrderSchema = new mongoose.Schema({
  orderId: String,
  customerName: String,
  items: [{ 
    itemName: String, 
    quantity: Number, 
    price: Number 
  }],
  orderDate: Date,
  status: { type: String, default: 'Placed' }
});


createOrderSchema.plugin(mongoosePaginate);


 

const createOrders = mongoose.model("createOrder", createOrderSchema);

module.exports = createOrders;
