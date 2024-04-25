import { NextResponse } from "next/server";

export interface RouteParams<T> {
    params: T
}


export function Ok(body: any) {
    return NextResponse.json(body, { status: 200 })
}


export function NotFound() {
    return NextResponse.json({}, { status: 404 });
}