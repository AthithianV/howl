import React from 'react'

const Brand = () => {
  return (
    <div className="flex items-center gap-2 my-2 px-12 border-b-[0.5px] border-white pb-2">
        <div className="rounded-full">
            <img src={"/howl.svg"} alt={"logo"} className="h-10 w-10 overflow-hidden rounded-full"/>
        </div>
        <h1 className="text-center logo-font text-2xl font-semibold">
            HOWL
        </h1>
    </div>
  )
}

export default Brand