export interface SurveyUpateDTO {
    Title : string,
    PrivateDescription : string,
    PublicDescription : string,
}


export function SurveyUpdateDTOFromJSON(json: any): SurveyUpateDTO {
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