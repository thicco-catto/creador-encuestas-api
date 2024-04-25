import { QuestionDetails } from "./QuestionDetails";
import { QuestionVersion } from "./QuestionVersion";

export enum QuestionType {
    SINGLE_CHOICE,
    MULTIPLE_CHOICE
}

export interface Question {
    ID: string,
    InternalTitle: string,
    QuestionType: QuestionType,
    DefaultDetails: QuestionDetails
    Versions: string[]
}