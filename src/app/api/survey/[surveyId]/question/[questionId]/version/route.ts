import { NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { GetAllVersions } from "@/repository/versionRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string,
    questionId: string
}

export async function GET(_: NextRequest, {params}: RouteParams<Params>) {
    const id = params.questionId;

    const versions = await GetAllVersions(id);

    if(!versions) {
        return NotFound();
    } else {
        return Ok(versions);
    }
}