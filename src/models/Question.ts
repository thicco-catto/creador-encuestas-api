import { QuestionDetails } from "./QuestionDetails";

export enum QuestionType {
    SINGLE_CHOICE = 1,
    MULTIPLE_CHOICE = 2
}

export interface Question {
    ID: string,
    InternalTitle: string,
    QuestionType: QuestionType,
    DefaultDetails: QuestionDetails
}