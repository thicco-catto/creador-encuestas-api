import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot, getDoc, getDocs, query, where } from "firebase/firestore";
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
    const docs = await getDocs(GetSurveyNodeCollection(surveyId));
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
    const document = await getDoc(GetSurveyNodeDocument(surveyId, nodeId));
    return GetNodeFromDocument(document);
}

export async function GetRootSurveyNode(surveyId: string) {
    const nodesQuery = query(GetSurveyNodeCollection(surveyId), where("IsRoot", "==", true));

    const docs = await getDocs(nodesQuery);

    const docsArr = docs.docs;

    for (let i = 0; i < docsArr.length; i++) {
        const document = docsArr[i];
        const node = GetNodeFromDocument(document);
        if(node) {
            return node;
        }
    }

    return undefined;
}