import { useContext } from "react";
import { Helmet } from "react-helmet";
import { FaTrash } from "react-icons/fa";
// import { Link } from "react-router-dom";
import { cartContext } from "../CartContext/CartContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function WishList() {
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
const { data , isLoading} = useQuery({
  queryKey: ["wishlist"],
  queryFn: getWishlist,
});
const wishlist = data?.data?.data || [];

 function removeFromWishlist(productId) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}
const queryClient = useQueryClient();

const removeMutation = useMutation({
  mutationFn: removeFromWishlist,
  onSuccess: () => {
    toast.success("Removed from wishlist 🗑️");
    queryClient.invalidateQueries(["wishlist"]);
  },
});


 
  const { mutation } = useContext(cartContext);

  // تحميل البيانات

function addToCart(productId) {
  mutation.mutate(productId, {
    onSuccess: () => {
      removeMutation.mutate(productId);
    },
  });
}



  return (
    <>
      <Helmet>
        <title>Wish List</title>
      </Helmet>

        {isLoading ? <div className="loading bg-secondary-subtle position-fixed start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center">
            <span className="loader"></span>
        </div> : <>
             <div className="container py-5 my-5">
        <h2 className="fw-bold mb-5">My wish List</h2>
         {wishlist.length === 0 ? (
          <h5 className="text-center text-muted">Your wishlist is empty ❤️</h5>
         ) : wishlist.map((product) => (
          <div key={product._id}>
            <div className="row align-items-center py-4">

              {/* صورة */}
              <div className="col-md-2">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-100"
                />
              </div>

              {/* بيانات المنتج */}
              <div className="col-md-6">
                <h5>{product.title}</h5>
                <p className="text-main fw-bold mb-2">
                  {product.price} EGP
                </p>

                <span
                  onClick={() => removeMutation.mutate(product._id)}
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                >
                  <FaTrash className="me-2" />
                  Remove
                </span>
              </div>

              {/* زرار */}
              <div className="col-md-4 text-end">
                <button
                  onClick={() => addToCart(product._id)}
                  className="btn bg-main text-white px-4"
                >
                  Add To Cart
                </button>
              </div>

            </div>

            <hr />
          </div>
        ))  }
        

      </div>
  </>}
     
    </>
  );
}

