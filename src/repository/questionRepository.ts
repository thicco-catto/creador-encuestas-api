import { Question } from "@/models/Question";
import { GetQuestionCollection, GetQuestionDocument, GetVersionCollection } from "./dbContext";
import { QuestionCreationDTO } from "@/models/dto/questionCreationDTO";
import { QuestionUpdateDTO } from "@/models/dto/questionUpdateDTO";
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from "firebase-admin/firestore";

async function GetQuestionFromDocument(surveyId: string, document: QueryDocumentSnapshot<DocumentData, DocumentData> | DocumentSnapshot<DocumentData, DocumentData>) {
    const data = document.data();
    if(!data){
        return;
    }

    const numVersions = await GetVersionCollection(surveyId, document.id).count().get();

    const question: Question = {
        ID: document.id,
        InternalTitle: data["InternalTitle"],
        QuestionType: data["QuestionType"],
        DefaultDetails: {
            Title: data["DefaultDetails"]["Title"],
            Answers: data["DefaultDetails"]["Answers"],
            First: data["DefaultDetails"]["First"] ?? "",
            Last: data["DefaultDetails"]["Last"] ?? "",
        },
        HasVersions: numVersions.data().count > 0,
        Help: data["Help"] ?? ""
    }
    return question;
}

export async function GetAllQuestions(surveyId: string) {
    const docs = await GetQuestionCollection(surveyId).get();
    const questions: Question[] = [];

    const docsArr = docs.docs;

    for (let i = 0; i < docsArr.length; i++) {
        const document = docsArr[i];
        const question = await GetQuestionFromDocument(surveyId, document);
        if(question) {
            questions.push(question);
        }
    }

    return questions;
}

export async function GetQuestion(surveyId: string, questionId: string) {
    const document = await GetQuestionDocument(surveyId, questionId).get();
    return await GetQuestionFromDocument(surveyId, document);
}


export async function AddQuestion(surveyId: string, dto: QuestionCreationDTO) {
    const question = {
        InternalTitle: dto.InternalTitle,
        QuestionType: dto.QuestionType,
        DefaultDetails: dto.DefaultDetails,
        Help: dto.Help
    }

    const docRef = await GetQuestionCollection(surveyId).add(question);

    return {
        ID: docRef.id,
        InternalTitle: dto.InternalTitle,
        QuestionType: dto.QuestionType,
        DefaultDetails: dto.DefaultDetails,
        Help: dto.Help
    };
}

export async function UpdateQuestion(surveyId: string, questionId: string, dto: QuestionUpdateDTO) {
    const profile = await GetQuestion(surveyId, questionId);
    if(!profile) {
        return false;
    }

    await GetQuestionDocument(surveyId, questionId).update({
        InternalTitle: dto.InternalTitle,
        QuestionType: dto.QuestionType,
        DefaultDetails: dto.DefaultDetails,
        Help: dto.Help
    });

    return true;
}

export async function DeleteQuestion(surveyId: string, questionId: string) {
    await GetQuestionDocument(surveyId, questionId).delete();
}