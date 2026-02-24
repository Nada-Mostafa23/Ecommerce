import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";
import toast from "react-hot-toast";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {

  const token = localStorage.getItem("userToken");

  function getLoggedUserCart() {
    return axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { headers: { token } }
    ).then(res => res.data);
  }

  const cartQuery = useQuery({
    queryKey: ["cart", token],
    queryFn: getLoggedUserCart,
    enabled: !!token
  });
function checkOutPayment(cartId, url, values) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    { shippingAddress: values },
    { headers: { token } }
  ).then(res => res.data);
}

  const cartId = cartQuery?.data?.data?._id;

  const queryClient = useQueryClient();

  function AddCart(productId) {
    return axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId },
      { headers: { token } }
    );
  }

  const mutation = useMutation({
    mutationFn: AddCart,
    onSuccess: () => {
      toast.success("Product added successfully ✅");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Failed to add product ❌");
    }
  });

  function removeCartItem(cartItemId) {
    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
      { headers: { token } }
    ).then(res => res.data);
  }

  const removeMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      toast.success("Item removed 🗑️");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  });
  function updateCount({ id, count }) {
  return axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    { count },
    { headers: { token } }
  ).then(res => res.data);
}

const updateCountMutation = useMutation({
  mutationFn: updateCount,
  onSuccess: () => {
    toast.success("Item count updated ✅");
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  },
  onError: () => {
    toast.error("Failed to update count ❌");
  }
});
function clearCart() {
  return axios.delete(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    { headers: { token } }
  ).then(res => res.data);
}

const clearCartMutation = useMutation({
  mutationFn: clearCart,
  onSuccess: () => {
    toast.success("Cart cleared 🗑️");
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  },
  onError: () => {
    toast.error("Failed to clear cart ❌");
  }
});


  return (
    <cartContext.Provider
      value={{
        cartId,
        cartQuery,
        mutation,
        removeMutation,
        updateCountMutation,
        clearCartMutation,
        checkOutPayment
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
