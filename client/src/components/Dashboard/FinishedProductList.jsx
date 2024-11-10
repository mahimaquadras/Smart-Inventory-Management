import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css'; 

const FinishedProductsList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://smart-inventory-management-api.onrender.com/api/finished-products');
        setProducts(res.data);
        checkLowStock(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  const checkLowStock = (products) => {
    const lowStockProducts = products.filter(product => product.qntyAvailable < 5);
    if (lowStockProducts.length > 0) {
      setAlertMessage('Some products are running low on stock. Please review the inventory.');
    }
  };

  return (
    <div className={styles.productsContainer}>
      <h6 className={styles.title}>Finished Products</h6>
      {error && <p className={styles.error}>{error}</p>}
      {alertMessage && <div className={styles.alert}>{alertMessage}</div>}
      <table className={styles.productsTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.itemName || 'No Name'}</td>
                <td>{product.qntyAvailable}</td>
                <td className={product.qntyAvailable > 0 ? styles.inStock : styles.outOfStock}>
                  {product.qntyAvailable > 0 ? 'In Stock' : 'Out of Stock'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FinishedProductsList;
