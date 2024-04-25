import { NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { GetProfile } from "@/repository/profileRepository";
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