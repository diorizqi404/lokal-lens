import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const token = request.cookies.get('auth_token')?.value;
    const role = request.cookies.get('user_role')?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = verifyToken(token) as any;
    if (!decoded || (role !== 'admin' && role !== 'officer')) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }
    
    const quizId = parseInt(params.id);
    const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });
    
    if (!quiz) {
      return NextResponse.json({ success: false, error: 'Quiz not found' }, { status: 404 });
    }
    
    const updatedQuiz = await prisma.quiz.update({
      where: { id: quizId },
      data: { status: 'published' }
    });
    
    return NextResponse.json({
      success: true,
      data: updatedQuiz,
      message: 'Quiz approved and published'
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const token = request.cookies.get('auth_token')?.value;
    const role = request.cookies.get('user_role')?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = verifyToken(token) as any;
    if (!decoded || (role !== 'admin' && role !== 'officer')) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }
    
    const quizId = parseInt(params.id);
    const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });
    
    if (!quiz) {
      return NextResponse.json({ success: false, error: 'Quiz not found' }, { status: 404 });
    }
    
    const updatedQuiz = await prisma.quiz.update({
      where: { id: quizId },
      data: { status: 'archive' as any }
    });
    
    return NextResponse.json({
      success: true,
      data: updatedQuiz,
      message: 'Quiz rejected and archived'
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
