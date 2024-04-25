import { NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { GetAllQuestions } from "@/repository/questionRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string
}

export async function GET(_: NextRequest, { params }: RouteParams<Params>) {
    const profiles = await GetAllQuestions(params.surveyId);

    if(profiles) {
        return Ok(profiles);
    } else {
        return NotFound();
    }
}