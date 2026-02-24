
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';
// import React from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useContext} from 'react';
import { cartContext } from '../CartContext/CartContext';
import { FaHeart } from 'react-icons/fa';
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductDetails() {
      let {mutation} = useContext(cartContext);
 function addToCart(productId){ 
 mutation.mutate(productId);
  // console.log(productId);
  
}
    let params = useParams();
    function getProductDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }
   
  const { data} = useQuery({
  queryKey: ['productDetails', params.id],
  queryFn: () => getProductDetails(params.id),
});
   const product = data?.data.data;
   const images = product?.images || [];
    // console.log(data?.data.data);

  function getWishlist() {
  return axios.get(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}
const token = localStorage.getItem("userToken");
const { data: wishlistData } = useQuery({
  queryKey: ["wishlist"],
  queryFn: getWishlist,
  enabled: !!token,
});

const wishlist = wishlistData?.data?.data || [];
  function addToWishlist(productId) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    { productId },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}
const queryClient = useQueryClient();



function removeFromWishlist(productId) {
  return axios.delete(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}

const addMutation = useMutation({
  mutationFn: addToWishlist,
  onSuccess: () => {
    toast.success("Added to wishlist ❤️");
    queryClient.invalidateQueries(["wishlist"]);
  },
});

const removeMutation = useMutation({
  mutationFn: removeFromWishlist,
  onSuccess: () => {
    toast.success("Removed from wishlist 🗑️");
    queryClient.invalidateQueries(["wishlist"]);
  },
});

function toggleWishlist(productId) {
  if (!token) {
    toast.error("Please login first ❤️");
    return;
  }

  const exists = wishlist.some(
    (item) => item._id === productId
  );

  if (exists) {
    removeMutation.mutate(productId);
  } else {
    addMutation.mutate(productId);
  }
}
  return <>
       {data?.data.data ? <div className="container my-5 py-5">
         <Helmet>
         <title>{data?.data.data.title} </title>
         </Helmet>
        <div className="row g-3  align-items-center">
           <div className="col-md-4 col-sm-12">

              <Swiper spaceBetween={10} slidesPerView={1} initialSlide={2}>
                    {images?.map((img, index) => (
                        <SwiperSlide key={index}>
                        <img src={img} alt="product" style={{ width: "100%" }} />
                        </SwiperSlide>
                    ))}
                    </Swiper>

           </div>
           <div className="col-md-8 col-sm-12 ">
            <div className='d-flex justify-content-between'>
               <h3 className='mb-3 fw-bold'>{data?.data.data.title}</h3>
              <FaHeart
                    onClick={() => toggleWishlist(product._id)}
                    className={`fs-3 ${
                      wishlist.some(item => item._id === product?._id)
                        ? "text-danger"
                        : "text-black"
                    }`}
                    style={{ cursor: "pointer" }}
               />
            </div>
            <p>{data?.data.data.description}</p>
            <h5 className='text-main'>{data?.data.data.category.name}</h5>
            <div className="d-flex justify-content-between ">
                <span>Price : {data?.data.data.price} EGP</span>
                <span><i className="fa fa-solid fa-star rating-color mx-2"></i>{data?.data.data.ratingsAverage} </span>
            </div>
            
            <button onClick={()=> addToCart(product._id)} className='btn bg-main text-white  w-75 mx-auto d-block mt-4'>Add +</button>
           </div>
        </div>

       </div> : <div className="loading bg-secondary-subtle position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center">
      <span className="loader"></span>
    </div>}
    </>
}
