import { NextResponse } from "next/server";

export interface RouteParams<T> {
    params: T
}


export function Ok(body: any) {
    return NextResponse.json(body, { status: 200 });
}

export function Created(body: any) {
    return NextResponse.json(body, { status: 201 });
}

export function NoResponse() {
    return NextResponse.json({}, { status: 206 });
}

export function BadRequest() {
    return NextResponse.json({}, { status: 400 });
}

export function NotFound() {
    return NextResponse.json({}, { status: 404 });
}