import { ReactNode } from 'react'

type PropType = {
    name:string, 
    email:string,
    children: ReactNode
}

const ProfileName = ({name, email, children}:PropType) => {
  return (
    <div className="border-b-2 gap-2 py-2 flex justify-start">
        {children}
        <div>
            <h1 className="text-4xl font-bold">{name}</h1>
            <h6 className="text-sm font-semibold px-1 py-[0.5] w-fit rounded bg-sky-400 text-white my-1">{email}</h6>
        </div>
    </div>
  )
}

export default ProfileName