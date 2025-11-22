import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// PUT - Update certificate
export async function PUT(
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
    const { title, description, date_earned } = body;
    
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (date_earned !== undefined) updateData.date_earned = new Date(date_earned);
    
    const certificate = await prisma.certificate.update({
      where: { id: parseInt(params.id) },
      data: updateData,
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
      message: 'Certificate updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating certificate:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete certificate
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
    
    await prisma.certificate.delete({
      where: { id: parseInt(params.id) }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Certificate deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting certificate:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
