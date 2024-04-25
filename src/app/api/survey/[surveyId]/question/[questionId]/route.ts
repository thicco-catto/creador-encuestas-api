import { NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { GetQuestion } from "@/repository/questionRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string,
    questionId: string
}

export async function GET(_: NextRequest, {params}: RouteParams<Params>) {
    const question = await GetQuestion(params.surveyId, params.questionId);

    if(!question) {
        return NotFound();
    } else {
        return Ok(question);
    }
}