import { NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { GetAllProfiles } from "@/repository/profileRepository";
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