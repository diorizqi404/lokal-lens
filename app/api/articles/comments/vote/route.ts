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
    const { comment_id, vote_type } = body;

    if (!comment_id || !vote_type || !['upvote', 'downvote'].includes(vote_type)) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    // Check if user already voted
    const existingVote = await prisma.userCommentVote.findUnique({
      where: {
        user_id_comment_id: {
          user_id: decoded.userId,
          comment_id,
        },
      },
    });

    if (existingVote) {
      // Update vote if different
      if (existingVote.vote_type !== vote_type) {
        await prisma.$transaction([
          prisma.userCommentVote.update({
            where: { id: existingVote.id },
            data: { vote_type },
          }),
          prisma.articleComment.update({
            where: { id: comment_id },
            data: {
              upvotes: vote_type === 'upvote' ? { increment: 1 } : { decrement: 1 },
              downvotes: vote_type === 'downvote' ? { increment: 1 } : { decrement: 1 },
            },
          }),
        ]);
      } else {
        // Remove vote if same
        await prisma.$transaction([
          prisma.userCommentVote.delete({
            where: { id: existingVote.id },
          }),
          prisma.articleComment.update({
            where: { id: comment_id },
            data: {
              upvotes: vote_type === 'upvote' ? { decrement: 1 } : undefined,
              downvotes: vote_type === 'downvote' ? { decrement: 1 } : undefined,
            },
          }),
        ]);
      }
    } else {
      // Create new vote
      await prisma.$transaction([
        prisma.userCommentVote.create({
          data: {
            user_id: decoded.userId,
            comment_id,
            vote_type,
          },
        }),
        prisma.articleComment.update({
          where: { id: comment_id },
          data: {
            upvotes: vote_type === 'upvote' ? { increment: 1 } : undefined,
            downvotes: vote_type === 'downvote' ? { increment: 1 } : undefined,
          },
        }),
      ]);
    }

    // Get updated comment
    const comment = await prisma.articleComment.findUnique({
      where: { id: comment_id },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Vote comment error:', error);
    return NextResponse.json(
      { error: 'Failed to vote comment' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
