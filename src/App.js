
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Component/Home/Home.jsx';
import './App.css';
import Layout from './Component/Layout/Layout.jsx';
import Notfound from './Component/Notfound/Notfound.jsx';
import Brands from './Component/Brands/Brands.jsx';
import Cart from './Component/Cart/Cart.jsx';
// import Login from './Component/Login/Login.jsx';
import Register from './Component/Register/Register.jsx';
import Categories from './Component/Categories/Categories.jsx';
import Products from './Component/Products/Products.jsx';
import { useContext, useEffect } from 'react';
import { userContext } from './Component/Context/Usercontext.js';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute.jsx';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword.jsx';
import ResetPassword from './Component/ResetPassword/ResetPassword.jsx';
import ProductDetails from './Component/ProductDetails/ProductDetails.jsx';
import CartContextProvider from './Component/CartContext/CartContext.js';
import RootRedirect from './Component/RootRedirect/RootRedirect.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import  { Toaster } from 'react-hot-toast';
import CategoriesDetails from './Component/Categories/CategoriesDetails.jsx';
import CheckOut from './Component/CheckOut/CheckOut.jsx';
import WishList from './Component/WishList/WishList.jsx';

let routers = createBrowserRouter([
  {path:'/',element:<Layout/>,children:[
    {path:'home',element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:'forgetPassword',element:<ForgetPassword/>},
    {path:'resetPassword',element:<ResetPassword/>},
    {path: "/",element: <RootRedirect />},
    {path:'register',element:<Register/>},
    {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'Checkout',element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
    {path:'productdetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'CategoriesDetails/:id',element:<ProtectedRoute><CategoriesDetails/></ProtectedRoute>},
    {path:'*',element:<Notfound/>}
  ]},

]);


export default function App() {
     let { setUsertoken } = useContext(userContext);
    useEffect(()=>{
      if(localStorage.getItem('userToken') !== null)  
      {
         setUsertoken(localStorage.getItem('userToken'))
      }
    
  } , [setUsertoken]);
 
  return  <CartContextProvider>
            <RouterProvider router={routers}></RouterProvider>
            <Toaster position="top-center " toastOptions={{ style: { marginTop: '50px' } }}/>
          </CartContextProvider>
          
}




