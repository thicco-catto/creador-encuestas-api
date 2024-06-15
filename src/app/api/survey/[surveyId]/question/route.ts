import { BadRequest, Created, NotFound, Ok, RouteParams, Unauthorized } from "@/lib/routeHelper";
import { QuestionCreationDTOFromJSON } from "@/models/dto/questionCreationDTO";
import { AddQuestion, GetAllQuestions } from "@/repository/questionRepository";
import { AddQuestionToOrder } from "@/repository/surveyRepository";
import { NextRequest } from "next/server";

interface Params {
    surveyId: string
}

export async function GET(_: NextRequest, { params }: RouteParams<Params>) {
    const questions = await GetAllQuestions(params.surveyId);

    if(questions) {
        return Ok(questions);
    } else {
        return NotFound();
    }
}

export async function POST(request: NextRequest, { params }: RouteParams<Params>) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return Unauthorized();
        }

        const idToken = authHeader.split(' ')[1];

        const json = await request.json();

        const dto = QuestionCreationDTOFromJSON(json);

        const question = await AddQuestion(params.surveyId, dto);

        await AddQuestionToOrder(params.surveyId, question.ID);

        return Created(question);
    } catch {
        return BadRequest();
    }
}