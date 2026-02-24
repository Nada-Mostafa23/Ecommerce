import { useFormik } from "formik";
import * as Yup from "yup";
import  { cartContext } from "../CartContext/CartContext";
import { useContext } from "react";
import toast from 'react-hot-toast';

export default function CheckOut() {
    let {checkOutPayment, cartId}=useContext(cartContext);
   async function handleCheckoutSubmit(values) {
       if (!cartId) {
           toast.error("Cart ID not loaded yet. Please wait...");
           return;
        }
        let res = await checkOutPayment(cartId ,'http://localhost:3000' , values);
        // console.log("yyy",res.session.url);
       window.location.replace(res.session.url);
       
       return res;
    }
    // console.log(cartId);

  let phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/
    let validationSchema = Yup.object({
        details:Yup.string().min(4,"Must be at least 4 characters").max(8,"Must be maxmum 8  characters").required("details is required"),
        phone:Yup.string().matches(phoneRegex,"Invalid phone format").required("Phone is required"),
        city:Yup.string().min(4,"Must be at least 4 characters").max(15,"Must be maxmum 15  characters").required("city is required"),
    })
let formik = useFormik({
    initialValues: {
        details: '',
        phone: '',
        city: ''
    
    },validationSchema,
    onSubmit: handleCheckoutSubmit
})

  return <>
  <div className="container my-5 py-5">
        {!cartId && <div className="alert alert-info">Loading cart information...</div>}
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="details"> Details : </label>
            <input value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange}  className="form-control my-2 " type="text" name="details" id="details"/>
            {formik.errors.details && formik.touched.details?<div className="alert alert-danger mt-2 p-2">{formik.errors.details}</div>:""}

            <label className="my-2" htmlFor="phone" > Phone : </label>
            <input value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange}  className="form-control " type="tel" name="phone" id="phone"/>
            {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger mt-2 p-2">{formik.errors.phone}</div>:""}

            <label className="my-2" htmlFor="city"> city : </label>
            <input value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange}  className="form-control " type="text" name="city" id="city"/>
            {formik.errors.city && formik.touched.city?<div className="alert alert-danger mt-2 p-2">{formik.errors.city}</div>:""}
            <button type="submit" disabled={!(formik.isValid && formik.dirty) || !cartId} className="btn btn-outline-primary d-block mx-auto w-50 mt-3">Pay Now</button>
        </form>
  </div>
  </>
}
