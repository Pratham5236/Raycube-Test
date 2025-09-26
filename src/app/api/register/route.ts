import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/database';
import { generateId } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    const userId = generateId();
    const user = await database.createUser({
      id: userId,
      name,
      email,
      phone
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Check if it's a duplicate email constraint error
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed: users.email')) {
      return NextResponse.json(
        { error: 'An account with this email already exists. Please use a different email address.' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
