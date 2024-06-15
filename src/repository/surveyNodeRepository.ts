import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { GetSurveyNodeCollection, GetSurveyNodeDocument } from "./dbContext";
import { SurveyNode } from "@/models/SurveyNode";

function GetNodeFromDocument(document: QueryDocumentSnapshot<DocumentData, DocumentData> | DocumentSnapshot<DocumentData, DocumentData>) {
    const data = document.data();
    if(!data){
        return;
    }

    const node: SurveyNode = {
        ID: document.id,
        IsRoot: data["IsRoot"],
        QuestionId: data["QuestionId"],
        NextPerAnswer: data["NextPerAnswer"],
        Result: data["Result"]
    }
    return node;
}

export async function GetAllSurveyNodes(surveyId: string) {
    const docs = await GetSurveyNodeCollection(surveyId).get();
    const nodes: SurveyNode[] = [];

    const docsArr = docs.docs;

    for (let i = 0; i < docsArr.length; i++) {
        const document = docsArr[i];
        const node = GetNodeFromDocument(document);
        if(node) {
            nodes.push(node);
        }
    }

    return nodes;
}

export async function GetSurveyNode(surveyId: string, nodeId: string) {
    const document = await GetSurveyNodeDocument(surveyId, nodeId).get();
    return GetNodeFromDocument(document);
}

export async function GetRootSurveyNode(surveyId: string) {
    const result = await GetSurveyNodeCollection(surveyId).where("IsRoot", "==", true).get();

    const docsArr = result.docs;

    for (let i = 0; i < docsArr.length; i++) {
        const document = docsArr[i];
        const node = GetNodeFromDocument(document);
        if(node) {
            return node;
        }
    }

    return undefined;
}