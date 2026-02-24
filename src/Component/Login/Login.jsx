
import axios from "axios";
import { useFormik } from "formik"
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Audio } from "react-loader-spinner";
import { userContext } from "../Context/Usercontext.js";
import  {queryClient}   from "../../index.js";

export default function Login() {
    const navigate = useNavigate()
    let {setUsertoken ,setUserData} = useContext(userContext);
    const [errorMsg , setErrorMsg]= useState();
    const  [loadding , setLoadding]=useState(false)
    function LoginApi(value){
        setLoadding(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', value)
        .then(({data})=>{
            if(data.message==='success'){
                setLoadding(false)
                localStorage.setItem('userToken',data.token)
                setUsertoken(data.token)
                setUserData(data.user)
                queryClient.invalidateQueries(["cart"]);
                queryClient.invalidateQueries(["wishlist"]);

                navigate('/home',{replace:true});
            } 
        }).catch((err)=>{
            // console.log(err.response.data.message);
            setLoadding(false)
            setErrorMsg(err.response.data.message)
        })
        
    }

    let validationSchema = Yup.object({
        email:Yup.string().email("Invalid email format").required("Email is required"),
        password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,"Invalid password format").required("Password is required"),
    })

    let formik = useFormik({
        initialValues:{
            email:'',
            password:'',
           
        },validationSchema,
        onSubmit:(value)=>{
            LoginApi(value)
        }
    })

       
  return <>
    <div className=" w-75 mx-auto py-5 mt-5">
        <h2>Login Now...</h2>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email : </label>
            <input className="form-control mb-2" onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" value={formik.values.email} name="email" id="email" />
             {formik.errors.email && formik.touched.email?<div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div>:""}

            <label htmlFor="password">Password : </label>
            <input className="form-control mb-2" onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" value={formik.values.password} name="password" id="password" />
             {formik.errors.password && formik.touched.password?<div className="alert alert-danger mt-2 p-2">{formik.errors.password}</div>:""}
              <Link className="text-black text-decoration-none "  to="/ForgetPassword">Forget Password....?</Link> 
              <br />

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
              
            </button>:<button disabled={!(formik.isValid && formik.dirty)} className="btn bg-main text-white mt-2" type="submit ">Login</button>}

            
        </form>
    </div>
  </>
}

