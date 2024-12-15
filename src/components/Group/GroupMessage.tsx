type PropType = {
    text: string,
    time:number,
    user:boolean,
    name: string,
    picture:string
}


const Message = ({text, time, user, name, picture}:PropType) => {

    function formatTime(time:number){
        const date = new Date(time);
        if(date.getDate()<new Date().getDate()){
            return date.toDateString().substring(4, 10);
        }
        const hour = date.getHours();
        const minute = date.getMinutes();
        const ampm = date.getHours()>=12?'pm':'am';
        return `${hour}:${minute} ${ampm}`;
    }
    

  return (
        <div className={`h-fit w-fit min-w-4 p-2 rounded-md flex flex-col shadow border-[0.4px] max-w-[300px] ${user?"items-end bg-sky-400 text-white":""}`}>
            <div className="flex gap-2">
              {!user && <div>
                <img src={picture} alt={name} className="h-8 w-8 rounded"/>
              </div>}
              <div className="flex flex-col">
                {!user && <span className="font-bold underline">{name}</span>}
                <div className="flex flex-col items-end self-end">
                  <span>{text}</span>
                  <span className="text-[0.6rem]">{formatTime(time)}</span>
              </div>
              </div>
            </div>
        </div>
  )
}

export default Message