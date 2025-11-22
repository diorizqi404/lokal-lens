import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// GET - Get quiz by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        questions: {
          include: {
            options: true
          },
          orderBy: { order_number: 'asc' }
        }
      }
    });
    
    if (!quiz) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: quiz
    });
  } catch (error: any) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update quiz
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token) as any;
    if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'contributor')) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const {
      title,
      slug,
      description,
      thumbnail,
      category,
      difficulty,
      time_limit,
      status,
      questions
    } = body;
    
    const existingQuiz = await prisma.quiz.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!existingQuiz) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    // Check if slug is taken
    if (slug && slug !== existingQuiz.slug) {
      const slugTaken = await prisma.quiz.findUnique({
        where: { slug }
      });
      
      if (slugTaken) {
        return NextResponse.json(
          { success: false, error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }
    
    // Delete existing questions if new questions provided
    if (questions) {
      await prisma.quizQuestion.deleteMany({
        where: { quiz_id: parseInt(params.id) }
      });
    }
    
    const quiz = await prisma.quiz.update({
      where: { id: parseInt(params.id) },
      data: {
        title,
        slug,
        description,
        thumbnail,
        category,
        difficulty,
        time_limit,
        status,
        total_questions: questions?.length || existingQuiz.total_questions,
        questions: questions ? {
          create: questions.map((q: any, index: number) => ({
            question: q.question,
            image_url: q.image_url,
            explanation: q.explanation,
            order_number: q.order_number || index + 1,
            points: q.points || 100,
            options: {
              create: q.options.map((opt: any, optIndex: number) => ({
                option_text: opt.option_text,
                is_correct: opt.is_correct || false,
                order_number: opt.order_number || optIndex + 1
              }))
            }
          }))
        } : undefined
      },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      data: quiz,
      message: 'Quiz updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating quiz:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete quiz
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token) as any;
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin only' },
        { status: 403 }
      );
    }
    
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!quiz) {
      return NextResponse.json(
        { success: false, error: 'Quiz not found' },
        { status: 404 }
      );
    }
    
    await prisma.quiz.delete({
      where: { id: parseInt(params.id) }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Quiz deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting quiz:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
