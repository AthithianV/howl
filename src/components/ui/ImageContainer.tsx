
type PropType = {
    name: string,
    url: string,
    height: number,
    width: number,
}

const ImageContainer = (prop:PropType) => {
  return (
    <div className="p-2 rounded-full border-2 border-black bg-white hover:border-sky-400 shadow w-fit">
        <img 
        src={prop.url}
        alt={prop.name}
        className={`h-${prop.height} w-${prop.width}`}
        />
    </div>
  )
}

export default ImageContainer