import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// GET - List all certificates (optionally filtered by user)
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
    const userId = searchParams.get('user_id');
    const search = searchParams.get('search') || '';
    
    const skip = (page - 1) * limit;
    
    let whereClause: any = {};
    
    if (userId) {
      whereClause.user_id = parseInt(userId);
    }
    
    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { description: { contains: search } }
      ];
    }
    
    const [certificates, total] = await Promise.all([
      prisma.certificate.findMany({
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
        orderBy: { date_earned: 'desc' }
      }),
      prisma.certificate.count({ where: whereClause })
    ]);
    
    return NextResponse.json({
      success: true,
      data: certificates,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create certificate
export async function POST(request: NextRequest) {
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
    
    const body = await request.json();
    const { user_id, title, description, date_earned } = body;
    
    if (!user_id || !title || !description || !date_earned) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const certificate = await prisma.certificate.create({
      data: {
        user_id: parseInt(user_id),
        title,
        description,
        date_earned: new Date(date_earned)
      },
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
      }
    });
    
    return NextResponse.json({
      success: true,
      data: certificate,
      message: 'Certificate created successfully'
    });
  } catch (error: any) {
    console.error('Error creating certificate:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
