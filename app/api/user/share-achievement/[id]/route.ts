import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params in Next.js 15
    const { id } = await params;
    const shareId = id;
    
    // Parse shareId (format: userId-userBadgeId)
    const [userIdStr, userBadgeIdStr] = shareId.split('-');
    const userId = parseInt(userIdStr);
    const userBadgeId = parseInt(userBadgeIdStr);

    if (isNaN(userId) || isNaN(userBadgeId)) {
      return NextResponse.json(
        { error: 'Invalid share ID' },
        { status: 400 }
      );
    }

    // Get user badge with user and badge details
    const userBadge = await prisma.userBadge.findFirst({
      where: {
        id: userBadgeId,
        user_id: userId,
      },
      include: {
        badge: true,
        user: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!userBadge) {
      return NextResponse.json(
        { error: 'Achievement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: userBadge.user.id,
        full_name: userBadge.user.full_name,
        avatar: userBadge.user.profile?.avatar,
      },
      badge: {
        id: userBadge.badge.id,
        name: userBadge.badge.name,
        description: userBadge.badge.description,
        icon: userBadge.badge.icon,
        category: userBadge.badge.category,
        earned_at: userBadge.earned_at,
      },
      profile: {
        provinces_visited: userBadge.user.profile?.provinces_visited || 0,
        badges_earned: userBadge.user.profile?.badges_earned || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching public achievement:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
