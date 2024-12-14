import { ReactNode } from 'react'

const SectionWrapper = ({children, title}: {children:ReactNode, title:string}) => {
  return (
    <div className='my-2 flex flex-wrap gap-2'>
        <span className='text-md font-semibold'>{`${title}:`}</span>
        {children}
    </div>
  )
}

export default SectionWrapper