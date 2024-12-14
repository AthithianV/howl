import InputBox from '../../components/Chat/InputBox'

const ChatBox = () => {
  return (
    <div className='py-5 px-10 flex flex-col h-screen'>
      <div className='flex-1 overflow-auto'></div>
      <InputBox/>
    </div>
  )
}

export default ChatBox