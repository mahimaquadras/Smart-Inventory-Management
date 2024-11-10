
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Main from './components/Main';
import Signup from './components/Signup';
import Login from './components/Login';
import Orders from './components/Orders';
import Products from './components/Products';
import Inventory from './components/Inventory';
import Home from './components/Home';
import OrderForm from './components/createOrder';
import RawMaterials from './components/rawMaterials';
import FinishedProduct from './components/finishedProducts';
import Sidebar from './components/Sidebar/sidebar';
import ChefDashboard from './components/chef-dashboard';
import ChefSidebar from './components/ChefSidebar/chef-sidebar';
import OrderFulfillment from './components/orderFullfilment';
import RecipeManagement from './components/Recipes';
//import RecipeManagement from './components/recipe-management';
import AddRecipe from './components/addRecipe';
import ManageRawMaterials from './components/manageRawMaterial';
import ManagerRequest from './components/ManagerRequest';


function App() {
  const user = localStorage.getItem("token");
  const role = localStorage.getItem("role"); 
  const location = useLocation();

  // Check if current route is login or signup
  const hideSidebar = location.pathname === '/login' || location.pathname === '/signup';


  return (
    <div style={{ display: 'flex' }}>
      {!hideSidebar && (
                role === "Chef" ? <ChefSidebar /> : <Sidebar />
            )}
      {/* Render sidebars based on role */}
      {/* {role === "Chef" && <ChefSidebar />}
      {role === "Manager" && <Sidebar />} */}

      <main style={{ flexGrow: 1, padding: '20px' }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/Signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />


          {/* Redirect to login if not authenticated */}
          {!user && (
            <Route path="*" element={<Navigate replace to="/login" />} />
          )}

          {/* Routes accessible to Managers */}
          {user && role === "Manager" && (
            <>
              <Route path="/manager-dashboard" element={<Main />} />
              <Route path="/Orders" element={<Orders />} />
              <Route path="/createOrder" element={<OrderForm />} />
              <Route path="/rawMaterial" element={<RawMaterials />} />
              <Route path="/finishedProducts" element={<FinishedProduct />} />
              <Route path="/Products" element={<Products />} />
              <Route path="/Inventory" element={<Inventory />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/view-requests" element={<ManagerRequest />} /> 

             
              <Route path="/" element={<Navigate replace to="/manager-dashboard" />} />
            </>
          )}

          {/* Routes accessible to Chefs  */}
          {user && role === "Chef" && (
            <>
              <Route path="/chef-dashboard" element={<ChefDashboard />} />
              <Route path="/order-fulfillment" element={<OrderFulfillment/>} />
             <Route path="/add-recipe" element={<AddRecipe/>} />
              <Route path="/recipe" element={<RecipeManagement/>} />
              <Route path="/manage-rawMaterial" element={<ManageRawMaterials/>} />
            
              
             
              <Route path="/" element={<Navigate replace to="/chef-dashboard" />} />
            </>
          )}

         
        </Routes>
      </main>
    </div>
  );
}

export default App;

