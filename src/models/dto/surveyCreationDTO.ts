export interface SurveyCreationDTO {
    Title : string,
    PrivateDescription : string,
    PublicDescription : string,
}


export function SurveyCreationDTOFromJSON(json: any): SurveyCreationDTO {
    const title = json["Title"];
    const privDesc = json["PrivateDescription"];
    const publicDesc = json["PublicDescription"];

    if(!title || !privDesc || !publicDesc) {
        throw TypeError;
    }

    return {
        Title: title,
        PrivateDescription: privDesc,
        PublicDescription: publicDesc
    }
}