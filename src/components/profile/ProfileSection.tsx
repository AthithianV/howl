import { ProfileType } from '../../types/profile'
import SectionWrapper from './ProfileSectionWrapper'

const ProfileSection = ({profile}:{profile: ProfileType}) => {
  return (
    <div className='py-2 border-b-2'>
        <h1 className='logo-font font-medium underline'>Profile: </h1>
        <SectionWrapper title='Age'>
            <span>{profile.age}</span>
        </SectionWrapper>
        <SectionWrapper title='Gender'>
            <span>{profile.gender}</span>
        </SectionWrapper>
        <SectionWrapper title='Occupation'>
            <span>{profile.occupation}</span>
        </SectionWrapper>
    </div>
  )
}

export default ProfileSection