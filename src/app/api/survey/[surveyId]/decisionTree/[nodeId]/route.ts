import { NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { GetSurveyNode } from "@/repository/surveyNodeRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string,
    nodeId: string
}

export async function GET(_: NextRequest, { params }: RouteParams<Params>) {
    const surveyId = params.surveyId;
    const nodeId = params.nodeId;
    const node = await GetSurveyNode(surveyId, nodeId);

    if(!node) {
        return NotFound();
    }

    return Ok(node);
}