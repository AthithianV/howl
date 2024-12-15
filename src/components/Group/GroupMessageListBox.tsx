import LoaderWrapper from '../ui/LoaderWrapper';
import { ThreeDots } from 'react-loader-spinner';
import { GroupMessageType } from '../../types/groupMessage';
import useUser from '../../store/userStore';
import GroupMessage from './GroupMessage';

type PropType = {
    messages: GroupMessageType[],
    loader: boolean
}

const GroupMessageListBox = ({messages, loader}:PropType) => {

  const { user} = useUser();

  return (
    loader
    ?<LoaderWrapper><ThreeDots color='#38bdf8'/></LoaderWrapper>
    :<div className='flex-1 flex flex-col overflow-auto rounded'>
        {messages.map((message, index)=>(
        user && 
            <div key={index} className={`${message.sender===user.uid?"self-end":"self-start"}`}>
            <GroupMessage
                name={message.senderName}
                picture={message.senderPicture}
                text={message.text} 
                time={message.time}
                user={message.sender===user.uid}
                />
            </div>
        ))}
    </div>
  )
}

export default GroupMessageListBox;