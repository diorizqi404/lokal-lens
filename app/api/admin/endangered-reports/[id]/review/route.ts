import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// POST - Review (approve/reject) report
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
    if (!decoded || role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin only' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { status, admin_notes } = body;
    
    const report = await prisma.endangeredReport.update({
      where: { id: parseInt(params.id) },
      data: {
        status,
        admin_notes,
        reviewed_at: new Date(),
        reviewed_by: decoded.userId
      },
      include: {
        user: {
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
      data: report,
      message: `Report ${status} successfully`
    });
  } catch (error: any) {
    console.error('Error reviewing report:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
