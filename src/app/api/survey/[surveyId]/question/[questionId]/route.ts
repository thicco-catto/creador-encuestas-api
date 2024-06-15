import { BadRequest, NoContent, NotFound, Ok, RequireAuthorization, RouteParams, Unauthorized } from "@/lib/routeHelper";
import { QuestionUpdateDTOFromJSON } from "@/models/dto/questionUpdateDTO";
import { DeleteQuestion, GetQuestion, UpdateQuestion } from "@/repository/questionRepository";
import { RemoveQuestionFromOrder } from "@/repository/surveyRepository";
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
        if(!RequireAuthorization(request)) {
            return Unauthorized();
        }

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


export async function DELETE(request: NextRequest, { params }: RouteParams<Params>) {
    if(!RequireAuthorization(request)) {
        return Unauthorized();
    }

    await DeleteQuestion(params.surveyId, params.questionId);

    await RemoveQuestionFromOrder(params.surveyId, params.questionId);

    return NoContent();
}