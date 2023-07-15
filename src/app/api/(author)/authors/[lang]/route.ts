import { GetAuthorsByLanguage } from '@/helpers/db';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: RouteProps) {
    const authors = await GetAuthorsByLanguage(params.lang);

    return NextResponse.json(authors);
}

interface RouteProps {
    params: {
        lang: string
    }
}