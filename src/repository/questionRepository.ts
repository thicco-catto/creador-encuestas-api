import { Question } from "@/models/Question";
import { QueryDocumentSnapshot, DocumentData, DocumentSnapshot, getDocs, getDoc } from "firebase/firestore";
import { GetQuestionCollection, GetQuestionDocument } from "./dbContext";

function GetQuestionFromDocument(document: QueryDocumentSnapshot<DocumentData, DocumentData> | DocumentSnapshot<DocumentData, DocumentData>) {
    const data = document.data();
    if(!data){
        return;
    }

    const question: Question = {
        ID: document.id,
        InternalTitle: data["InternalTitle"],
        QuestionType: data["QuestionType"],
        DefaultDetails: {
            Title: data["DefaultTitle"],
            Answers: data["DefaultAnswers"],
        }
    }
    return question;
}

export async function GetAllQuestions(surveyId: string) {
    const docs = await getDocs(GetQuestionCollection(surveyId));
    const questions: Question[] = [];

    docs.forEach(document => {
        const question = GetQuestionFromDocument(document);
        if(question) {
            questions.push(question);
        }
    });

    return questions;
}

export async function GetQuestion(surveyId: string, questionId: string) {
    const document = await getDoc(GetQuestionDocument(surveyId, questionId));
    return GetQuestionFromDocument(document);
}