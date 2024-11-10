import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';  

const OrderFulfillment = () => {
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
      fetchOrders();
    }, []);
  
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8090/api/createOrder');
        const data = await response.json();
        setOrders(data.newOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    const updateStatus = async (orderId, status) => {
      try {
        const response = await fetch(`http://localhost:8090/api/createOrder/${orderId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        });
  
        if (response.ok) {
          fetchOrders();
        } else {
          console.error('Failed to update status');
        }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };
  
    return (
      <div className={styles.container}>
        <h1>Order Fulfillment</h1>
        {orders.map((order) => (
          <div key={order._id} className={styles.orderCard}>
            <div className={styles.orderHeader}>
              <h2>Order ID: {order.orderId}</h2>
              <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
            <ul className={styles.orderItems}>
              {order.items.map((item, index) => (
                <li key={index}>{item.itemName} x{item.quantity} - ₹{item.price}</li>
              ))}
            </ul>
            <div className={styles.orderFooter}>
              <p><strong>Status:</strong> {order.status}</p>
              <button
                className={`${styles.statusBtn} ${styles[order.status.toLowerCase()]}`}
                onClick={() => updateStatus(order._id, 'In Progress')}
              >
                In Progress
              </button>
              <button
                className={`${styles.statusBtn} ${styles[order.status.toLowerCase()]}`}
                onClick={() => updateStatus(order._id, 'Completed')}
              >
                Completed
              </button>
              <button
                className={`${styles.statusBtn} ${styles[order.status.toLowerCase()]}`}
                onClick={() => updateStatus(order._id, 'Ready for Pickup')}
              >
                Ready for Pickup
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default OrderFulfillment;