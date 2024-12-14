import { ReactNode } from "react"

const InterestSectionWrapper = ({children, title}: {children:ReactNode, title:string}) => {
  return (
    <div className='my-4 flex flex-wrap gap-2 flex-col'>
        <span className='text-md font-semibold'>{`${title}:`}</span>
        <div className="py-4 px-2 border-[0.5px] border-black rounded-lg flex flex-wrap gap-2 bg-slate-100">
            {children}
        </div>
    </div>
  )
}

export default InterestSectionWrapper