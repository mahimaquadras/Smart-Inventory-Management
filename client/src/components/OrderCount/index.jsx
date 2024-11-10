// src/components/OrderCount.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const OrderCount = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/orders/count');
        setOrderCount(response.data.count);
      } catch (err) {
        console.error('Error fetching order count:', err);
        setError('Failed to fetch order count');
      }
    };

    fetchOrderCount();
  }, []);

  return (
    <div className={styles.container}>
      {error ? <p className={styles.error}>{error}</p> : <h2>{orderCount}</h2>}
      <p>Total Orders</p>
    </div>
  );
};

export default OrderCount;
