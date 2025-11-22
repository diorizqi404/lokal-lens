import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// POST - Submit contributor application
export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token) as any;
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    const userId = decoded.userId;
    
    // Check if user already has a pending or approved application
    const existingApplication = await prisma.contributor.findUnique({
      where: { user_id: userId }
    });
    
    if (existingApplication) {
      if (existingApplication.verification_status === 'pending') {
        return NextResponse.json(
          { success: false, error: 'You already have a pending application' },
          { status: 400 }
        );
      } else if (existingApplication.verification_status === 'approved') {
        return NextResponse.json(
          { success: false, error: 'You are already a contributor' },
          { status: 400 }
        );
      }
      // If rejected, allow to reapply
    }
    
    const body = await request.json();
    const { reason, cultural_interest = null } = body;
    
    // Create or update contributor application
    const contributor = await prisma.contributor.upsert({
      where: { user_id: userId },
      update: {
        reason,
        cultural_interest,
        verification_status: 'pending',
        rejection_reason: null,
        verified_by: null,
        verified_at: null
      },
      create: {
        user_id: userId,
        reason,
        cultural_interest,
        verification_status: 'pending'
      },
      include: {
        user: {
          select: {
            id: true,
            full_name: true,
            email: true,
            role: true
          }
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      data: contributor,
      message: 'Application submitted successfully'
    });
  } catch (error: any) {
    console.error('Error submitting contributor application:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// GET - Get current user's contributor status
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token) as any;
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    const contributor = await prisma.contributor.findUnique({
      where: { user_id: decoded.userId },
      include: {
        user: {
          select: {
            id: true,
            full_name: true,
            email: true,
            role: true
          }
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      data: contributor
    });
  } catch (error: any) {
    console.error('Error fetching contributor status:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
