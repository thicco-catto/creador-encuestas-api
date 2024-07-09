export interface SurveyNode {
    ID: string,
    IsRoot: boolean,
    QuestionId?: string,
    NextPerAnswer: {[key: string]: string},
    Result: number
}