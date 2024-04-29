// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env["API_KEY"],
  authDomain: process.env["AUTH_DOMAIN"],
  projectId: process.env["PROJECT_ID"],
  storageBucket: process.env["STORAGE_BUCKET"],
  messagingSenderId: process.env["MESSAGING_SENDER_ID"],
  appId: process.env["APP_ID"],
  measurementId: process.env["MEASUREMENT_ID"],
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const DB = getFirestore(app);

const SURVEY_COLLECTION = "Survey"

export function GetSurveyCollection() {
  return collection(DB, SURVEY_COLLECTION);
}

export function GetSurveyDocument(id: string) {
  return doc(DB, SURVEY_COLLECTION, id);
}

const PROFILE_COLLECTION = "Profile"

export function GetProfileCollection(surveyId: string) {
  return collection(DB, SURVEY_COLLECTION, surveyId, PROFILE_COLLECTION)
}

export function GetProfileDocument(surveyId: string, profileId: string) {
  return doc(DB, SURVEY_COLLECTION, surveyId, PROFILE_COLLECTION, profileId);
}

const QUESTION_COLLECTION = "Question"

export function GetQuestionCollection(surveyId: string) {
  return collection(DB, SURVEY_COLLECTION, surveyId, QUESTION_COLLECTION)
}

export function GetQuestionDocument(surveyId: string, questionId: string) {
  return doc(DB, SURVEY_COLLECTION, surveyId, QUESTION_COLLECTION, questionId);
}

const VERSION_COLLECTION = "Version"

export function GetVersionCollection(surveyId: string, questionId: string) {
  return collection(DB, SURVEY_COLLECTION, surveyId, QUESTION_COLLECTION, questionId, VERSION_COLLECTION)
}

export function GetVersionDocument(surveyId: string, questionId: string, versionId: string) {
  return doc(DB, SURVEY_COLLECTION, surveyId, QUESTION_COLLECTION, questionId, VERSION_COLLECTION, versionId);
}