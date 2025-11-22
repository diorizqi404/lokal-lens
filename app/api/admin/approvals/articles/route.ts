import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// GET - List articles pending approval
export async function GET(request: NextRequest) {
  try {
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
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') || 'draft';
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;
    
    const whereClause: any = { status };
    
    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { author: { full_name: { contains: search } } }
      ];
    }
    
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where: whereClause,
        include: {
          author: {
            select: {
              id: true,
              full_name: true,
              email: true,
              role: true
            }
          },
          category_rel: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' }
      }),
      prisma.article.count({ where: whereClause })
    ]);
    
    return NextResponse.json({
      success: true,
      data: articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
