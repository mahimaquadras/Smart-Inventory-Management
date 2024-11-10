import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
const OrderForm = () => {
  const [order, setOrder] = useState({
    customerName: '',
    items: [{ itemName: '', quantity: 1, price: 0 }]
  });
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('https://smart-inventory-management-api.onrender.com/api/items');
        setItems(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch items');
      }
    };
    fetchItems();
  }, []);

  const handleItemChange = async (index, event) => {
    const itemName = event.target.value;
    const newItems = [...order.items];
    newItems[index].itemName = itemName;

    try {
      const res = await axios.get(`https://smart-inventory-management-api.onrender.com/api/items/price/${itemName}`);
      const itemPrice = res.data.price;

      // Calculate the total price based on the item price and quantity
      newItems[index].price = itemPrice * newItems[index].quantity;
    } catch (err) {
      console.error(err);
      setError('Failed to fetch item price');
    }

    setOrder({ ...order, items: newItems });
  };

  const handleQuantityChange = (index, event) => {
    const quantity = event.target.value;
    const newItems = [...order.items];
    newItems[index].quantity = quantity;

   
    if (newItems[index].itemName) {
      const selectedItem = items.find(item => item.itemName === newItems[index].itemName);
      if (selectedItem) {
        newItems[index].price = selectedItem.price * quantity;
      }
    }

    setOrder({ ...order, items: newItems });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
   
      const url = "https://smart-inventory-management-api.onrender.com/api/createOrder";
  
      const updatedItems = order.items.map(async (orderItem) => {
        const selectedItem = items.find(i => i.itemName === orderItem.itemName);
  
       
        if (selectedItem.qntyAvailable < orderItem.quantity) {
          throw new Error(`Not enough stock for ${orderItem.itemName}`);
        }
  
        
        await axios.put(`http://localhost:8090/api/items/update/${selectedItem._id}`, {
          qntyAvailable: selectedItem.qntyAvailable - orderItem.quantity,
        });
      });
  
      
      await Promise.all(updatedItems);
  
      
      await axios.post(url, order);
  
     
      window.location = "/";
    } catch (error) {
      
      console.error('Error during order submission:', error);
      if (error.response) {
       
        setError(error.response.data.message || 'An error occurred');
      } else {
       
        setError(error.message || 'An unexpected error occurred');
      }
    }
  };
  

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Order ID</label>
          <input type="text" name="orderId" value={order.orderId} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Customer Name</label>
          <input type="text" name="customerName" value={order.customerName} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Order Date</label>
          <input type="date" name="orderDate" value={order.orderDate} onChange={handleChange} />
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <select value={item.itemName} onChange={(e) => handleItemChange(index, e)}>
                      <option value="">Select Item</option>
                      {items.length > 0 ? (
                        items.map((item) => (
                          <option key={item._id} value={item.itemName}>
                            {item.itemName}
                          </option>
                        ))
                      ) : (
                        <option disabled>No items available</option>
                      )}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(index, e)}
                      required
                      min="1"
                    />
                  </td>
                  <td>
                    <span>Price: {item.price.toFixed(2)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button type="submit">Submit Order</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default OrderForm;
