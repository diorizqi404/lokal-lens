import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// GET - List all users
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
    if (!decoded || role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin only' },
        { status: 403 }
      );
    }
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const roleFilter = searchParams.get('role') || '';
    const include = searchParams.get('include') || '';
    
    const skip = (page - 1) * limit;
    
    const where: any = {
      role: {
        in: roleFilter ? roleFilter.split(',') : ['user', 'contributor']
      }
    };
    
    if (search) {
      where.OR = [
        { full_name: { contains: search } },
        { email: { contains: search } }
      ];
    }
    
    const includeOptions: any = {
      profile: true,
      _count: {
        select: {
          articles: true,
          comments: true,
          scan_history: true,
          endangered_reports: true
        }
      }
    };
    
    if (include.includes('certificates')) {
      includeOptions.certificates = {
        orderBy: { date_earned: 'desc' }
      };
    }
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        include: includeOptions,
        orderBy: { created_at: 'desc' }
      }),
      prisma.user.count({ where })
    ]);
    
    return NextResponse.json({
      success: true,
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
