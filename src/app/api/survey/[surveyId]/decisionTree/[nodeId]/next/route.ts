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

    const answerStr = request.nextUrl.searchParams.get("answer");
    if(!answerStr) {
        return BadRequest();
    }

    const parsedAnswer = parseInt(answerStr);
    if(isNaN(parsedAnswer)) {
        return BadRequest();
    }

    const parentNode = await GetSurveyNode(surveyId, nodeId);

    if(!parentNode) {
        return NotFound();
    }

    const childId = parentNode.NextPerAnswer[parsedAnswer];

    const childNode = await GetSurveyNode(surveyId, childId);

    if(!childNode) {
        return NotFound();
    }

    return Ok(childNode);
}