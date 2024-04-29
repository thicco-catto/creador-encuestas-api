import { Question } from "@/models/Question";
import { QueryDocumentSnapshot, DocumentData, DocumentSnapshot, getDocs, getDoc, addDoc } from "firebase/firestore";
import { GetProfileCollection, GetQuestionCollection, GetQuestionDocument } from "./dbContext";
import { QuestionCreationDTO } from "@/models/dto/questionCreationDTO";

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


export async function AddQuestion(surveyId: string, dto: QuestionCreationDTO) {
    const question = {
        InternalTitle: dto.InternalTitle,
        QuestionType: dto.QuestionType,
        DefaultDetails: dto.DefaultDetails
    }

    const docRef = await addDoc(GetQuestionCollection(surveyId), question)

    return {
        ID: docRef.id,
        InternalTitle: dto.InternalTitle,
        QuestionType: dto.QuestionType,
        DefaultDetails: dto.DefaultDetails
    };
}