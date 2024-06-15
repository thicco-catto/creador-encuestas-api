import admin from "./firebase";

const DB = admin.firestore();

const SURVEY_COLLECTION = "Survey";

export function GetSurveyCollection() {
  return DB.collection(SURVEY_COLLECTION);
}

export function GetSurveyDocument(id: string) {
  return DB.doc(`${SURVEY_COLLECTION}/${id}`);
}

const PROFILE_COLLECTION = "Profile";

export function GetProfileCollection(surveyId: string) {
  return DB.collection(`${SURVEY_COLLECTION}/${surveyId}/${PROFILE_COLLECTION}`);
}

export function GetProfileDocument(surveyId: string, profileId: string) {
  return DB.doc(`${SURVEY_COLLECTION}/${surveyId}/${PROFILE_COLLECTION}/${profileId}`);
}

const QUESTION_COLLECTION = "Question";

export function GetQuestionCollection(surveyId: string) {
  return DB.collection(`${SURVEY_COLLECTION}/${surveyId}/${QUESTION_COLLECTION}`);
}

export function GetQuestionDocument(surveyId: string, questionId: string) {
  return DB.doc(`${SURVEY_COLLECTION}/${surveyId}/${QUESTION_COLLECTION}/${questionId}`);
}

const VERSION_COLLECTION = "Version";

export function GetVersionCollection(surveyId: string, questionId: string) {
  return DB.collection(`${SURVEY_COLLECTION}/${surveyId}/${QUESTION_COLLECTION}/${questionId}/${VERSION_COLLECTION}`);
}

export function GetVersionDocument(surveyId: string, questionId: string, versionId: string) {
  return DB.doc(`${SURVEY_COLLECTION}/${surveyId}/${QUESTION_COLLECTION}/${questionId}/${VERSION_COLLECTION}/${versionId}`);
}

const SURVEY_NODE_COLLECTION = "Node";

export function GetSurveyNodeCollection(surveyId: string) {
  return DB.collection(`${SURVEY_COLLECTION}/${surveyId}/${SURVEY_NODE_COLLECTION}`);
}

export function GetSurveyNodeDocument(surveyId: string, surveyNodeId: string) {
  return DB.doc(`${SURVEY_COLLECTION}/${surveyId}/${SURVEY_NODE_COLLECTION}/${surveyNodeId}`);
}