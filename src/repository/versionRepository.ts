import { QuestionVersion } from "@/models/QuestionVersion";
import { GetVersionCollection, GetVersionDocument } from "./dbContext";
import { QuestionVersionCreationDTO } from "@/models/dto/versionCreationDTO";
import { QuestionVersionUpdateDTO } from "@/models/dto/versionUpdateDTO";
import { QueryDocumentSnapshot, DocumentData, DocumentSnapshot } from "firebase-admin/firestore";


function GetVersionFromDocument(document: QueryDocumentSnapshot<DocumentData, DocumentData> | DocumentSnapshot<DocumentData, DocumentData>) {
    const data = document.data();
    if(!data){
        return;
    }

    const version: QuestionVersion = {
        ID: document.id,
        Title: data["Title"],
        Description: data["Description"],
        Profiles: data["Profiles"],
        Details: {
            Title: data["Details"]["Title"],
            Answers: data["Details"]["Answers"],
            First: data["Details"]["First"] ?? "",
            Last: data["Details"]["Last"] ?? "",
        }
    }
    return version;
}


export async function GetAllVersions(surveyId: string, questionId: string) {
    const docs = await GetVersionCollection(surveyId, questionId).get();
    const versions: QuestionVersion[] = [];

    docs.forEach(document => {
        const version = GetVersionFromDocument(document);
        if(version) {
            versions.push(version);
        }
    });

    return versions;
}


export async function GetVersion(surveyId: string, questionId: string, versionId: string) {
    const document = await GetVersionDocument(surveyId, questionId, versionId).get();
    return GetVersionFromDocument(document);
}

export async function AddVersion(surveyId: string, questionId: string, dto: QuestionVersionCreationDTO) {
    const question = {
        Title: dto.Title,
        Description: dto.Description,
        Profiles: dto.Profiles,
        Details: dto.Details
    };

    const docRef = await GetVersionCollection(surveyId, questionId).add(question);

    return {
        ID: docRef.id,
        Title: dto.Title,
        Description: dto.Description,
        Profiles: dto.Profiles,
        Details: dto.Details
    };
}

export async function UpdateVersion(surveyId: string, questionId: string, versionId: string, dto: QuestionVersionUpdateDTO) {
    const version = await GetVersion(surveyId, questionId, versionId);
    if(!version) {
        return false;
    }

    await GetVersionDocument(surveyId, questionId, versionId).update({
        Title: dto.Title,
        Description: dto.Description,
        Profiles: dto.Profiles,
        Details: dto.Details
    });

    return true;
}

export async function DeleteQuestion(surveyId: string, questionId: string, versionId: string) {
    await GetVersionDocument(surveyId, questionId, versionId).delete();
}