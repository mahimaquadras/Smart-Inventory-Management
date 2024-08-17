const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// const createOrderSchema = new mongoose.Schema({
//     product: { type: String, required: true},
// 	size: { type: String, required: true },
//     quantity: {type: String, required: true},
// 	customer_name: { type: String, required: true },
// 	contact_no: { type: String, required: true },
// 	address: { type: String, required: true }
// });

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

module.exports =  createOrders ;
