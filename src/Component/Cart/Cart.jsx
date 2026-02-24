import { useContext } from "react";
import { cartContext } from "../CartContext/CartContext";
// import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
// import { Audio } from "react-loader-spinner";

export default function Cart() {
  const { cartQuery, removeMutation , updateCountMutation , clearCartMutation } = useContext(cartContext);
  const cartData = cartQuery.data;


  return (
    <>
         <Helmet>
            <title> Cart Page </title>
        </Helmet>
      {cartData?.data? <div className="cartPage mx-auto bg-light">
        <div className="d-flex justify-content-between">
          <div>
            <h2 className="mb-3 fw-bold">Cart Shop</h2>
            <h6 className="fw-bold">Total Price: <span className="text-main">{cartData?.data?.totalCartPrice} EGP</span> </h6>
          </div>
          <div>
            <Link to="/checkout" className="btn bg-primary text-white mb-3">Check Out</Link>
            <h6 className="fw-bold">total number of items: <span className="text-main">{cartData?.numOfCartItems}</span></h6>
          
          </div>
        </div>
        {cartData?.data?.products?.map((item) => (
          <div key={item.product._id} className="row gx-3 mt-5 border-bottom p-3">
            <div className="col-md-3 col-sm-12 mb-3">
              <img className="w-100" src={item.product.imageCover} alt={item.product.title} />
            </div>
            <div className="col-md-9 col-sm-12">
              <div className="d-flex justify-content-between align-items-center">
                <div className="mt-5">
                  <Link to={`/productdetails/${item.product._id}`} className="fw-bold text-decoration-none hover ">{item.product.title}.</Link>
                  <h5 className="fw-bold my-2">Price: <span className="text-main ">{item.price} EGP</span></h5>
                  <button onClick={()=>removeMutation.mutate(item.product._id)} className="btn btn-danger">Remove</button>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button onClick={()=>updateCountMutation.mutate({id:item.product._id , count:item.count+1})} className="btnCounter">+</button>
                  <span>{item.count}</span>
                  <button onClick={()=>updateCountMutation.mutate({id:item.product._id , count:item.count-1})} className="btnCounter"  disabled={item.count === 1}>-</button>
                </div>
              </div>
            </div>
          </div>
        )) }
      
          <button onClick={() => clearCartMutation.mutate()}className="btn bg-main text-white mt-5"> Clear Your Cart</button>
        
      </div> : <div className="container alert alert-info text-center py-5 my-5">
        <h2>Your cart is empty 🛒</h2>
      </div> }
    </>
  );
}