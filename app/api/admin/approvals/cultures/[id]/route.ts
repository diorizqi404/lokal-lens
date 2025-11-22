import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// POST - Approve culture
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
    if (!decoded || (role !== 'admin' && role !== 'officer')) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin or Officer only' },
        { status: 403 }
      );
    }
    
    const cultureId = parseInt(params.id);
    
    const culture = await prisma.culture.findUnique({
      where: { id: cultureId }
    });
    
    if (!culture) {
      return NextResponse.json(
        { success: false, error: 'Culture not found' },
        { status: 404 }
      );
    }
    
    const updatedCulture = await prisma.culture.update({
      where: { id: cultureId },
      data: { status: 'published' }
    });
    
    return NextResponse.json({
      success: true,
      data: updatedCulture,
      message: 'Culture approved and published'
    });
  } catch (error: any) {
    console.error('Error approving culture:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Reject culture
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
    if (!decoded || (role !== 'admin' && role !== 'officer')) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin or Officer only' },
        { status: 403 }
      );
    }
    
    const cultureId = parseInt(params.id);
    
    const culture = await prisma.culture.findUnique({
      where: { id: cultureId }
    });
    
    if (!culture) {
      return NextResponse.json(
        { success: false, error: 'Culture not found' },
        { status: 404 }
      );
    }
    
    const updatedCulture = await prisma.culture.update({
      where: { id: cultureId },
      data: { status: 'archive' }
    });
    
    return NextResponse.json({
      success: true,
      data: updatedCulture,
      message: 'Culture rejected and archived'
    });
  } catch (error: any) {
    console.error('Error rejecting culture:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
