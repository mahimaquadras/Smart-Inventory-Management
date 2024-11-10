import React from 'react';
import { Link } from 'react-router-dom';

const ChefSidebar = () => {
    return (
        <div className="sidebar">
            <h2>Chef Dashboard</h2>
            <ul>
                <li><Link to="/chef-dashboard">Overview</Link></li>
                <li><Link to="/chef-dashboard/recipes">Recipes</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/inventory">Inventory</Link></li>
               
        </div>
    );
};

export default ChefSidebar;
