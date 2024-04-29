import { BadRequest, NoContent, NotFound, Ok, RouteParams } from "@/lib/routeHelper";
import { QuestionUpdateDTOFromJSON } from "@/models/dto/questionUpdateDTO";
import { GetQuestion, UpdateQuestion } from "@/repository/questionRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string,
    questionId: string
}

export async function GET(_: NextRequest, {params}: RouteParams<Params>) {
    const question = await GetQuestion(params.surveyId, params.questionId);

    if(!question) {
        return NotFound();
    } else {
        return Ok(question);
    }
}


export async function PUT(request: NextRequest, { params }: RouteParams<Params>) {
    try {
        const json = await request.json();

        const dto = QuestionUpdateDTOFromJSON(json);

        const success = await UpdateQuestion(params.surveyId, params.questionId, dto);

        if (success) {
            return NoContent();
        } else {
            return NotFound();
        }
    } catch {
        return BadRequest();
    }
}