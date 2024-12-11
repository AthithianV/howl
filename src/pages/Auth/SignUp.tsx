import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import {ThreeDots} from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

import { SignUpSchema } from "../../validation/signup";
import FormElementWrapper from "../../components/ui/FormElementWrapper";
import Brand from "../../components/Brand";
import googleIcon from "../assets/icons/google.svg";
import SuccessMessage from "../../components/ui/SuccessMessage";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { signupWithEmailPassword } from "../../database/users/auth";


const SignUp = () => {

  const [success, setSuccess] = useState<null|string>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  const { register, handleSubmit, formState: {errors}, setError } = useForm({
    defaultValues:{
      username: "",
      email: "",
      password: ""
    },
    resolver: zodResolver(SignUpSchema)
  });

  const onSubmit = async (data:z.infer<typeof SignUpSchema>)=>{
    try {
      setLoading(true);
      await signupWithEmailPassword(data.username, data.email, data.password);
      setSuccess("Sign Up Successfully!!!");
      navigate("/auth/signup");
    } catch (error) {
      if(error instanceof FirebaseError){
        if(error.code==="auth/email-already-in-use"){
          setError("root", {message: "EmailID is already in use. Try Different EmailID"})
        }
        
      }else{
        setError("root", {message: "Something Went Wrong!"});
      }
    }finally{
      setLoading(false);
    }
  } 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-lg flex-center flex-col p-12 shadow-lg rounded-lg bg-white">
      <Brand/>
      {!errors.root?.message && success && <SuccessMessage message={success}/>}
      {!success && errors.root?.message && <ErrorMessage message={errors.root.message}/>}
      <FormElementWrapper label="Username" error={errors.username}>
        <input 
          type="text" 
          className={`input border border-black py-1 px-3 my-1 peer ${errors.username?'border-red-500':""}`}
          {...register("username", {required: {value: true, message: "Username is Required"}})}/>
      </FormElementWrapper>

      <FormElementWrapper label="Email" error={errors.email}>
        <input
          type="email"
          className={`input border border-black py-1 px-3 my-1 peer ${errors.email?'border-red-500':""}`}
          {...register("email", {required: {value: true, message: "Email is Required"}})}/>
      </FormElementWrapper>

      <FormElementWrapper label="Password" error={errors.password}>
        <input 
          type="password"
          className={`input border border-black py-1 px-3 my-1 peer ${errors.password?'border-red-500':""}`}
          {...register("password", {required: {value: true, message: "Password is Required"}})}/>
      </FormElementWrapper>

      <button type="submit" disabled={loading} className="flex-center gap-2 bg-sky-400 my-5 shadow rounded py-1 px-4 text-white active:bg-sky-500 font-semibold">
        {loading
        ?<ThreeDots
        visible={true}
        height="30"
        width="30"
        color="white"
        radius="5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
        :<span>Sign up</span>}
      </button>

      {/* <div className="my-2 p-4 border-t-2 border-gray-300 w-full text-center">
        <div className="shadow-md px-4 py-2 rounded-full border-2 border-black flex-center gap-1 cursor-pointer active:bg-black active:text-white">
          <div className="bg-white p-1 rounded-full"><img src={googleIcon} alt="Google Logo" className="h-5 w-5"/></div> 
          <span>Sign in with Google</span>
        </div>
      </div> */}

      <div className="text-sm my-2">Already Have Account? <Link to="/auth/login" className="text-blue-500 underline">Login</Link></div>
    
    </form>
  )
}

export default SignUp;