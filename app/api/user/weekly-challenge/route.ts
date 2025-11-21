import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/utils';
import { prisma } from '@/lib/prisma';

// Get the current week number of the year
function getWeekNumber(date: Date): number {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const millisecsInDay = 86400000;
  return Math.ceil((((date.getTime() - onejan.getTime()) / millisecsInDay) + onejan.getDay() + 1) / 7);
}

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

    const currentDate = new Date();
    const weekNumber = getWeekNumber(currentDate);
    const year = currentDate.getFullYear();

    // Get all challenges
    const allChallenges = await prisma.challenge.findMany();

    if (allChallenges.length === 0) {
      return NextResponse.json({
        challenge: null,
        progress: {
          completed: 0,
          total: 0,
          percentage: 0,
        },
        isCompleted: false,
      });
    }

    // Select weekly challenge based on week number (rotates through challenges)
    const challengeIndex = (weekNumber + year) % allChallenges.length;
    const weeklyChallenge = allChallenges[challengeIndex];

    // Check if user has completed this challenge
    const userCompletion = await prisma.userCompleteChallenge.findFirst({
      where: {
        user_id: decoded.userId,
        challenge_id: weeklyChallenge.id,
      },
    });

    // Parse requirements to calculate progress
    // Assuming requirements is a JSON string like: {"scan": 3, "quiz": 2}
    let progress = {
      completed: 0,
      total: 0,
      percentage: 0,
    };

    try {
      const requirements = JSON.parse(weeklyChallenge.requirements);
      progress.total = Object.values(requirements).reduce((sum: number, val: any) => sum + Number(val), 0);
      
      // If completed, set progress to 100%
      if (userCompletion) {
        progress.completed = progress.total;
        progress.percentage = 100;
      } else {
        // For now, set to 0. In future, track individual progress
        progress.completed = 0;
        progress.percentage = 0;
      }
    } catch (e) {
      // If requirements is not JSON, default to simple completion check
      progress.total = 1;
      progress.completed = userCompletion ? 1 : 0;
      progress.percentage = userCompletion ? 100 : 0;
    }

    return NextResponse.json({
      challenge: {
        id: weeklyChallenge.id,
        title: weeklyChallenge.title,
        description: weeklyChallenge.description,
        category: weeklyChallenge.category,
        difficulty: weeklyChallenge.difficulty,
        points: weeklyChallenge.points,
        requirements: weeklyChallenge.requirements,
      },
      progress,
      isCompleted: !!userCompletion,
      weekNumber,
      year,
    });
  } catch (error) {
    console.error('Get weekly challenge error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weekly challenge' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
