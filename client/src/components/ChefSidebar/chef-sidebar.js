// components/ChefSidebar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  Inbox as InboxIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  PowerSettingsNew as PowerIcon,
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import styles from "./styles.module.css"; // Ensure this CSS module matches your styling needs

const ChefSidebar = () => {
  const [openEcommerce, setOpenEcommerce] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile responsiveness
  const navigate = useNavigate();
  const location = useLocation();

  const handleEcommerceClick = () => {
    setOpenEcommerce(!openEcommerce);
  };

  const handleLogout = () => {
    // Remove token and role from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect to login page
    navigate("/login");
  };

  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");

  // Toggle sidebar for mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
    

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        
        {/* Header with Logo and Title */}
        <div className={styles.header}>
          {/* Removed Large Image/Icon */}
          <Typography variant="h6" className={styles.title}>
            PQ Inventory
          </Typography>
        </div>
        
        <Divider />

        {/* Navigation List */}
        <List component="nav" className={styles.list}>
          {/* Dashboard Link */}
          <ListItemButton
            component={Link}
            to="/chef-dashboard"
            className={`${styles.listItem} ${
              location.pathname === "/chef-dashboard" ? styles.listItemActive : ""
            }`}
          >
            <ListItemIcon className={styles.listItemIcon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" className={styles.listItemText} />
          </ListItemButton>

          {/* Orders Link */}
          <ListItemButton
            component={Link}
            to="/order-fulfillment"
            className={`${styles.listItem} ${
              location.pathname === "/order-fulfillment" ? styles.listItemActive : ""
            }`}
          >
            <ListItemIcon className={styles.listItemIcon}>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" className={styles.listItemText} />
          </ListItemButton>


          {/* Recipe Management Section */}
          <ListItemButton onClick={handleEcommerceClick} className={styles.listItem}>
            <ListItemIcon className={styles.listItemIcon}>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Recipe Management" className={styles.listItemText} />
            <ChevronRightIcon
              className={`${styles.expandIcon} ${
                openEcommerce ? styles.expandIconOpen : ""
              }`}
            />
          </ListItemButton>
          {openEcommerce && (
            <List component="div" disablePadding>
              <ListItemButton
                component={Link}
                to="/recipe"
                sx={{ pl: 4 }}
                className={`${styles.listItem} ${
                  location.pathname === "/recipe" ? styles.listItemActive : ""
                }`}
              >
                <ListItemIcon className={styles.listItemIcon}>
                  <ChevronRightIcon />
                </ListItemIcon>
                <ListItemText primary="Recipes" className={styles.listItemText} />
              </ListItemButton>



              <ListItemButton
                component={Link}
                to="/add-recipe"
                sx={{ pl: 4 }}
                className={`${styles.listItem} ${
                  location.pathname === "/add-recipe" ? styles.listItemActive : ""
                }`}
              >
                <ListItemIcon className={styles.listItemIcon}>
                  <ChevronRightIcon />
                </ListItemIcon>
                <ListItemText primary="Add Recipe" className={styles.listItemText} />
              </ListItemButton>
            </List>
          )}

          <Divider />

         
          <ListItemButton
            component={Link}
            to="/manage-rawMaterial"
            className={`${styles.listItem} ${
              location.pathname === "/manage-rawMaterial" ? styles.listItemActive : ""
            }`}
          >
            <ListItemIcon className={styles.listItemIcon}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Raw Materials" className={styles.listItemText} />
          </ListItemButton>

         

          {/* Logout Button */}
          {isAuthenticated && (
            <ListItemButton
              onClick={handleLogout}
              className={`${styles.listItem} ${styles.logoutButton}`}
            >
              <ListItemIcon className={styles.listItemIcon}>
                <PowerIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" className={styles.listItemText} />
            </ListItemButton>
          )}
        </List>
      </div>
    </>
  );
};

export default ChefSidebar;
