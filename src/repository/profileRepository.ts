import { Profile } from "@/models/Profile";
import { GetProfileCollection, GetProfileDocument } from "./dbContext";
import { ProfileCreationDTO } from "@/models/dto/profileCreationDTO";
import { ProfileUpdateDTO } from "@/models/dto/profileUpdateDTO";
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from "firebase-admin/firestore";

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
    const docs = await GetProfileCollection(surveyId).get();
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
    const document = await GetProfileDocument(surveyId, profileId).get();
    return GetProfileFromDocument(document);
}

export async function AddProfile(surveyId: string, dto: ProfileCreationDTO) {
    const profile = {
        Title: dto.Title,
        Description: dto.Description
    }

    const docRef = await GetProfileCollection(surveyId).add(profile);

    return {
        ID: docRef.id,
        Title: profile.Title,
        Description: profile.Description,
    };
}

export async function UpdateProfile(surveyId: string, profileId: string, dto: ProfileUpdateDTO) {
    const profile = await GetProfile(surveyId, profileId);
    if(!profile) {
        return false;
    }

    await GetProfileDocument(surveyId, profileId).update({
        Title: dto.Title,
        Description: dto.Description
    });

    return true;
}

export async function DeleteProfile(surveyId: string, profileId: string) {
    await GetProfileDocument(surveyId, profileId).delete();
}