import { QuestionType } from "../Question";
import { QuestionDetails } from "../QuestionDetails";

export interface QuestionUpdateDTO { 
    InternalTitle: string,
    QuestionType: QuestionType,
    DefaultDetails: QuestionDetails
}


export function QuestionUpdateDTOFromJSON(json: any): QuestionUpdateDTO {
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