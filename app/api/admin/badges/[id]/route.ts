import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// GET - Get badge by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const badge = await prisma.badge.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!badge) {
      return NextResponse.json(
        { success: false, error: 'Badge not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: badge
    });
  } catch (error: any) {
    console.error('Error fetching badge:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update badge
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const {
      name,
      description,
      icon,
      category,
      requirement,
      points
    } = body;
    
    const existingBadge = await prisma.badge.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!existingBadge) {
      return NextResponse.json(
        { success: false, error: 'Badge not found' },
        { status: 404 }
      );
    }
    
    const badge = await prisma.badge.update({
      where: { id: parseInt(params.id) },
      data: {
        name,
        description,
        icon,
        category,
        requirement,
        points
      }
    });
    
    return NextResponse.json({
      success: true,
      data: badge,
      message: 'Badge updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating badge:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete badge
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const badge = await prisma.badge.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!badge) {
      return NextResponse.json(
        { success: false, error: 'Badge not found' },
        { status: 404 }
      );
    }
    
    await prisma.badge.delete({
      where: { id: parseInt(params.id) }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Badge deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting badge:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
