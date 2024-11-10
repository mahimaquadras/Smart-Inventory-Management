
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const TotalOrdersWidget = ({ range }) => {
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {
        const fetchTotalOrders = async () => {
            try {
                const response = await axios.get(`https://smart-inventory-management-api.onrender.com/api/orders/total?range=${range}`);
                setTotalOrders(response.data.total);
            } catch (err) {
                console.error('Failed to fetch total orders:', err);
            }
        };
        fetchTotalOrders();
    }, [range]);

    return (
        <div className={styles.widget}>
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
        </div>
    );
};

export default TotalOrdersWidget;
