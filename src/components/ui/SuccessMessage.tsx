import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SuccessMessage = ({message}:{message: string}) => {
  return (
    <div className='animate__fadeInDown py-1 px-2 w-fit flex-center gap-2 bg-green-300 border-2 border-green-500 text-white font-semibold rounded text-sm'>
        <FontAwesomeIcon icon={faThumbsUp}/>
        {message}
    </div>
  )
}

export default SuccessMessage;