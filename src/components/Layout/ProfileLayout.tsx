import React from 'react'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
  return (
    <div className='h-screen'><Outlet/></div>
  )
}

export default ProfileLayout