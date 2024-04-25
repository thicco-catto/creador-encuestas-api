import { NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { GetProfile } from "@/repository/profileRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string,
    profileId: string
}

export async function GET(_: NextRequest, {params}: RouteParams<Params>) {
    const id = params.profileId;

    const survey = await GetProfile(id);

    if(!survey) {
        return NotFound();
    } else {
        return Ok(survey);
    }
}