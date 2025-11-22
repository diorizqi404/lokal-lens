import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// DELETE - Delete report
export async function DELETE(
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
    
    await prisma.endangeredReport.delete({
      where: { id: parseInt(params.id) }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Report deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting report:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
