//import { Menu } from '@mui/material';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';


const Menu = () => {
    return (
        <div className={styles.menu}>
            <div className={styles.item}>
                <span className={styles.title}>MAIN</span>
                <Link to ="" className={styles.listIttem}>
                <img src="" alt=""></img>
                <span className={styles.listItemTitle}>Home Page</span>
                </Link>
                <Link to ="" className={styles.listIttem}>
                <img src="" alt=""></img>
                <span className={styles.listItemTitle}>Profile</span>
                </Link>
            </div>

            <div className={styles.item}>
                <span className={styles.title}>MAIN</span>
                <Link to ="" className={styles.listIttem}>
                <img src="" alt=""></img>
                <span className={styles.listItemTitle}>Home Page</span>
                </Link>
                <Link to ="" className={styles.listIttem}>
                <img src="" alt=""></img>
                <span className={styles.listItemTitle}>Profile</span>
                </Link>
            </div>
        </div>


  );
}

export default Menu;