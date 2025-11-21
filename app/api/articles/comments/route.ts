import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/utils';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
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

    const body = await request.json();
    const { article_id, content, parent_id } = body;

    if (!article_id || !content) {
      return NextResponse.json(
        { error: 'Article ID and content are required' },
        { status: 400 }
      );
    }

    // Check if article exists
    const article = await prisma.article.findUnique({
      where: { id: article_id },
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    // Create comment
    const comment = await prisma.articleComment.create({
      data: {
        article_id,
        user_id: decoded.userId,
        content,
        parent_id: parent_id || null,
      },
      include: {
        user: {
          select: {
            id: true,
            full_name: true,
            profile: {
              select: {
                avatar: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Create comment error:', error);
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
