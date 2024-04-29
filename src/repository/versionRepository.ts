import { QuestionVersion } from "@/models/QuestionVersion";
import { GetQuestion } from "./questionRepository";
import { GetVersionCollection, GetVersionDocument } from "./dbContext";
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot, addDoc, getDoc, getDocs } from "firebase/firestore";
import { Question } from "@/models/Question";
import { QuestionVersionCreationDTO } from "@/models/dto/versionCreationDTO";

const CurrentVersions: QuestionVersion[] = [
    {
        ID: "1",
        Title: "Pocos estudios",
        Description: "Version de la pregunta para personas con menos estudios",
        Profiles: [
            "1"
        ],
        Details: {
            Title: "Que hora es?",
            Answers: [
                "Una de la tarde",
                "Dos de la tarde",
                "Tres de la tarde"
            ]
        }
    }
]


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
