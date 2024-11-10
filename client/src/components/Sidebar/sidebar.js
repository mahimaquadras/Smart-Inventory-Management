import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  ExpandLess,
  ExpandMore,
  ShoppingCart as ShoppingCartIcon,
  Inbox as InboxIcon,
  PowerSettingsNew as PowerIcon,
  Menu as MenuIcon,
  ChevronRight as ChevronRightIcon,
 
} from "@mui/icons-material";
import styles from "./styles.module.css"; 

const Sidebar = () => {
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openEcommerce, setOpenEcommerce] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    setOpenDashboard(!openDashboard);
  };

  const handleEcommerceClick = () => {
    setOpenEcommerce(!openEcommerce);
  };

  const handleLogout = () => {
  
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
    >
     
      <div className={styles.header}>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img
          src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
          alt="brand"
          style={{ height: "32px", marginRight: "10px" }}
        />
        <Typography variant="h6" noWrap>
          Princima Inventory
        </Typography>
      </div>
      <Divider />

     
      <List component="nav">
        
        <ListItemButton component={Link} to="/manager-dashboard">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

       

       
         <ListItemButton component={Link} to="/rawMaterial">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Raw Materials" />
        </ListItemButton>

        
         <ListItemButton component={Link} to="/finishedProducts">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Finished Product" />
        </ListItemButton>

       
        <ListItemButton onClick={handleEcommerceClick}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Orders" />
          {openEcommerce ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openEcommerce} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={Link}
              to="/orders"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <ChevronRightIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/createOrder"
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <ChevronRightIcon />
              </ListItemIcon>
              <ListItemText primary="Create Order" />
            </ListItemButton>
          </List>
        </Collapse>

        <Divider />

       
        <ListItemButton component={Link} to="/view-requests">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inventory Request" />
        </ListItemButton>


        
        {isAuthenticated && (
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <PowerIcon style={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" style={{ color: "red" }} />
          </ListItemButton>
        )}
      </List>

    
    </Drawer>
  );
};

export default Sidebar;
