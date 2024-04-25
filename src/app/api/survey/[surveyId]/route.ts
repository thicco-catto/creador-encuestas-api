import { BadRequest, NoContent, NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { SurveyUpdateDTOFromJSON } from "@/models/dto/surveyUpdateDTO";
import { DeleteSurvey, GetSurvey, UpdateSurvey } from "@/repository/surveyRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string
}

export async function GET(_: NextRequest, { params }: RouteParams<Params>) {
    const id = params.surveyId;

    const survey = await GetSurvey(id);

    if (!survey) {
        return NotFound();
    } else {
        return Ok(survey);
    }
}


export async function PUT(request: NextRequest, { params }: RouteParams<Params>) {
    try {
        const json = await request.json();

        const dto = SurveyUpdateDTOFromJSON(json);

        const success = await UpdateSurvey(params.surveyId, dto);

        if (success) {
            return NoContent();
        } else {
            return NotFound();
        }
    } catch {
        return BadRequest();
    }
}

export async function DELETE(_: NextRequest, { params }: RouteParams<Params>) {
    const success = await DeleteSurvey(params.surveyId)

    if (success) {
        return NoContent();
    } else {
        return NotFound();
    }
}