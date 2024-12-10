import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

import { SignUpSchema } from "../validation/signup";
import FormElementWrapper from "../components/FormElementWrapper";
import Brand from "../components/Brand";
import googleIcon from "../assets/icons/google.svg";
import { Link } from "react-router-dom";


const SignUp = () => {

  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues:{
      username: "",
      email: "",
      password: ""
    },
    resolver: zodResolver(SignUpSchema)
  });

  const onSubmit = (data:z.infer<typeof SignUpSchema>)=>{
    console.log(data);
  } 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-lg flex-center flex-col py-12 px-24 shadow-lg rounded-lg">
      <Brand/>
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

      <button type="submit" className="bg-sky-400 my-5 shadow rounded py-1 px-4 text-white active:bg-sky-500 font-semibold">Sign up</button>

      <div className="text-sm">Already Have Account? <Link to="/auth/login" className="text-blue-500 underline">Login</Link></div>

      <div className="my-2 pt-8 border-t-2 border-gray-300 w-full text-center">
        <div className="shadow-md px-4 py-2 rounded-full border-2 border-black flex-center gap-1 cursor-pointer active:bg-black active:text-white">
          <div className="bg-white p-1 rounded-full"><img src={googleIcon} alt="Google Logo" className="h-5 w-5"/></div> 
          <span>Sign in with Google</span>
        </div>
      </div>
    
    </form>
  )
}

export default SignUp