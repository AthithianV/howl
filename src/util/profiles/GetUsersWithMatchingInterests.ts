import { and, collection, getDocs, or, query, where } from "firebase/firestore";
import { RefType } from "../../types/profile";
import db from "../../database/firebase";
import { InterestType } from "../../types/interest";

export async function getUsersWithMatchingInterests(interest:InterestType):Promise<RefType[]>{


    try {

        const hobbiesFilter = interest.hobbies.length!==0
            ? where('hobbies', 'array-contains-any', interest.hobbies)
            :where('hobbies', '==', []);

        const moviesFilter = interest.movies.length!==0
            ? where('movies', 'array-contains-any', interest.movies)
            :where('movies', '==', []);

        const animesFilter = interest.animes.length!==0
            ? where('animes', 'array-contains-any', interest.animes)
            :where('animes', '==', []);
        
        const booksFilter = interest.books.length!==0
            ? where('books', 'array-contains-any', interest.books)
            :where('books', '==', []);

        const foodsFilter = interest.foods.length!==0
            ? where('foods', 'array-contains-any', interest.foods)
            :where('foods', '==', []);
        
    
        const q = query(collection(db, "interests"), 
            and(or(
                    hobbiesFilter,
                    moviesFilter,
                    animesFilter,
                    booksFilter,
                    foodsFilter
                )
                , where('uid', "!=", interest.uid)
            ))
        const matchingProfileDoc = await getDocs(q);

        let matchingProfileIds:string[] = [];

        if(matchingProfileDoc.empty){
            return matchingProfileIds;
        }
        matchingProfileDoc.forEach(doc=>{
            const data = doc.data();
            matchingProfileIds.push(data.uid);
        })

        return matchingProfileIds;
    } catch (error) {
        console.log("Matching Profile:"+ JSON.stringify(error));
        
        throw error;
    }
} 