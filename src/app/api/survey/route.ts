import { BadRequest, Created, Ok, RequireAuthorization, Unauthorized } from "@/lib/routeHelper";
import { SurveyCreationDTOFromJSON } from "@/models/dto/surveyCreationDTO";
import { AddSurvey, GetAllSurveys } from "@/repository/surveyRepository";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest) {
    const surveys = await GetAllSurveys();

    return Ok(surveys);
}

export async function POST(request: NextRequest) {
    try {
        if(!RequireAuthorization(request)) {
            return Unauthorized();
        }

        const json = await request.json();

        const dto = SurveyCreationDTOFromJSON(json);

        const survey = await AddSurvey(dto);

        return Created(survey);
    } catch {
        return BadRequest();
    }
}