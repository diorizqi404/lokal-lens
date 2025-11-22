import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// POST - Approve verification
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
    
    const contributorId = parseInt(params.id);
    
    // Check if contributor request exists
    const contributor = await prisma.contributor.findUnique({
      where: { id: contributorId },
      include: { user: true }
    });
    
    if (!contributor) {
      return NextResponse.json(
        { success: false, error: 'Contributor request not found' },
        { status: 404 }
      );
    }
    
    if (contributor.verification_status === 'approved') {
      return NextResponse.json(
        { success: false, error: 'Already approved' },
        { status: 400 }
      );
    }
    
    // Update contributor status and user role
    const [updatedContributor] = await Promise.all([
      prisma.contributor.update({
        where: { id: contributorId },
        data: {
          verification_status: 'approved',
          verified_by: decoded.userId,
          verified_at: new Date()
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
      }),
      prisma.user.update({
        where: { id: contributor.user_id },
        data: { role: 'contributor' }
      })
    ]);
    
    return NextResponse.json({
      success: true,
      data: updatedContributor,
      message: 'User approved as contributor'
    });
  } catch (error: any) {
    console.error('Error approving verification:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
