import { NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { GetQuestion } from "@/repository/questionRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string,
    questionId: string
}

export async function GET(_: NextRequest, {params}: RouteParams<Params>) {
    const id = params.questionId;

    const question = await GetQuestion(id);

    if(!question) {
        return NotFound();
    } else {
        return Ok(question);
    }
}