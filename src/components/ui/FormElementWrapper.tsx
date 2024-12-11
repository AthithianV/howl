'use client'

import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

interface FormElementProps{
    label: string,
    error: FieldError | undefined,
    children: ReactNode
}

const FormElementWrapper = ({label, error, children}:FormElementProps) => {

  return (
    <div className='flex flex-1 flex-col-reverse transition-colors duration-500 my-2'>
      {error && (<span className="text-red-500 text-xs">*{error.message}</span>)}
      { children }
      <label 
        className='peer-focus:text-sky-400 peer-disabled:text-gray-500 text-sm'>
          {`${label}:`}
      </label>
    </div>
  )
}

export default FormElementWrapper;