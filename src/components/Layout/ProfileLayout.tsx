import { Outlet } from "react-router-dom"

const ProfileLayout = () => {
  return (
    <div className='w-full h-screen overflow-auto box-border'><Outlet/></div>
  )
}

export default ProfileLayout