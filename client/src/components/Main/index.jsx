// import styles from './styles.module.css';
// import SalesGraph from '../salesGraph';

// const Main = () => {

//     // const handleLogout = () => {
//     //     localStorage.removeItem("token");
//     //     window.location.reload();
//     // };
//     return(
//         <div className={styles.main_container}>
//             {/* <nav className={styles.navbar}>
//                 <h1>PQ Inventory</h1>, */}
//                 <SalesGraph />
//                 {/* <button className={styles.white_btn} onClick={handleLogout}>
//                     Logout
//                 </button> */}
//             {/* </nav> */}
//         </div>
//     )
// };

// export default Main;

// src/components/Main.js
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
