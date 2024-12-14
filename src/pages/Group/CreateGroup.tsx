import { useForm } from "react-hook-form"
import FormElementWrapper from "../../components/ui/FormElementWrapper"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroupFormSchema } from "../../validation/GroupForm";
import { z } from "zod";
import useUser from "../../store/userStore";

const CreateGroup = () => {

  const [loader, setLoader] = useState(false);
  const {user} = useUser();

  const {register, handleSubmit, formState: {errors} } = useForm(
    {
      defaultValues: {
        name: "",
        description: "",
        theme: ""
      },
      resolver: zodResolver(GroupFormSchema)
    }
  )

  async function onSubmit(data:z.infer<typeof GroupFormSchema>){
      
  }

  return (
    <div className="w-8/12 mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <form className="bg-white py-5 px-10 m-10 rounded border shadow">
        <h1 className="logo-font font-semibold text-2xl text-center">Create Group</h1>
        <FormElementWrapper label="Name" error={errors.name}>
          <input 
            type="text" 
            {...register("name", {required: {value:true, message:"Name is Required"}})} 
            className="peer p-2 rounded border-[0.4px] border-black focus:outline-sky-400"/>
        </FormElementWrapper>
        <FormElementWrapper label="Theme" error={errors.theme}>
          <input 
            type="text" 
            {...register("theme", {required: {value:true, message:"Theme is Required"}})} 
            className="peer p-2 rounded border-[0.4px] border-black focus:outline-sky-400"/>
        </FormElementWrapper>
        <FormElementWrapper label="Description" error={errors.description}>
          <textarea 
            className="peer p-2 rounded border-[0.4px] border-black focus:outline-sky-400"
            {...register("description")}
          >
          </textarea>
        </FormElementWrapper>
        <div className="text-center mt-4">
          <button type="submit" className="py-2 px-4 rounded bg-black font-semibold text-white">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default CreateGroup