import { VerifyToken } from "@/repository/auth";
import { NextRequest, NextResponse } from "next/server";

export interface RouteParams<T> {
    params: T
}


export async function RequireAuthorization(request: NextRequest) {
    const authHeader = request.headers.get('Authorization');
        
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return Unauthorized();
    }

    const idToken = authHeader.split(' ')[1];

    let decodedToken;
    try {
        decodedToken = await VerifyToken(idToken);
    } catch {
        return false;
    }

    return true;
}


export function Ok(body: any) {
    return NextResponse.json(body, { status: 200 });
}

export function Created(body: any) {
    return NextResponse.json(body, { status: 201 });
}

export function NoContent() {
    return NextResponse.json({}, { status: 206 });
}

export function BadRequest() {
    return NextResponse.json({}, { status: 400 });
}

export function Unauthorized() {
    return NextResponse.json({}, { status: 401});
}

export function NotFound() {
    return NextResponse.json({}, { status: 404 });
}