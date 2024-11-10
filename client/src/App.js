//  import {Route, Routes, Navigate} from 'react-router-dom';
//  import Main from './components/Main';
//  import Signup from './components/Signup';
//  import Login from './components/Login';
// import Orders from './components/Orders';
// import Products from './components/Products';
// import Inventory from './components/Inventory';
// import Home from './components/Home';
// import OrderForm from './components/createOrder';
// import RawMaterials from './components/rawMaterials';
// import FinishedProduct from './components/finishedProducts';
// import Sidebar from './components/Sidebar/sidebar';
// import ChefDashboard from './components/chef-dashboard';
// import ChefSidebar from './components/ChefSidebar/chef-sidebar';

// // import React from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Dashboard from './pages/Dashboard';

// //import Sidebar from './components/Sidebar/sidebar';

// function App() {
//   const user = localStorage.getItem("token");
// const role = localStorage.getItem("role");
//   return (
//     // <div style={{ display: 'flex' }}>
//     // <Sidebar />
//     <div style={{ display: 'flex' }}>
//        {role === "Chef" && <ChefSidebar />}
//       {role === "Manager" && <Sidebar />}
//     <main style={{ flexGrow: 1, padding: '20px' }}>

//     <Routes>
//       {user && <Route path = "/" exact element={<Main/>}/>}
//       <Route path = "/Signup" exact element={<Signup/>}/>
//       <Route path = "/Login" exact element={<Login/>}/>
//       <Route path = "/Orders" exact element={<Orders/>}/>
//       <Route path ="/createOrder" exact element={<OrderForm/>}/>
//       <Route path ="/rawMaterial" exact element={<RawMaterials/>}/>
//       <Route path ="/finishedProducts" exact element={<FinishedProduct/>}/>
//       <Route path = "/Products" exact element={<Products/>}/>
//       <Route path = "/Inventory" exact element={<Inventory/>}/>
//       <Route path = "/Home" exact element={<Home/>}/>
//       <Route path = "/chef-dashboard" exact element={<ChefDashboard/>}/>
//       <Route path = "/" exact element={<Navigate replace to ="/Login"/>}/>
//     </Routes>
//     </main>
//     </div>
//   );
// }

// // const App = () => {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/login" element={<Login />} />
// //         <Route path="*" element={
// //           <>
// //             <Sidebar />
// //             <main style={{ marginLeft: '240px', padding: '20px' }}>
// //               <Routes>
// //                 <Route path="/" element={<Main />} />
// //               </Routes>
// //             </main>
// //           </>
// //         } />
// //       </Routes>
// //     </Router>
// //   );
// // };

// export default App;


// App.js
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




// import {Route, Routes, Navigate} from 'react-router-dom';
// import Main from './components/Main';
// import Home from './components/Home';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Outlet,
// } from "react-router-dom";

// import Orders from './components/Orders';
// import Products from './components/Products';
// import Inventory from './components/Inventory';
// import Navbar from './sections/navbar/navbar';
// import Footer from './sections/foooter/footer';
// import { Menu } from '@mui/material';


// function App() {

//   const Layout = () => {
//     return (
//       <div className="main">
//         <Navbar/>
//         <div className="container">
//           <div className="menuContainer">
//             <Menu/>
//           </div>
//           <div className="contentContainer">
//             <Outlet/>

//           </div>
//         </div>
//         <Footer/>
//       </div>
//     );
//   };
//   //const user = localStorage.getItem("token")
// //   return (
// //     <Routes>
// //       {user && <Route path = "/" exact element={<Home/>}/>}
// //       <Route path = "/Signup" exact element={<Signup/>}/>
// //       <Route path = "/Login" exact element={<Login/>}/>
// //       <Route path = "/" exact element={<Navigate replace to ="/Login"/>}/>
// //     </Routes>
// //   );
// // }

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout/>,
//     children : [
//       {
//       path : "/",
//       element : <Home/>
//       },
//       {
//       path : "/orders",
//       element : <Orders/>
//       },
//       {
//       path : "/products",
//       element : <Products/>
//       },
//       {
//       path : "/inventory",
//       element : <Inventory/>
//       },
//     ]

//   },
// ]);
// return <RouterProvider router={router}/>;
//     // <Routes>
//     //   {user && <Route path = "/" exact element={<Home/>}/>}
//     //   <Route path = "/Signup" exact element={<Signup/>}/>
//     //   <Route path = "/Login" exact element={<Login/>}/>
//     //   <Route path = "/Products" exact element={<Products/>}/>
//     //   <Route path = "/Orders" exact element={<Orders/>}/>
//     //   <Route path = "/Inventory" exact element={<Inventory/>}/>
//     //   <Route path = "/" exact element={<Navigate replace to ="/Login"/>}/>
//     // </Routes>
  
// }


// export default App;
