import { QuestionVersion } from "@/models/QuestionVersion";
import { GetVersionCollection, GetVersionDocument } from "./dbContext";
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot, addDoc, deleteDoc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { QuestionVersionCreationDTO } from "@/models/dto/versionCreationDTO";
import { QuestionVersionUpdateDTO } from "@/models/dto/versionUpdateDTO";


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
    const docs = await getDocs(GetVersionCollection(surveyId, questionId));
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
    const document = await getDoc(GetVersionDocument(surveyId, questionId, versionId));
    return GetVersionFromDocument(document);
}

export async function AddVersion(surveyId: string, questionId: string, dto: QuestionVersionCreationDTO) {
    const question = {
        Title: dto.Title,
        Description: dto.Description,
        Profiles: dto.Profiles,
        Details: dto.Details
    }

    const docRef = await addDoc(GetVersionCollection(surveyId, questionId), question)

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

    await updateDoc(GetVersionDocument(surveyId, questionId, versionId), {
        Title: dto.Title,
        Description: dto.Description,
        Profiles: dto.Profiles,
        Details: dto.Details
    });

    return true;
}

export async function DeleteQuestion(surveyId: string, questionId: string, versionId: string) {
    await deleteDoc(GetVersionDocument(surveyId, questionId, versionId));
}