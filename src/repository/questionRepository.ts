import { Question } from "@/models/Question";
import { QueryDocumentSnapshot, DocumentData, DocumentSnapshot, getDocs, getDoc, addDoc, updateDoc } from "firebase/firestore";
import { GetQuestionCollection, GetQuestionDocument } from "./dbContext";
import { QuestionCreationDTO } from "@/models/dto/questionCreationDTO";
import { QuestionUpdateDTO } from "@/models/dto/questionUpdateDTO";

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
            Title: data["DefaultDetails"]["Title"],
            Answers: data["DefaultDetails"]["Answers"],
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

export async function UpdateQuestion(surveyId: string, questionId: string, dto: QuestionUpdateDTO) {
    const profile = await GetQuestion(surveyId, questionId);
    if(!profile) {
        return false;
    }

    await updateDoc(GetQuestionDocument(surveyId, questionId), {
        InternalTitle: dto.InternalTitle,
        QuestionType: dto.QuestionType,
        DefaultDetails: dto.DefaultDetails
    });

    return true;
}