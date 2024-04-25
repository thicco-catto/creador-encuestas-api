import { NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { GetSurvey } from "@/repository/surveyRepository";
import { NextRequest } from "next/server";

interface Params {
    id: string
}

export async function GET(_: NextRequest, {params}: RouteParams<Params>) {
    const id = params.id;

    const survey = await GetSurvey(id);

    if(!survey) {
        return NotFound();
    } else {
        return Ok(survey);
    }
}