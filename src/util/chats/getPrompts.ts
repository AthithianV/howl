import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { doc } from "firebase/firestore";
import { getUserData } from "../../database/users/GetUserData";
import db from "../../database/firebase";
import { UserDataType } from "../../types/user";

function filterProfileAndInterest(data: UserDataType) {
  return {
    name: data.user.username,
    profile: {
      age: data.profile.age,
      gender: data.profile.gender,
      occupation: data.profile.occupation,
    },
    interest: {
      hobbies: data.interest.hobbies,
      movies: data.interest.movies,
      books: data.interest.books,
      foods: data.interest.foods,
      animes: data.interest.animes,
    },
  };
}

export async function getPrompts(senderId: string, receiverId: string) {

    

  try {

    const apiKey = "";
    
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set in environment variables.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model: GenerativeModel = genAI.getGenerativeModel({
        model: "gemini-pro",
    });

    const [senderData, receiverData] = await Promise.all([
      getUserData(doc(db, "users", senderId)),
      getUserData(doc(db, "users", receiverId)),
    ]);

    if (!senderData || !receiverData) {
      throw new Error("Failed to get user data for sender or receiver.");
    }

    const filteredSenderData = filterProfileAndInterest(senderData);
    const filteredReceiverData = filterProfileAndInterest(receiverData);

    const prompt = `
        Generate 3-4 conversation prompts for a user with the profile and interests: 
        ${JSON.stringify(filteredSenderData)}. They are starting a conversation with a user whose 
        profile and interests are: ${JSON.stringify(filteredReceiverData)}. 
        Given all prompt in single line seperated by "/". 
        Prompts should start with greeting.
    `;


    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{ text: prompt }],
        }],
      });


    const response = await result.response;
    const content = response.text()?.trim();

    if (!content) {
      throw new Error("Gemini API returned no content.");
    }

    return content;
  } catch (error) {
    console.error("Error generating prompts:", error);
    throw new Error(`Failed to generate conversation prompts`);
  }
}
