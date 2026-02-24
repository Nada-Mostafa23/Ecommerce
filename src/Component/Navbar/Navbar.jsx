import { Link, useNavigate } from "react-router-dom";
import logo from '../../Assets/freshcart-logo.svg';
import { userContext } from "../Context/Usercontext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { cartContext } from "../CartContext/CartContext";
import { queryClient } from "../../index.js";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";


function getWishlist() {
  return axios.get(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}

export default function Navbar() {
  
  const { data } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const wishlistCount = data?.data?.count || 0;

  let { userToken , setUsertoken } = useContext(userContext);
    const { cartQuery } = useContext(cartContext);
     const cartCount = cartQuery.data?.numOfCartItems || 0;
  let navigate = useNavigate();
  function LogOut(){
    localStorage.removeItem('userToken');
    setUsertoken(null);
     queryClient.clear();
    navigate('/',{replace:true});
  }

  return <>
  
<nav className="navbar bg-light navbar-expand-lg bg-body-tertiary position-fixed top-0 start-0 end-0 mb-5  " >
  <div className="container">
    <span className="navbar-brand cursor-pointer" >
      <Link to="/home"><img src={logo} alt="fresh market logo" /></Link>
      </span>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav m-auto">

       {userToken !== null ?<>
        <li className="nav-item">
          <Link className="nav-link active"  to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/wishlist">Wish List</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart</Link>
        </li>
       </>:''}
      
      </ul>
      <ul className="navbar-nav ms-auto">
        
        {userToken !== null ? <>
            <li className="nav-item">
           <Link className="nav-link position-relative" to="/cart"> 
           <FontAwesomeIcon className="mx-2 fs-3 mt-2" icon={faCartShopping} />
              {cartCount > 0 && (
              <span className="translate-middle badge rounded-pill bg-main">
                {cartCount}
              </span>
            )}
           </Link>
          </li>
          <li className="nav-item">
              <Link to="/wishlist" className=" nav-link position-relative ">
              <FaHeart className="fs-3  mt-2 " />

            {wishlistCount > 0 && (
              <span className=" translate-middle heart-badge  text-white bg-main ">
                {wishlistCount}
              </span>
            )}
          </Link>
          </li>
          <li className="nav-item ">
          <span onClick={()=> LogOut()} className="nav-link cursor-pointer mt-2" >Logout</span>
        </li>  
        </>:<>
              <li className="nav-item">
                <Link className="nav-link active" to="/">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
        </>}
     
      </ul>
    </div>
  </div>
</nav>
  </>
}
