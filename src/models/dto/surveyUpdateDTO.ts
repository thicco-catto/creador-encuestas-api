export interface SurveyUpateDTO {
    Title : string,
    PrivateDescription : string,
    PublicDescription : string,
    QuestionOrder: string[],
    LoadOrder?: string[]
}


export function SurveyUpdateDTOFromJSON(json: any): SurveyUpateDTO {
    const title = json["Title"];
    const privDesc = json["PrivateDescription"];
    const publicDesc = json["PublicDescription"];
    const questionOrder = json["QuestionOrder"];
    const loadOrder = json["LoadOrder"];

    if(!title || !privDesc || !publicDesc || !questionOrder) {
        throw TypeError;
    }

    return {
        Title: title,
        PrivateDescription: privDesc,
        PublicDescription: publicDesc,
        QuestionOrder: questionOrder,
        LoadOrder: loadOrder
    }
}