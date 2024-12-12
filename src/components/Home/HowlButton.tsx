import { ThreeDots } from "react-loader-spinner"

const HowlButton = ({loading}:{loading:boolean}) => {
  return (
    <div 
        className="howl-btn shadow-md shadow-black hover:shadow-lg hover:shadow-black border-4 text-white border-white hover:text-sky-400 hover:border-sky-400">
        <h1 className="text-2xl logo-font font-semibold ">
            {loading
            ?<ThreeDots
            visible={true}
            height="50"
            width="50"
            color="white"
            radius="5"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            />
            :<span>HOWL</span>}
        </h1>
      </div>
  )
}

export default HowlButton