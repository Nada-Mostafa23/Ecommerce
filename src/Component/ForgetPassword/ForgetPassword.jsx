
import axios from "axios";
import { useFormik } from "formik"
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";


export default function Login() {
    let navigate = useNavigate();
    const [errorMsg , setErrorMsg]= useState();
    const [formStatus , setFormStatus]= useState(true);
    function ForgetApi(value){
                axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', value)
        .then(({data})=>{
            if(data.statusMsg==='success'){
               setFormStatus(false);
               
            } 
        }).catch((err)=>{
            setErrorMsg(err.response.data.message)
        })
    
    }
    function VerifyCodeApi(value){
                axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', value)
        .then(({data})=>{
            if(data.status==='Success'){
                navigate('/resetPassword');
               
            } 
        }).catch((err)=>{
            setErrorMsg(err.response.data.message)
        })
    
    }

    let validationSchema = Yup.object({
        email:Yup.string().email("Invalid email format").required("Email is required"),
    })
    let validationSchema2 = Yup.object({
        resetCode:Yup.string().required("Reset Code is required").matches(/^[0-9]{5,6}$/,"Invalid Reset Code format"),
    })

    let formik = useFormik({
        initialValues:{
            email:''
        },validationSchema,
        onSubmit:(value)=>{
               ForgetApi(value)
        }
    })
    let formik2 = useFormik({
        initialValues:{
            resetCode:''
        },validationSchema2,
        onSubmit:(value)=>{
        //    console.log(value);
           VerifyCodeApi(value)
        }
    })

  return <>
    <div className=" w-75 mx-auto py-5 mt-5">
        {formStatus?<>
               <h2>Enter Your Email</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="email">Email : </label>
                        <input className="form-control mb-2" onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" value={formik.values.email} name="email" id="email" />
                        {formik.errors.email && formik.touched.email?<div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div>:""}

                        {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:""}
                        <button  className="btn bg-main text-white mt-2" type="submit ">Send</button>
                    </form>
        </>:<>
                     <h2>Enter Reset Code</h2>
                    <form onSubmit={formik2.handleSubmit}>
                        <label htmlFor="resetCode">Enter Your Reset Code : </label>
                        <input className="form-control mb-2" onChange={formik2.handleChange} onBlur={formik2.handleBlur} type="resetCode" value={formik2.values.resetCode} name="resetCode" id="resetCode" />
                        {formik2.errors.resetCode && formik2.touched.resetCode?<div className="alert alert-danger mt-2 p-2">{formik2.errors.resetCode}</div>:""}

                        {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:""}
                        <button  className="btn bg-main text-white mt-2" type="submit ">Confirm Code</button>
                    </form>
        </>}
      
       
    </div>
  </>
}


