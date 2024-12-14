import { UserDataType } from '../../types/user'
import ImageContainer from '../ui/ImageContainer'
import ProfileName from '../ui/ProfileName'
import ProfileSection from './ProfileSection'
import InterestSection from './InterestSection'

const DisplayProfile = ({userData}:{userData:UserDataType}) => {
  return (
    <div className='my-20 max-md:my-0 w-8/12 max-md:w-full mx-auto border-2 shadow rounded-lg max-md:rounded-none p-5'>
        <div>
            <ProfileName name={userData.user.username} email={userData.user.email}>
                <ImageContainer
                    name={userData.user.username}
                    url={userData.profile.pictureUrl}
                    height={10}
                    width={10}
                />
            </ProfileName>
        </div>   
        <ProfileSection profile={userData.profile}/>
        <InterestSection interest={userData.interest}/>
    </div>
  )
}

export default DisplayProfile