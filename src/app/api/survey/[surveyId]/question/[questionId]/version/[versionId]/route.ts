import { NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { GetAllVersions, GetVersion } from "@/repository/versionRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string,
    questionId: string,
    versionId: string
}

export async function GET(_: NextRequest, {params}: RouteParams<Params>) {
    const id = params.versionId;

    const version = await GetVersion(id);

    if(!version) {
        return NotFound();
    } else {
        return Ok(version);
    }
}