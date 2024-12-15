

type PropType = {
    text: string,
    time:number,
    user:boolean
}


const Message = ({text, time, user}:PropType) => {

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
        <div className={`h-fit w-fit min-w-4 py-1 px-2 rounded-md flex flex-col gap-2 shadow border-[0.4px] max-w-[300px] ${user?"items-end bg-sky-400 text-white":""}`}>
            <span>{text}</span>
            <span className="text-[0.6rem] self-end font-bold">{formatTime(time)}</span>
        </div>
  )
}

export default Message;