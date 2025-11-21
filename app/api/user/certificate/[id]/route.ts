import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/utils';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15
    const { id } = await params;
    
    // Verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token) as { userId: number } | null;

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const certificateId = parseInt(id);

    if (isNaN(certificateId)) {
      return NextResponse.json(
        { error: 'Invalid certificate ID' },
        { status: 400 }
      );
    }

    // Get certificate
    const certificate = await prisma.certificate.findUnique({
      where: { id: certificateId },
      include: {
        user: {
          select: {
            full_name: true,
          },
        },
      },
    });

    if (!certificate) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }

    // Check if certificate belongs to authenticated user
    if (certificate.user_id !== decoded.userId) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      );
    }

    return NextResponse.json(certificate);
  } catch (error) {
    console.error('Get certificate error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certificate' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
