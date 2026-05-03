import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/notify-teacher`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();
  return NextResponse.json(data);
}