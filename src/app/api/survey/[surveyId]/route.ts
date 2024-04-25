import { BadRequest, NoResponse, NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { SurveyUpdateDTOFromJSON } from "@/models/dto/surveyUpdateDTO";
import { GetSurvey, UpdateSurvey } from "@/repository/surveyRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string
}

export async function GET(_: NextRequest, {params}: RouteParams<Params>) {
    const id = params.surveyId;

    const survey = await GetSurvey(id);

    if(!survey) {
        return NotFound();
    } else {
        return Ok(survey);
    }
}


export async function PUT(request: NextRequest, {params}: RouteParams<Params>) {
    try {
        const json = await request.json();

        const dto = SurveyUpdateDTOFromJSON(json);

        const success = await UpdateSurvey(params.surveyId, dto);

        if(success) {
            return NoResponse();
        } else {
            return NotFound();
        }
    } catch {
        return BadRequest();
    }
}