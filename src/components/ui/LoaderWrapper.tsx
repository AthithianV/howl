import React from 'react'

const LoaderWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-full h-full flex-center'>
        {children}
    </div>
  )
}

export default LoaderWrapper