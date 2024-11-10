// // src/pages/ChefDashboard.js
// import React from 'react';
// import ChefSidebar from '../ChefSidebar/chef-sidebar';

// const ChefDashboard = () => {
//     return (
//         <div style={{ display: 'flex', minHeight: '100vh' }}>
           
//             <div style={{ flexGrow: 1, padding: '20px', marginLeft: '200px' }}>
//                 <h1>Welcome, Chef!</h1>
                
//                 {/* Dashboard Sections */}
//                 <section style={{ margin: '20px 0' }}>
//                     <h2>Today's Highlights</h2>
//                     <div style={{ display: 'flex', gap: '20px' }}>
//                         <div style={{ flex: '1', background: '#f3f3f3', padding: '15px', borderRadius: '8px' }}>
//                             <h3>New Orders</h3>
//                             <p>You have <strong>5 new orders</strong> to prepare today!</p>
//                         </div>
//                         <div style={{ flex: '1', background: '#f3f3f3', padding: '15px', borderRadius: '8px' }}>
//                             <h3>Low Stock Alert</h3>
//                             <p><strong>3 ingredients</strong> are running low. Review and restock to avoid delays.</p>
//                         </div>
//                     </div>
//                 </section>

//                 <section style={{ margin: '20px 0' }}>
//                     <h2>Quick Actions</h2>
//                     <div style={{ display: 'flex', gap: '20px' }}>
//                         <button style={{ flex: '1', padding: '15px', borderRadius: '8px', background: '#4CAF50', color: '#fff' }}>
//                             Add New Recipe
//                         </button>
//                         <button style={{ flex: '1', padding: '15px', borderRadius: '8px', background: '#FF9800', color: '#fff' }}>
//                             View Orders
//                         </button>
//                         <button style={{ flex: '1', padding: '15px', borderRadius: '8px', background: '#F44336', color: '#fff' }}>
//                             Manage Inventory
//                         </button>
//                     </div>
//                 </section>

//                 <section style={{ margin: '20px 0' }}>
//                     <h2>Recipe Inspiration</h2>
//                     <p>Check out trending recipes for inspiration. Stay updated with new culinary ideas!</p>
//                 </section>

//                 <section style={{ margin: '20px 0' }}>
//                     <h2>Tips of the Day</h2>
//                     <p>Optimize your kitchen efficiency with these quick tips.</p>
//                     <ul>
//                         <li><strong>Save time</strong> by pre-prepping ingredients for popular recipes.</li>
//                         <li><strong>Reduce waste</strong> by tracking and managing inventory efficiently.</li>
//                     </ul>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default ChefDashboard;


// src/pages/ChefDashboard.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';


// const ChefDashboard = () => {
//     const [newOrders, setNewOrders] = useState(0);
//     const [lowStock, setLowStock] = useState([]);
//     const [loadingOrders, setLoadingOrders] = useState(true);
//     const [loadingStock, setLoadingStock] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Fetch new orders
//         const fetchNewOrders = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/orders/new');
//                 setNewOrders(response.data.newOrders);
//             } catch (err) {
//                 console.error(err);
//                 setError('Failed to fetch new orders.');
//             } finally {
//                 setLoadingOrders(false);
//             }
//         };

//         // Fetch low stock materials
//         const fetchLowStock = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/raw-materials/low-stock');
//                 setLowStock(response.data.lowStock);
//             } catch (err) {
//                 console.error(err);
//                 setError('Failed to fetch low stock materials.');
//             } finally {
//                 setLoadingStock(false);
//             }
//         };

//         fetchNewOrders();
//         fetchLowStock();
//     }, []);

//     return (
//         <div style={{ display: 'flex', minHeight: '100vh' }}>
//             <div style={{ flexGrow: 1, padding: '20px', marginLeft: '200px' }}>
//                 <h1>Welcome, Chef!</h1>

//                 {/* Dashboard Sections */}
//                 <section style={{ margin: '20px 0' }}>
//                     <h2>Today's Highlights</h2>
//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                     <div style={{ display: 'flex', gap: '20px' }}>
//                         <div style={{ flex: '1', background: '#f3f3f3', padding: '15px', borderRadius: '8px' }}>
//                             <h3>New Orders</h3>
//                             {loadingOrders ? (
//                                 <p>Loading...</p>
//                             ) : (
//                                 <p>You have <strong>{newOrders} new orders</strong> to prepare today!</p>
//                             )}
//                         </div>
//                         <div style={{ flex: '1', background: '#f3f3f3', padding: '15px', borderRadius: '8px' }}>
//                             <h3>Low Stock Alert</h3>
//                             {loadingStock ? (
//                                 <p>Loading...</p>
//                             ) : lowStock.length > 0 ? (
//                                 <ul>
//                                     {lowStock.map(material => (
//                                         <li key={material._id}>
//                                             <strong>{material.name}</strong>: {material.quantity} units left
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p>No low stock alerts!</p>
//                             )}
//                         </div>
//                     </div>
//                 </section>

//                 {/* Quick Actions */}
//                 <section style={{ margin: '20px 0' }}>
//                     <h2>Quick Actions</h2>
//                     <div style={{ display: 'flex', gap: '20px' }}>
//                         <button style={{ flex: '1', padding: '15px', borderRadius: '8px', background: '#4CAF50', color: '#fff' }}>
//                             Add New Recipe
//                         </button>
//                         <button style={{ flex: '1', padding: '15px', borderRadius: '8px', background: '#FF9800', color: '#fff' }}>
//                             View Orders
//                         </button>
//                         <button style={{ flex: '1', padding: '15px', borderRadius: '8px', background: '#F44336', color: '#fff' }}>
//                             Manage Inventory
//                         </button>
//                     </div>
//                 </section>

//                 {/* Recipe Inspiration */}
//                 <section style={{ margin: '20px 0' }}>
//                     <h2>Recipe Inspiration</h2>
//                     <p>Check out trending recipes for inspiration. Stay updated with new culinary ideas!</p>
//                 </section>

//                 {/* Tips of the Day */}
//                 <section style={{ margin: '20px 0' }}>
//                     <h2>Tips of the Day</h2>
//                     <p>Optimize your kitchen efficiency with these quick tips.</p>
//                     <ul>
//                         <li><strong>Save time</strong> by pre-prepping ingredients for popular recipes.</li>
//                         <li><strong>Reduce waste</strong> by tracking and managing inventory efficiently.</li>
//                     </ul>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default ChefDashboard;




// src/pages/ChefDashboard.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ChefSidebar from '../ChefSidebar/chef-sidebar';

// const ChefDashboard = () => {
//     const [newOrders, setNewOrders] = useState(0);
//     const [lowStock, setLowStock] = useState([]);
//     const [loadingOrders, setLoadingOrders] = useState(true);
//     const [loadingStock, setLoadingStock] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Fetch new orders
//         const fetchNewOrders = async () => {
//             try {
//                 // Use relative path instead of absolute URL
//                 const response = await axios.get('http://localhost:8090/api/createOrder/new');
//                 setNewOrders(response.data.newOrders);
//             } catch (err) {
//                 console.error(err);
//                 setError('Failed to fetch new orders.');
//             } finally {
//                 setLoadingOrders(false);
//             }
//         };

//         // Fetch low stock materials
//         const fetchLowStock = async () => {
//             try {
//                 // Use relative path instead of absolute URL
//                 const response = await axios.get('http://localhost:8090/api/rawMaterial/low-stock');
//                 setLowStock(response.data.lowStock);
//             } catch (err) {
//                 console.error(err);
//                 setError('Failed to fetch low stock materials.');
//             } finally {
//                 setLoadingStock(false);
//             }
//         };

//         fetchNewOrders();
//         fetchLowStock();
//     }, []);

//     return (
//         <div style={{ display: 'flex', minHeight: '100vh' }}>
//             <div style={{ flexGrow: 1, padding: '20px', marginLeft: '200px' }}>
//                 <h1>Welcome, Chef!</h1>

//                 {/* Dashboard Sections */}
//                 <section style={{ margin: '20px 0' }}>
//                     <h2>Today's Highlights</h2>
//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                     <div style={{ display: 'flex', gap: '20px' }}>
//                         <div style={{ flex: '1', background: '#f3f3f3', padding: '15px', borderRadius: '8px' }}>
//                             <h3>New Orders</h3>
//                             {loadingOrders ? (
//                                 <p>Loading...</p>
//                             ) : (
//                                 <p>You have <strong>{newOrders} new orders</strong> to prepare today!</p>
//                             )}
//                         </div>
//                         <div style={{ flex: '1', background: '#f3f3f3', padding: '15px', borderRadius: '8px' }}>
//                             <h3>Low Stock Alert</h3>
//                             {loadingStock ? (
//                                 <p>Loading...</p>
//                             ) : lowStock.length > 0 ? (
//                                 <ul>
//                                     {lowStock.map(material => (
//                                         <li key={material._id}>
//                                             <strong>{material.name}</strong>: {material.quantity} units left
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p>No low stock alerts!</p>
//                             )}
//                         </div>
//                     </div>
//                 </section>

//                 {/* Quick Actions */}
//                 <section style={{ margin: '20px 0' }}>
//                     <h2>Quick Actions</h2>
//                     <div style={{ display: 'flex', gap: '20px' }}>
//                         <button style={{ flex: '1', padding: '15px', borderRadius: '8px', background: '#4CAF50', color: '#fff' }}>
//                             Add New Recipe
//                         </button>
//                         <button style={{ flex: '1', padding: '15px', borderRadius: '8px', background: '#FF9800', color: '#fff' }}>
//                             View Orders
//                         </button>
//                         <button style={{ flex: '1', padding: '15px', borderRadius: '8px', background: '#F44336', color: '#fff' }}>
//                             Manage Inventory
//                         </button>
//                     </div>
//                 </section>

//                 {/* Recipe Inspiration */}
//                 <section style={{ margin: '20px 0' }}>
//                     <h2>Recipe Inspiration</h2>
//                     <p>Check out trending recipes for inspiration. Stay updated with new culinary ideas!</p>
//                 </section>

//                 {/* Tips of the Day */}
//                 <section style={{ margin: '20px 0' }}>
//                     <h2>Tips of the Day</h2>
//                     <p>Optimize your kitchen efficiency with these quick tips.</p>
//                     <ul>
//                         <li><strong>Save time</strong> by pre-prepping ingredients for popular recipes.</li>
//                         <li><strong>Reduce waste</strong> by tracking and managing inventory efficiently.</li>
//                     </ul>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default ChefDashboard;


// src/pages/ChefDashboard.js
// // src/pages/ChefDashboard.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ChefSidebar from '../ChefSidebar/chef-sidebar';
// import styles from './styles.module.css'; // Import CSS Module
// import { FaSpinner } from 'react-icons/fa'; // Optional: For spinner icon

// const ChefDashboard = () => {
//     const [newOrders, setNewOrders] = useState(0);
//     const [lowStock, setLowStock] = useState([]);
//     const [loadingOrders, setLoadingOrders] = useState(true);
//     const [loadingStock, setLoadingStock] = useState(true);
//     const [orderError, setOrderError] = useState(null);
//     const [stockError, setStockError] = useState(null);

//     useEffect(() => {
//         // Fetch new orders
//         const fetchNewOrders = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8090/api/createOrder/new');
//                 setNewOrders(response.data.newOrders);
//             } catch (err) {
//                 console.error('Error fetching new orders:', err);
//                 setOrderError('Failed to fetch new orders.');
//             } finally {
//                 setLoadingOrders(false);
//             }
//         };

//         // Fetch low stock materials
//         const fetchLowStock = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8090/api/rawMaterial/low-stock');
//                 setLowStock(response.data.lowStock);
//             } catch (err) {
//                 console.error('Error fetching low stock materials:', err);
//                 setStockError('Failed to fetch low stock materials.');
//             } finally {
//                 setLoadingStock(false);
//             }
//         };

//         fetchNewOrders();
//         fetchLowStock();
//     }, []);

//     return (
//         <div className={styles.container}>
          
//             <div className={styles.mainContent}>
//                 <h1 className={styles.welcome}>Welcome, Chef!</h1>

//                 {/* Dashboard Sections */}
//                 <section className={styles.section}>
//                     <h2 className={styles.sectionTitle}>Today's Highlights</h2>
//                     {/* Display errors separately */}
//                     {orderError && <p className={styles.error}>{orderError}</p>}
//                     {stockError && <p className={styles.error}>{stockError}</p>}
//                     <div className={styles.cardsContainer}>
//                         <div className={styles.card}>
//                             <h3 className={styles.cardTitle}>New Orders</h3>
//                             {loadingOrders ? (
//                                 <div className={styles.spinnerContainer}>
//                                     <FaSpinner className={styles.spinner} />
//                                 </div>
//                             ) : (
//                                 <p className={styles.cardContent}>
//                                     You have <strong>{newOrders}</strong> new orders to prepare today!
//                                 </p>
//                             )}
//                         </div>
//                         <div className={styles.card}>
//                             <h3 className={styles.cardTitle}>Low Stock Alert</h3>
//                             {loadingStock ? (
//                                 <div className={styles.spinnerContainer}>
//                                     <FaSpinner className={styles.spinner} />
//                                 </div>
//                             ) : lowStock.length > 0 ? (
//                                 <ul className={styles.list}>
//                                     {lowStock.map(material => (
//                                         <li key={material._id} className={styles.listItem}>
//                                             <strong>{material.name}</strong>: {material.quantity} units left
//                                         </li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p className={styles.cardContent}>No low stock alerts!</p>
//                             )}
//                         </div>
//                     </div>
//                 </section>

//                 {/* Quick Actions */}
//                 <section className={styles.section}>
//                     <h2 className={styles.sectionTitle}>Quick Actions</h2>
//                     <div className={styles.buttonsContainer}>
//                         <button className={`${styles.button} ${styles.buttonGreen}`}>
//                             Add New Recipe
//                         </button>
//                         <button className={`${styles.button} ${styles.buttonOrange}`}>
//                             View Orders
//                         </button>
//                         <button className={`${styles.button} ${styles.buttonRed}`}>
//                             Manage Inventory
//                         </button>
//                     </div>
//                 </section>

//                 {/* Recipe Inspiration */}
//                 <section className={styles.section}>
//                     <h2 className={styles.sectionTitle}>Recipe Inspiration</h2>
//                     <p className={styles.text}>
//                         Check out trending recipes for inspiration. Stay updated with new culinary ideas!
//                     </p>
//                 </section>

//                 {/* Tips of the Day */}
//                 <section className={styles.section}>
//                     <h2 className={styles.sectionTitle}>Tips of the Day</h2>
//                     <p className={styles.text}>
//                         Optimize your kitchen efficiency with these quick tips.
//                     </p>
//                     <ul className={styles.list}>
//                         <li className={styles.listItem}>
//                             <strong>Save time</strong> by pre-prepping ingredients for popular recipes.
//                         </li>
//                         <li className={styles.listItem}>
//                             <strong>Reduce waste</strong> by tracking and managing inventory efficiently.
//                         </li>
//                     </ul>
//                 </section>
//             </div>
//         </div>
//     );
// };

// export default ChefDashboard;


// src/pages/ChefDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './styles.module.css'; // Import CSS Module
import { FaSpinner } from 'react-icons/fa'; // For spinner icon
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
        // Fetch new orders
        const fetchNewOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8090/api/createOrder/new');
                setNewOrders(response.data.newOrders);
            } catch (err) {
                console.error('Error fetching new orders:', err);
                setOrderError('Failed to fetch new orders.');
            } finally {
                setLoadingOrders(false);
            }
        };

        // Fetch low stock materials
        const fetchLowStock = async () => {
            try {
                const response = await axios.get('http://localhost:8090/api/rawMaterial/low-stock');
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

                {/* Dashboard Sections */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Today's Highlights</h2>
                    {/* Display errors separately */}
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

                {/* Quick Actions */}
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
