import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    const role = request.cookies.get('user_role')?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = verifyToken(token) as any;
    if (!decoded || (role !== 'admin' && role !== 'officer')) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || 'draft';
    const search = searchParams.get('search') || '';
    const skip = (page - 1) * limit;
    
    const whereClause: any = { status };
    if (search) {
      whereClause.title = { contains: search };
    }
    
    const [quizzes, total] = await Promise.all([
      prisma.quiz.findMany({
        where: whereClause,
        include: {
          category_rel: { select: { id: true, name: true, slug: true } },
          _count: { select: { questions: true } }
        },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' }
      }),
      prisma.quiz.count({ where: whereClause })
    ]);
    
    return NextResponse.json({
      success: true,
      data: quizzes,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
