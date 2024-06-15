import { Survey } from "@/models/Survey";
import { SurveyCreationDTO } from "@/models/dto/surveyCreationDTO";
import { SurveyUpateDTO } from "@/models/dto/surveyUpdateDTO";
import { GetSurveyCollection, GetSurveyDocument } from "./dbContext";
import { DocumentData, DocumentSnapshot, FieldValue, QueryDocumentSnapshot } from "firebase-admin/firestore";

function GetSurveyFromDocument(document: QueryDocumentSnapshot<DocumentData, DocumentData> | DocumentSnapshot<DocumentData, DocumentData>) {
    const data = document.data();
    if(!data){
        return;
    }

    const survey: Survey = {
        ID: document.id,
        Title: data["Title"],
        PublicDescription: data["PublicDescription"],
        PrivateDescription: data["PrivateDescription"],
        QuestionOrder: data["QuestionOrder"],
        LoadOrder: data["LoadOrder"]
    }
    return survey;
}

export async function GetAllSurveys() {
    const docs = await GetSurveyCollection().get();
    const surveys: Survey[] = [];

    docs.forEach(document => {
        const survey = GetSurveyFromDocument(document);
        if(survey) {
            surveys.push(survey);
        }
    });

    return surveys;
}

export async function GetSurvey(id: string) {
    const document = await GetSurveyDocument(id).get();
    return GetSurveyFromDocument(document);
}

export async function AddSurvey(dto: SurveyCreationDTO): Promise<Survey> {
    const survey = {
        Title: dto.Title,
        PrivateDescription: dto.PrivateDescription,
        PublicDescription: dto.PublicDescription
    };

    const docRef = await GetSurveyCollection().add(survey);

    return {
        ID: docRef.id,
        Title: survey.Title,
        PublicDescription: survey.PublicDescription,
        PrivateDescription: survey.PrivateDescription,
        QuestionOrder: []
    };
}

export async function UpdateSurvey(id: string, dto: SurveyUpateDTO) {
    const survey = await GetSurvey(id);
    if(!survey) {
        return false;
    }

    await GetSurveyDocument(id).update({
        Title: dto.Title,
        PublicDescription: dto.PublicDescription,
        PrivateDescription: dto.PrivateDescription,
        QuestionOrder: dto.QuestionOrder,
        LoadOrder: dto.LoadOrder
    });

    return true;
}

export async function DeleteSurvey(id: string) {
    await GetSurveyDocument(id).delete();
}

export async function AddQuestionToOrder(surveyId: string, questionId: string) {
    const survey = await GetSurvey(surveyId);
    if(!survey) {
        return false;
    }

    await GetSurveyDocument(surveyId).update({
        QuestionOrder: FieldValue.arrayUnion(questionId)
    });

    return true
}

export async function RemoveQuestionFromOrder(surveyId: string, questionId: string) {
    const survey = await GetSurvey(surveyId);
    if(!survey) {
        return false;
    }

    await GetSurveyDocument(surveyId).update({
        QuestionOrder: FieldValue.arrayRemove(questionId)
    });

    return true
}