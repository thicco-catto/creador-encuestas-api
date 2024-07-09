import { QuestionType } from "../Question";
import { QuestionDetails } from "../QuestionDetails";

export interface QuestionUpdateDTO { 
    InternalTitle: string,
    QuestionType: QuestionType,
    DefaultDetails: QuestionDetails,
    Help: string
}


export function QuestionUpdateDTOFromJSON(json: any): QuestionUpdateDTO {
    const title = json["InternalTitle"];
    const type = json["QuestionType"];
    const details = json["DefaultDetails"];
    const help = json["Help"];

    if(title == undefined || type == undefined || details == undefined || help == undefined) {
        throw TypeError;
    }

    return {
        InternalTitle: title,
        QuestionType: type,
        DefaultDetails: details,
        Help: help
    }
}