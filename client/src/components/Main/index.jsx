
import React from 'react';
import Sidebar from "../Sidebar/sidebar";
import SalesGraph from '../salesGraph';
import OrderCount from '../OrderCount';
import Dashboard from '../Dashboard';
import styles from './styles.module.css';



const Main = () => {
  return (
    <div className={styles.container}>
      {/* <Sidebar /> */}
      <div className={styles.content}>
        <div className={styles.topSection}>
          <Dashboard />
        </div>
        <div className={styles.bottomSection}>
          
        </div>
      </div>
    </div>
  );
};

export default Main;
