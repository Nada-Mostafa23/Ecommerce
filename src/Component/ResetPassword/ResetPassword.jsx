
import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import * as Yup from "yup";


export default function ResetPassword() {
     const navigate = useNavigate()
    const [errorMsg , setErrorMsg]= useState();
    function ResetPasswordApi(value){
                axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', value)
        .then(({data})=>{
            if(data.token){
                navigate('/login');
            }
         
        }).catch((err)=>{
            setErrorMsg(err.response.data.status)
        })
        
    }
    let validationSchema = Yup.object({
        email:Yup.string().email("Invalid email format").required("Email is required"),
        newPassword:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,"Invalid Newpassword format").required("NewPassword is required"),
    })

    let formik = useFormik({
        initialValues:{
            email:'',
            newPassword:'',
        },validationSchema,
        onSubmit:(value)=>{
            ResetPasswordApi(value)
        }
    })

  return <>
    <div className=" w-75 mx-auto py-5 mt-5">
        <h2>Update Password Now...</h2>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email : </label>
            <input className="form-control mb-2" onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" value={formik.values.email} name="email" id="email" />
             {formik.errors.email && formik.touched.email?<div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div>:""}

            <label htmlFor="newpassword">NewPassword : </label>
            <input className="form-control mb-2" onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" value={formik.values.newPassword} name="newPassword" id="newpassword" />
             {formik.errors.newPassword && formik.touched.newPassword?<div className="alert alert-danger mt-2 p-2">{formik.errors.newPassword}</div>:""}
             

            {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:""}
         <button  className="btn bg-main text-white mt-2" type="submit ">Update Password</button>
        </form>
    </div>
  </>
}

