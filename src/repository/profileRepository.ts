import { Profile } from "@/models/Profile";
import { GetSurvey } from "./surveyRepository";

const CurrentProfiles: Profile[] = [
    {
        ID: "1",
        Title: "Pocos estudios",
        Description: "Persona que no ha estudiado mucho"
    },
    {
        ID: "2",
        Title: "Muchos estudios",
        Description: "Persona que ha estudiado mucho"
    }
]


export async function GetAllProfiles(surveyId: string) {
    const survey = await GetSurvey(surveyId);
    if(!survey) {
        return undefined;
    }

    const profileIds = survey.Profiles;
    const profiles: Profile[] = [];

    for (let i = 0; i < profileIds.length; i++) {
        const id = profileIds[i];
        const profile = await GetProfile(id);
        
        if(profile) {
            profiles.push(profile);
        }
    }

    return profiles;
}

export async function GetProfile(profileId: string) {
    return CurrentProfiles.find(x => x.ID === profileId);
}