import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// POST - Reject article (change status to archive)
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const token = request.cookies.get('auth_token')?.value;
    const role = request.cookies.get('user_role')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token) as any;
    if (!decoded || (role !== 'admin' && role !== 'officer')) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin or Officer only' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { reason } = body;
    
    const articleId = parseInt(params.id);
    
    const article = await prisma.article.findUnique({
      where: { id: articleId }
    });
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }
    
    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: {
        status: 'archive'
      },
      include: {
        author: {
          select: {
            id: true,
            full_name: true,
            email: true
          }
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      data: updatedArticle,
      message: 'Article rejected and archived',
      reason
    });
  } catch (error: any) {
    console.error('Error rejecting article:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
