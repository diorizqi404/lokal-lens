import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// GET - List verification requests
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
    const verification_status = searchParams.get('verification_status') || 'pending';
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;
    
    const whereClause: any = {
      verification_status
    };
    
    if (search) {
      whereClause.user = {
        OR: [
          { full_name: { contains: search } },
          { email: { contains: search } }
        ]
      };
    }
    
    const [contributors, total] = await Promise.all([
      prisma.contributor.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              full_name: true,
              email: true,
              role: true,
              created_at: true,
              profile: {
                select: {
                  avatar: true,
                  bio: true
                }
              },
              _count: {
                select: {
                  articles: true,
                  scan_history: true
                }
              }
            }
          }
        },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' }
      }),
      prisma.contributor.count({ where: whereClause })
    ]);
    
    return NextResponse.json({
      success: true,
      data: contributors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching verification requests:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
