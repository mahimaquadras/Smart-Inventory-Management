import React from 'react';
import { Link } from 'react-router-dom';
import './ChefSidebar.css'; // Include CSS for chef sidebar styling

const ChefSidebar = () => {
    return (
        <div className="sidebar">
            <h2>Chef Dashboard</h2>
            <ul>
                <li><Link to="/chef-dashboard">Overview</Link></li>
                <li><Link to="/chef-dashboard/recipes">Recipes</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/inventory">Inventory</Link></li>
                {/* Add other Chef-specific links here */}
            </ul>
        </div>
    );
};

export default ChefSidebar;
