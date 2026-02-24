
import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Audio } from "react-loader-spinner";



export default function Register() {
    const [errorMsg , setErrorMsg]= useState();
    const  [loadding , setLoadding]=useState(false)
    const navigate = useNavigate()
    function registerApi(value){
        setLoadding(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', value)
        .then(({data})=>{
            // console.log(data); 
            if(data.message==='success'){
                setLoadding(false)
                navigate('/')
            } 
        }).catch((err)=>{
            // console.log(err.response.data.message);
            setLoadding(false)
            setErrorMsg(err.response.data.message)
        })
        
    }

    let phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/
    let validationSchema = Yup.object({
        name:Yup.string().min(3,"Must be at least 3 characters").max(6,"Must be maxmum 6  characters").required("Name is required"),
        email:Yup.string().email("Invalid email format").required("Email is required"),
        phone:Yup.string().matches(phoneRegex,"Invalid phone format").required("Phone is required"),
        password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,"Invalid password format").required("Password is required"),
        rePassword:Yup.string().oneOf([Yup.ref("password")],"Passwords must matches").required("Invalid repassword format")
    })

    let formik = useFormik({
        initialValues:{
            name:'',
            phone:'',
            email:'',
            password:'',
            rePassword:''
        },validationSchema,
        onSubmit:(value)=>{
            registerApi(value)
        }
    })

  return <>
    <div className=" w-75 mx-auto py-5 mt-5">
        <h2>Register Now...</h2>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name : </label>
            <input className="form-control mb-2" onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" value={formik.values.name} name="name" id="name" />
            {formik.errors.name && formik.touched.name?<div className="alert alert-danger mt-2 p-2">{formik.errors.name}</div>:""}

            <label htmlFor="email">Email : </label>
            <input className="form-control mb-2" onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" value={formik.values.email} name="email" id="email" />
             {formik.errors.email && formik.touched.email?<div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div>:""}

            <label htmlFor="phone">Phone : </label>
            <input className="form-control mb-2" onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" value={formik.values.phone} name="phone" id="phone" />
             {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger mt-2 p-2">{formik.errors.phone}</div>:""}

            <label htmlFor="password">Password : </label>
            <input className="form-control mb-2" onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" value={formik.values.password} name="password" id="password" />
             {formik.errors.password && formik.touched.password?<div className="alert alert-danger mt-2 p-2">{formik.errors.password}</div>:""}

            <label htmlFor="rePassword">Repassword : </label>
            <input className="form-control mb-2" onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" value={formik.values.rePassword} name="rePassword" id="rePassword" />
            {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger mt-2 p-2">{formik.errors.rePassword}</div>:""}

            {errorMsg?<div className="alert alert-danger">{errorMsg}</div>:""}
            {loadding?<button className="btn bg-main text-white mt-2" type="button">
                <Audio
                            height="20"
                            width="80"
                            color="#fff"
                            ariaLabel="audio-loading"
                            wrapperStyle={{}}
                            wrapperClass="wrapper-class"
                            visible={true}
                 />
            </button>:<button disabled={!(formik.isValid && formik.dirty)} className="btn bg-main text-white mt-2" type="submit ">Register</button>}

            
        </form>
    </div>
  </>
}
