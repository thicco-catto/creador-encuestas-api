import { Ok } from "@/lib/routeHelper";
import { GetAllSurveys } from "@/repository/surveyRepository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest) {
    const surveys = await GetAllSurveys();

    return Ok(surveys);
}