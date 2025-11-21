import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/utils';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token) as { userId: number } | null;

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get user's latest badge
    const latestBadge = await prisma.userBadge.findFirst({
      where: {
        user_id: decoded.userId,
      },
      include: {
        badge: true,
      },
      orderBy: {
        earned_at: 'desc',
      },
    });

    if (!latestBadge) {
      return NextResponse.json(
        { error: 'No badges earned yet' },
        { status: 404 }
      );
    }

    // Get user and profile
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        full_name: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get user profile
    const profile = await prisma.profile.findUnique({
      where: {
        user_id: decoded.userId,
      },
    });

    // Generate shareable ID (using user_badge id for uniqueness)
    const shareableId = `${user.id}-${latestBadge.id}`;

    return NextResponse.json({
      user: {
        id: user.id,
        full_name: user.full_name,
        avatar: profile?.avatar,
      },
      badge: {
        id: latestBadge.badge.id,
        name: latestBadge.badge.name,
        description: latestBadge.badge.description,
        icon: latestBadge.badge.icon,
        category: latestBadge.badge.category,
        earned_at: latestBadge.earned_at,
      },
      profile: {
        provinces_visited: profile?.provinces_visited || 0,
        badges_earned: profile?.badges_earned || 0,
      },
      shareableId,
    });
  } catch (error) {
    console.error('Error fetching share achievement:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
