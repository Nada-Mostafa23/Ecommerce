import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useContext,  useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../CartContext/CartContext";
import CategorySlider from "../CategorySlider/CategorySlider.jsx";
import MainSlider from "../MainSlider/MainSlider.jsx";
import { Helmet } from "react-helmet";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from 'react-hot-toast';
export default function Home() {
let {mutation} = useContext(cartContext);
 function addToCart(productId){ 
 mutation.mutate(productId);
  // console.log(productId);
  
}
function getAllProduct() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/products');
}
const { data, isLoading  } = useQuery({
  queryKey: ['products'],
  queryFn: getAllProduct,
});
const [searchText, setSearchText] = useState("");
const products = data?.data.data || [];

function searchProducts(products, searchText) {
  return products.filter((product) => {
    const search = searchText.toLowerCase();

    const matchName = product.title
      .toLowerCase()
      .includes(search);

    const matchCategory = product.category.name
      .toLowerCase()
      .includes(search);

    return matchName || matchCategory;
  });
}
const filteredProducts = searchProducts(products,searchText);

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
  <Helmet>
    <title>Frish Cart Home </title>
  </Helmet>
   <MainSlider/>
  <CategorySlider />
  {isLoading ?  <div className="loading bg-secondary-subtle position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center">
      <span className="loader"></span>
    </div> : <div className="container my-5 py-5">
      <input className="form-control w-75 mx-auto mb-5" placeholder="Search..." type="search" value={searchText}
  onChange={(e) => setSearchText(e.target.value)} />
    <div className="row g-3">
      {filteredProducts?.map((product)=>{
        return <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 py-2">
        <div className="product position-relative p-3">
          <Link to={`/productdetails/${product._id}`}>
                <FaHeart
                onClick={(e) => {
                  e.preventDefault();   // يمنع فتح صفحة التفاصيل
                  e.stopPropagation();  // يمنع bubbling
                   toggleWishlist(product._id);
                }}
                className={`heart ${
                  wishlist.some(item => item._id === product._id)
                    ? "text-danger"
                    : "text-black"
                }`}
                style={{ cursor: "pointer" }}
              />
          <img src={product.imageCover} className="w-100" alt={product.title} />
          <h6 className="text-main my-2">{product.category.name}</h6>
          <h6>{product.title.split(' ').slice(0,2).join(' ')}</h6>
          <div className="d-flex justify-content-between">
            <span>{product.price} EGP</span>
            <span><i className="fa fa-solid fa-star rating-color me-1"></i>{product.ratingsAverage} </span>
          </div>
        </Link>
          <button onClick={()=> addToCart(product._id)} className="btn bg-main text-white  w-100 d-block mt-3">Add Product +</button>
        </div>
      </div>
      
      })}
    </div>
  </div>}
  </>
}