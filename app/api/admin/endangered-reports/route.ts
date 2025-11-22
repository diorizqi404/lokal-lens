import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// GET - List all endangered reports
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
    const status = searchParams.get('status') || '';
    
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { culture_name: { contains: search } },
        { threat_type: { contains: search } },
        { location: { contains: search } }
      ];
    }
    
    if (status) {
      where.status = status;
    }
    
    const [reports, total] = await Promise.all([
      prisma.endangeredReport.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              full_name: true,
              email: true
            }
          },
          reviewer: {
            select: {
              id: true,
              full_name: true
            }
          }
        },
        orderBy: { created_at: 'desc' }
      }),
      prisma.endangeredReport.count({ where })
    ]);
    
    return NextResponse.json({
      success: true,
      data: reports,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
