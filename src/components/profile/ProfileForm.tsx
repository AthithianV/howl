import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import useUser from "../../store/userStore";
import FormElementWrapper from "../ui/FormElementWrapper";
import ProfilePicturePicker from "./ProfilePicturePicker";
import { createProfile } from "../../database/profile/CreateProfile";
import { ProfileFormSchema } from "../../validation/ProfileForm";
import { toast } from "react-toastify";

const InterestInfo = ({interest}:{interest:string})=>{
  return <span className="hidden peer-focus:block text-xs text-gray-400 font-semibold">
    Enter each {interest} seperated by Comma(,)
  </span>
  
}

const ProfileForm = () => {

  const {user, setUser} = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue, formState: {errors} } = useForm({
    defaultValues:{
      fullName: "",
      age: null,
      gender: null,
      occupation: "",
      picture: "",
      hobbies: "",
      movies: "",
      books: "",
      animes: "",
      foods: "",
      pictureUrl: "profile_pictures/normal_wolf_1.png"
    },
    resolver: zodResolver(ProfileFormSchema)
  });

  const onSubmit = async (data:z.infer<typeof ProfileFormSchema>)=>{
    setLoading(true);
    try {
      if(user){
        const userData = await createProfile(data, user.uid);
        if(userData){
          setUser(userData);
        }
        toast.success("Profile Created Successfully!")
        navigate("/");
      }
    } catch (error) {
        toast.error("Somthing Went Wrong!")
    }finally{
      setLoading(false);
    }
  } 


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* {user && <ProfileName name={user.username} email={user.email}>
        {<></>}
      </ProfileName>} */}

      <h1 className="text-center my-4 text-2xl font-bold">Create Your Profile</h1>

      <div>
        <FormElementWrapper label="Full Name" error={errors.fullName}>
          <input
            type="text"
            className={`input border border-black py-3 px-3 my-1 peer ${errors.fullName?'border-red-500':""}`}
            {...register("fullName", {required: {value: true, message:"Full Name is required"}})}/>
        </FormElementWrapper>

        <FormElementWrapper label="Age" error={errors.age}>
          <input
            type="number"
            className={`input border border-black py-3 px-3 my-1 peer ${errors.age?'border-red-500':""}`}
            {...register("age", {valueAsNumber: true})}/>
        </FormElementWrapper>

        <FormElementWrapper label="Occupation" error={errors.occupation}>
          <input
            type="text"
            className={`input border border-black py-3 px-3 my-1 peer ${errors.occupation?'border-red-500':""}`}
            {...register("occupation")}/>
        </FormElementWrapper>

        <FormElementWrapper label="Gender" error={errors.gender}>
          <select
            className={`input border border-black py-3 px-3 my-1 peer ${errors.gender?'border-red-500':""}`}
            {...register("gender")}>
              <option>MALE</option>
              <option>FEMALE</option>
              <option>OTHERS</option>
              <option>DO NOT WANT TO SHARE</option>
          </select>
        </FormElementWrapper>
      </div>

      <ProfilePicturePicker setValue={setValue}/>

      <div>
        <FormElementWrapper label="Hobbies" error={errors.hobbies}>
          <input
            type="text"
            className={`input border border-black py-3 px-3 my-1 peer ${errors.hobbies?'border-red-500':""}`}
            {...register("hobbies")}/>
            <InterestInfo interest={"Hobbies"}/>
        </FormElementWrapper>

        <FormElementWrapper label="Books" error={errors.books}>
          <input
            type="text"
            className={`input border border-black py-3 px-3 my-1 peer ${errors.books?'border-red-500':""}`}
            {...register("books")}/>
          <InterestInfo interest={"books"}/>
        </FormElementWrapper>

        <FormElementWrapper label="Animes" error={errors.animes}>
          <input
            type="text"
            className={`input border border-black py-3 px-3 my-1 peer ${errors.animes?'border-red-500':""}`}
            {...register("animes")}/>
            <InterestInfo interest={"Animes"}/>
          
        </FormElementWrapper>
        
        <FormElementWrapper label="Movies" error={errors.movies}>
          <input
            type="text"
            className={`input border border-black py-3 px-3 my-1 peer ${errors.movies?'border-red-500':""}`}
            {...register("movies")}/>
          <InterestInfo interest={"Movies"}/>
        </FormElementWrapper>

        <FormElementWrapper label="Foods" error={errors.movies}>
          <input
            type="text"
            className={`input border border-black py-3 px-3 my-1 peer ${errors.foods?'border-red-500':""}`}
            {...register("foods")}/>
          <InterestInfo interest={"Foods"}/>
        </FormElementWrapper>

      </div>

      <div className="flex-center">
        <button 
          type="submit"
          disabled={loading}
          className="flex-center gap-2 bg-sky-400 my-5 shadow rounded py-1 px-4 text-white active:bg-sky-500 font-semibold">
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
          :<span>Submit</span>}
        </button>
      </div>

    </form>
  )
}

export default ProfileForm;