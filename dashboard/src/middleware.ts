import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('auth_token')?.value;

    if (!token) {
        return new NextResponse(JSON.stringify({ message: 'Token não fornecido' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('Authorization', `Bearer ${token}`);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}
