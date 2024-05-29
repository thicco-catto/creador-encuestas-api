import { NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { GetRootSurveyNode } from "@/repository/surveyNodeRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string
}

export async function GET(_: NextRequest, { params }: RouteParams<Params>) {
    const surveyId = params.surveyId;
    const node = await GetRootSurveyNode(surveyId);

    if(!node) {
        return NotFound();
    }

    return Ok(node);
}