import { NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { GetAllQuestions } from "@/repository/questionRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string
}

export async function GET(_: NextRequest, { params }: RouteParams<Params>) {
    const questions = await GetAllQuestions(params.surveyId);

    if(questions) {
        return Ok(questions);
    } else {
        return NotFound();
    }
}