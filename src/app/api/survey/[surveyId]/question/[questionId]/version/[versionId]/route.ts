import { BadRequest, NoContent, NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { VersionUpdateDTOFromJSON } from "@/models/dto/versionUpdateDTO";
import { DeleteQuestion, GetVersion, UpdateVersion } from "@/repository/versionRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string,
    questionId: string,
    versionId: string
}

export async function GET(_: NextRequest, {params}: RouteParams<Params>) {
    const version = await GetVersion(params.surveyId, params.questionId, params.versionId);

    if(!version) {
        return NotFound();
    } else {
        return Ok(version);
    }
}


export async function PUT(request: NextRequest, { params }: RouteParams<Params>) {
    try {
        const json = await request.json();

        const dto = VersionUpdateDTOFromJSON(json);

        const success = await UpdateVersion(params.surveyId, params.questionId, params.versionId, dto);

        if (success) {
            return NoContent();
        } else {
            return NotFound();
        }
    } catch (e){
        return BadRequest();
    }
}


export async function DELETE(_: NextRequest, { params }: RouteParams<Params>) {
    await DeleteQuestion(params.surveyId, params.questionId, params.versionId);

    return NoContent();
}