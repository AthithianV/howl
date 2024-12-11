import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ErrorMessage = ({message}:{message: string}) => {
  return (
    <div className='animate__fadeInDown py-1 px-2 w-fit flex items-center gap-2 bg-red-300 border-2 border-red-500 text-red-500 font-semibold rounded text-sm'>
        <FontAwesomeIcon icon={faXmark}/>
        <span>{message}</span>
    </div>
  )
}

export default ErrorMessage;