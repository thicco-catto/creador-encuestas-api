import { BadRequest, NoContent, NotFound, Ok, RequireAuthorization, RouteParams, Unauthorized } from "@/lib/routeHelper";
import { ProfileUpdateDTOFromJSON } from "@/models/dto/profileUpdateDTO";
import { DeleteProfile, GetProfile, UpdateProfile } from "@/repository/profileRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string,
    profileId: string
}

export async function GET(_: NextRequest, {params}: RouteParams<Params>) {
    const profile = await GetProfile(params.surveyId, params.profileId);

    if(!profile) {
        return NotFound();
    } else {
        return Ok(profile);
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams<Params>) {
    try {
        if(!RequireAuthorization(request)) {
            return Unauthorized();
        }

        const json = await request.json();

        const dto = ProfileUpdateDTOFromJSON(json);

        const success = await UpdateProfile(params.surveyId, params.profileId, dto);

        if (success) {
            return NoContent();
        } else {
            return NotFound();
        }
    } catch {
        return BadRequest();
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams<Params>) {
    if(!RequireAuthorization(request)) {
        return Unauthorized();
    }

    await DeleteProfile(params.surveyId, params.profileId);

    return NoContent();
}