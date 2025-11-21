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

    // Get user with profile, badges, and challenges
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        profile: true,
        user_badges: {
          include: {
            badge: true,
          },
          orderBy: {
            earned_at: 'desc',
          },
        },
        user_challenges: {
          include: {
            challenge: true,
          },
          orderBy: {
            completed_at: 'desc',
          },
        },
        certificates: {
          orderBy: {
            date_earned: 'desc',
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get all badges for comparison
    const allBadges = await prisma.badge.findMany({
      orderBy: [
        { category: 'asc' },
        { points: 'asc' },
      ],
    });

    // Get all challenges for comparison
    const allChallenges = await prisma.challenge.findMany({
      orderBy: [
        { category: 'asc' },
        { difficulty: 'asc' },
      ],
    });

    // Calculate statistics
    const totalBadges = allBadges.length;
    const earnedBadges = user.user_badges.length;
    const totalChallenges = allChallenges.length;
    const completedChallenges = user.user_challenges.length;
    const totalPoints = user.user_badges.reduce((sum: any, ub: any) => sum + ub.badge.points, 0) +
                        user.user_challenges.reduce((sum: any, uc: any) => sum + uc.challenge.points, 0);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        created_at: user.created_at,
      },
      profile: user.profile,
      badges: {
        earned: user.user_badges.map((ub: any) => ({
          id: ub.id,
          badge: ub.badge,
          earned_at: ub.earned_at,
        })),
        all: allBadges,
        stats: {
          total: totalBadges,
          earned: earnedBadges,
          percentage: totalBadges > 0 ? Math.round((earnedBadges / totalBadges) * 100) : 0,
        },
      },
      challenges: {
        completed: user.user_challenges.map((uc: any) => ({
          id: uc.id,
          challenge: uc.challenge,
          completed_at: uc.completed_at,
        })),
        all: allChallenges,
        stats: {
          total: totalChallenges,
          completed: completedChallenges,
          percentage: totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0,
        },
      },
      certificates: user.certificates,
      stats: {
        total_points: totalPoints,
        provinces_visited: user.profile?.provinces_visited || 0,
        badges_earned: earnedBadges,
        challenges_completed: completedChallenges,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' + error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
