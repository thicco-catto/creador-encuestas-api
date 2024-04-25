import { Question, QuestionType } from "@/models/Question";
import { GetSurvey } from "./surveyRepository";


const CurrentQuestions: Question[] = [
    {
        ID: "1",
        InternalTitle: "Pregunta 1",
        QuestionType: QuestionType.SINGLE_CHOICE,
        DefaultDetails: {
            Title: "Que hora es?",
            Answers: [
                "1pm",
                "2pm",
                "3pm"
            ]
        },
        Versions: [ "1" ]
    },
    {
        ID: "2",
        InternalTitle: "Pregunta 2",
        QuestionType: QuestionType.SINGLE_CHOICE,
        DefaultDetails: {
            Title: "Cuanto vale?",
            Answers: [
                "10£",
                "20£",
                "50£"
            ]
        },
        Versions: []
    },
    {
        ID: "3",
        InternalTitle: "Pregunta 3",
        QuestionType: QuestionType.MULTIPLE_CHOICE,
        DefaultDetails: {
            Title: "Donde has estado?",
            Answers: [
                "España",
                "Madrid",
                "Europa"
            ]
        },
        Versions: []
    },
    {
        ID: "4",
        InternalTitle: "Pregunta 1",
        QuestionType: QuestionType.SINGLE_CHOICE,
        DefaultDetails: {
            Title: "Hola?",
            Answers: [
                "Que tal",
                "Adio"
            ]
        },
        Versions: []
    }
]


export async function GetAllQuestions(surveyId: string) {
    const survey = await GetSurvey(surveyId);
    if(!survey) {
        return undefined;
    }

    const questionIds = survey.Questions;
    const questions: Question[] = [];

    for (let i = 0; i < questionIds.length; i++) {
        const id = questionIds[i];
        const question = await GetQuestion(id);
        
        if(question) {
            questions.push(question);
        }
    }

    return questions;
}

export async function GetQuestion(questionId: string) {
    return CurrentQuestions.find(x => x.ID === questionId);
}