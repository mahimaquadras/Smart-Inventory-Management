
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './styles.module.css'; 
import { FaSpinner } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom';

const ChefDashboard = () => {
    const navigate = useNavigate(); 
    const [newOrders, setNewOrders] = useState([]);
    const [lowStock, setLowStock] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [loadingStock, setLoadingStock] = useState(true);
    const [orderError, setOrderError] = useState(null);
    const [stockError, setStockError] = useState(null);

    useEffect(() => {
        
        const fetchNewOrders = async () => {
            try {
                const response = await axios.get('https://smart-inventory-management-api.onrender.com/api/createOrder/new');
                setNewOrders(response.data.newOrders);
            } catch (err) {
                console.error('Error fetching new orders:', err);
                setOrderError('Failed to fetch new orders.');
            } finally {
                setLoadingOrders(false);
            }
        };

       
        const fetchLowStock = async () => {
            try {
                const response = await axios.get('https://smart-inventory-management-api.onrender.com/api/rawMaterial/low-stock');
                setLowStock(response.data.lowStock);
            } catch (err) {
                console.error('Error fetching low stock materials:', err);
                setStockError('Failed to fetch low stock materials.');
            } finally {
                setLoadingStock(false);
            }
        };

        fetchNewOrders();
        fetchLowStock();
    }, []);

    return (
        <div className={styles.container}>
          
            <div className={styles.mainContent}>
                <h1 className={styles.welcome}>Welcome, Chef!</h1>

               
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Today's Highlights</h2>
                   
                    {orderError && <p className={styles.error}>{orderError}</p>}
                    {stockError && <p className={styles.error}>{stockError}</p>}
                    <div className={styles.cardsContainer}>
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>New Orders</h3>
                            {loadingOrders ? (
                                <div className={styles.spinnerContainer}>
                                    <FaSpinner className={styles.spinner} />
                                </div>
                            ) : newOrders.length > 0 ? (
                                <div className={styles.ordersList}>
                                    {newOrders.map(order => (
                                        <div key={order.orderId} className={styles.orderCard}>
                                            <h4 className={styles.orderId}>Order ID: {order.orderId}</h4>
                                            <p className={styles.customerName}>Customer: {order.customerName}</p>
                                            <div className={styles.orderItems}>
                                                <h5>Items:</h5>
                                                <ul>
                                                    {order.items.map((item, index) => (
                                                        <li key={index} className={styles.orderItem}>
                                                            {item.itemName} - Quantity: {item.quantity}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className={styles.cardContent}>No new orders today!</p>
                            )}
                        </div>
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Low Stock Alert</h3>
                            {loadingStock ? (
                                <div className={styles.spinnerContainer}>
                                    <FaSpinner className={styles.spinner} />
                                </div>
                            ) : lowStock.length > 0 ? (
                                <ul className={styles.list}>
                                    {lowStock.map(material => (
                                        <li key={material._id} className={styles.listItem}>
                                            <strong>{material.name}</strong>: {material.quantity} units left
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className={styles.cardContent}>No low stock alerts!</p>
                            )}
                        </div>
                    </div>
                </section>

               
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Quick Actions</h2>
                    <div className={styles.buttonsContainer}>
                        {/* <button className={`${styles.button} ${styles.buttonGreen}`}>
                            Add New Recipe
                        </button>
                        <button className={`${styles.button} ${styles.buttonOrange}`}>
                            View Orders
                        </button>
                        <button className={`${styles.button} ${styles.buttonRed}`}>
                            Manage Inventory
                        </button> */}
                       <button
                        className={`${styles.button} ${styles.buttonGreen}`}
                        onClick={() => navigate('/add-recipe')}
                    >
                        Add New Recipe
                    </button>
                    <button
                        className={`${styles.button} ${styles.buttonOrange}`}
                        onClick={() => navigate('/order-fulfillment')}
                    >
                        View Orders
                    </button>
                    <button
                        className={`${styles.button} ${styles.buttonRed}`}
                        onClick={() => navigate('/manage-rawMaterial')}
                    >
                        Manage Inventory
                    </button>
                    </div>
                </section>

                           </div>
        </div>
    );
};

export default ChefDashboard;
