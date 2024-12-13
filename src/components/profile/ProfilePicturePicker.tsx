import { useState } from "react"
import { profile_picture_map } from "../../util/profiles/profile_picture_map"
import ImageContainer from "../ui/ImageContainer"
import { UseFormSetValue } from "react-hook-form";

type SetValueType = UseFormSetValue<{
    fullName: string;
    age: null;
    gender: null;
    occupation: string;
    picture: string;
    hobbies: string;
    movies: string;
    books: string;
    animes: string;
    foods: string;
    pictureUrl: string;
}>

const ProfilePicturePicker = (prop:{setValue: SetValueType}) => {

    const [selectedPicture, setSelectedPicture] = useState("/profile_pictures/normal_wolf_1.png");


  return (
    <div className="border-b-2 border-t-2 py-5 my-5">
        <h1 className="text-lg font-semibold">Pick Your Profile Picture: </h1>
        <div className="p-2 flex flex-wrap gap-2">
            {
                profile_picture_map.map((url, index)=>(
                <div 
                className={`cursor-pointer ${selectedPicture===url?"bg-sky-400":""} p-1 rounded`} key={index}
                onClick={()=>{setSelectedPicture(url); prop.setValue("pictureUrl", url)}}
                >
                    <ImageContainer name={url} url={url} height={10} width={10}/>
                </div>
            ))
            }
        </div>
    </div>
  )
}

export default ProfilePicturePicker