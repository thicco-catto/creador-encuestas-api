import { Profile } from "@/models/Profile";
import { QueryDocumentSnapshot, DocumentData, DocumentSnapshot, getDocs, getDoc, addDoc } from "firebase/firestore";
import { GetProfileCollection, GetProfileDocument } from "./dbContext";
import { ProfileCreationDTO } from "@/models/dto/profileCreationDTO";

function GetProfileFromDocument(document: QueryDocumentSnapshot<DocumentData, DocumentData> | DocumentSnapshot<DocumentData, DocumentData>) {
    const data = document.data();
    if(!data){
        return;
    }

    const survey: Profile = {
        ID: document.id,
        Title: data["Title"],
        Description: data["Description"]
    }
    return survey;
}

export async function GetAllProfiles(surveyId: string) {
    const docs = await getDocs(GetProfileCollection(surveyId));
    const profiles: Profile[] = [];

    docs.forEach(document => {
        const survey = GetProfileFromDocument(document);
        if(survey) {
            profiles.push(survey);
        }
    });

    return profiles;
}

export async function GetProfile(surveyId: string, profileId: string) {
    const document = await getDoc(GetProfileDocument(surveyId, profileId))
    return GetProfileFromDocument(document);
}

export async function AddProfile(surveyId: string, dto: ProfileCreationDTO) {
    const profile = {
        Title: dto.Title,
        Description: dto.Description
    }

    const docRef = await addDoc(GetProfileCollection(surveyId), profile)

    return {
        ID: docRef.id,
        Title: profile.Title,
        Description: profile.Description,
    };
}