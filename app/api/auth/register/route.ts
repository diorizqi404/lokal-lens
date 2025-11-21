import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth/utils';

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password } = await request.json();

    // Validation
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user and profile
    const user = await prisma.user.create({
      data: {
        email,
        full_name: fullName,
        password: hashedPassword,
        role: 'user',
        profile: {
          create: {
            bio: null,
            avatar: null,
            provinces_visited: 0,
            badges_earned: 0,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
          avatar: user.profile?.avatar,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
