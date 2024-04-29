import { QuestionType } from "../Question";
import { QuestionDetails } from "../QuestionDetails";

export interface QuestionCreationDTO { 
    InternalTitle: string,
    QuestionType: QuestionType,
    DefaultDetails: QuestionDetails
}


export function QuestionCreationDTOFromJSON(json: any): QuestionCreationDTO {
    const title = json["InternalTitle"];
    const type = json["QuestionType"];
    const details = json["DefaultDetails"];

    if(!title || !type || !details) {
        throw TypeError;
    }

    return {
        InternalTitle: title,
        QuestionType: type,
        DefaultDetails: details
    }
}