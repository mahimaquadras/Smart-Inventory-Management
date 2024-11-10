import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';  

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:8090/api/createOrder?page='+currentPage+'&limit=5', {
          params: { page: currentPage, limit: itemsPerPage }
        });
        console.log(res.data); 
        console.log('Fetched Orders:', res.data);
        console.log('Total Pages:', res.data.totalPages);

        setOrders(res.data.newOrders || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch orders');
      }
    };
    fetchOrders();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h1>Orders List</h1>
      {error && <p>{error}</p>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Items</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.itemName} - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? styles.active : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;


