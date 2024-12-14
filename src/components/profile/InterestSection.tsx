import { InterestType } from '../../types/interest'
import InterestSectionWrapper from './InterestSectionWrapper'

const UnWrapInterests = ({interests, color}:{interests:string[], color:string})=>{
    return <div>
        {
            interests.map(interest=>(<span className={`py-[0.2px] px-1 rounded text-white font-semibold ${color}`}>
                {interest}
            </span>))
        }
    </div>
}

const InterestSection = ({interest}:{interest:InterestType}) => {
  return (
    <div className='py-2 border-b-2'>
        <h1 className='logo-font font-medium underline'>Interests: </h1>

        {interest.hobbies.length>0 && <InterestSectionWrapper title='Hobbies'>
            <UnWrapInterests interests={interest.hobbies} color={"bg-sky-400"}/>
        </InterestSectionWrapper>}

        {interest.animes.length>0 && <InterestSectionWrapper title='Animes'>
            <UnWrapInterests interests={interest.animes} color={"bg-red-500"}/>
        </InterestSectionWrapper>}

        {interest.movies.length>0 && <InterestSectionWrapper title='Movies'>
            <UnWrapInterests interests={interest.movies} color={"bg-purple-400"}/>
        </InterestSectionWrapper>}

        {interest.foods.length>0 && <InterestSectionWrapper title='Foods'>
            <UnWrapInterests interests={interest.foods} color={"bg-sky-400"}/>
        </InterestSectionWrapper>}

        {interest.books.length>0 && <InterestSectionWrapper title='Books'>
            <UnWrapInterests interests={interest.books} color={"bg-sky-400"}/>
        </InterestSectionWrapper>}
    </div>
  )
}

export default InterestSection