import ProfileForm from "../../components/profile/ProfileForm";

const CreateProfile = () => {
  return (
    <div className="w-full flex-center box-border">
      <div className="w-7/12 max-md:w-full px-24 max-lg:px-12 py-10 box-border rounded-md shadow-md border-2 bg-white">
          <ProfileForm/>
      </div>
    </div>
  )
}

export default CreateProfile;