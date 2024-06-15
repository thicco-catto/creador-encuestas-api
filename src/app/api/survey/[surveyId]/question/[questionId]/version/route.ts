import { BadRequest, Created, NotFound, Ok, RequireAuthorization, RouteParams, Unauthorized } from "@/lib/routeHelper";
import { VersionCreationDTOFromJSON } from "@/models/dto/versionCreationDTO";
import { AddVersion, GetAllVersions } from "@/repository/versionRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string,
    questionId: string
}

export async function GET(_: NextRequest, {params}: RouteParams<Params>) {
    const versions = await GetAllVersions(params.surveyId, params.questionId);

    if(!versions) {
        return NotFound();
    } else {
        return Ok(versions);
    }
}

export async function POST(request: NextRequest, { params }: RouteParams<Params>) {
    try {
        if(!RequireAuthorization(request)) {
            return Unauthorized();
        }
        
        const json = await request.json();

        const dto = VersionCreationDTOFromJSON(json);

        const question = await AddVersion(params.surveyId, params.questionId, dto);

        return Created(question);
    } catch(e) {
        console.log(e);
        return BadRequest();
    }
}