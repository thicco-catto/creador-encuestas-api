import { BadRequest, NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { GetSurveyNode } from "@/repository/surveyNodeRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string,
    nodeId: string
}

export async function GET(request: NextRequest, { params }: RouteParams<Params>) {
    const surveyId = params.surveyId;
    const nodeId = params.nodeId;

    const answer = request.nextUrl.searchParams.get("answer");
    if(!answer) {
        return BadRequest();
    }

    const parentNode = await GetSurveyNode(surveyId, nodeId);

    if(!parentNode) {
        return NotFound();
    }

    const childId = parentNode.NextPerAnswer[answer];

    const childNode = await GetSurveyNode(surveyId, childId);

    if(!childNode) {
        return NotFound();
    }

    return Ok(childNode);
}