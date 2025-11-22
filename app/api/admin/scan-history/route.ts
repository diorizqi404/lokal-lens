import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// GET - List scan history
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
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const province = searchParams.get('province') || '';
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;
    
    const whereClause: any = {};
    
    if (province) {
      whereClause.province = province;
    }
    
    if (search) {
      whereClause.OR = [
        { object_name: { contains: search } },
        { province: { contains: search } }
      ];
    }
    
    const [scanHistory, total] = await Promise.all([
      prisma.scanHistory.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              full_name: true,
              email: true,
              profile: {
                select: {
                  avatar: true
                }
              }
            }
          }
        },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' }
      }),
      prisma.scanHistory.count({ where: whereClause })
    ]);
    
    return NextResponse.json({
      success: true,
      data: scanHistory,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching scan history:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
