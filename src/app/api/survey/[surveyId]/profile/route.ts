import { BadRequest, Created, NotFound, Ok, RequireAuthorization, RouteParams, Unauthorized } from "@/lib/routeHelper";
import { ProfileCreationDTOFromJSON } from "@/models/dto/profileCreationDTO";
import { AddProfile, GetAllProfiles } from "@/repository/profileRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string
}

export async function GET(_: NextRequest, { params }: RouteParams<Params>) {
    const profiles = await GetAllProfiles(params.surveyId);

    if(profiles) {
        return Ok(profiles);
    } else {
        return NotFound();
    }
}

export async function POST(request: NextRequest, { params }: RouteParams<Params>) {
    try {
        if(!RequireAuthorization(request)) {
            return Unauthorized();
        }

        const json = await request.json();

        const dto = ProfileCreationDTOFromJSON(json);

        const profile = await AddProfile(params.surveyId, dto);

        return Created(profile);
    } catch {
        return BadRequest();
    }
}