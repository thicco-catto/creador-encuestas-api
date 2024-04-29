import { QuestionDetails } from "../QuestionDetails";

export interface QuestionVersionUpdateDTO {
    Title: string,
    Description: string,
    Profiles: string[],
    Details: QuestionDetails
}

export function VersionUpdateDTOFromJSON(json: any): QuestionVersionUpdateDTO {
    const title = json["Title"];
    const description = json["Description"];
    const profiles = json["Profiles"];
    const details = json["Details"];

    if(!title || !description || !profiles || !details) {
        throw TypeError;
    }

    return {
        Title: title,
        Description: description,
        Profiles: profiles,
        Details: details
    }
}