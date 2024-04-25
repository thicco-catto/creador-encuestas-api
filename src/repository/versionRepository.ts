import { QuestionVersion } from "@/models/QuestionVersion";
import { GetQuestion } from "./questionRepository";

const CurrentVersions: QuestionVersion[] = [
    {
        ID: "a",
        Title: "Pocos estudios",
        Description: "Version de la pregunta para personas con menos estudios",
        Profiles: [
            "a"
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


export async function GetAllVersions(questionId: string) {
    const question = await GetQuestion(questionId);
    if(!question) {
        return undefined;
    }

    const versionIds = question.Versions;
    const versions: QuestionVersion[] = [];

    for (let i = 0; i < versionIds.length; i++) {
        const id = versionIds[i];
        const version = await GetVersion(id);
        
        if(version) {
            versions.push(version);
        }
    }

    return versions;
}


export async function GetVersion(versionId: string) {
    return CurrentVersions.find(x => x.ID === versionId);
}