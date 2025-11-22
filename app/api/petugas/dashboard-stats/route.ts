import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
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
    if (!decoded || role !== 'petugas') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Petugas only' },
        { status: 403 }
      );
    }

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Endangered Reports Statistics
    const totalReports = await prisma.endangeredReport.count();
    const pendingReports = await prisma.endangeredReport.count({
      where: { status: 'pending' }
    });
    const approvedReports = await prisma.endangeredReport.count({
      where: { status: 'approved' }
    });
    const rejectedReports = await prisma.endangeredReport.count({
      where: { status: 'rejected' }
    });

    // Weekly Statistics
    const weeklyApproved = await prisma.endangeredReport.count({
      where: { 
        status: 'approved',
        reviewed_at: { gte: sevenDaysAgo }
      }
    });
    const weeklyRejected = await prisma.endangeredReport.count({
      where: { 
        status: 'rejected',
        reviewed_at: { gte: sevenDaysAgo }
      }
    });
    const weeklyPending = await prisma.endangeredReport.count({
      where: { 
        status: 'pending',
        created_at: { gte: sevenDaysAgo }
      }
    });

    // Content Verification Statistics
    const pendingCultures = await prisma.culture.count({
      where: { status: 'draft' }
    });
    const pendingArticles = await prisma.article.count({
      where: { status: 'draft' }
    });
    const pendingQuizzes = await prisma.quiz.count({
      where: { status: 'draft' }
    });
    const totalPendingContent = pendingCultures + pendingArticles + pendingQuizzes;

    // Recent Reports (last 10)
    const recentReports = await prisma.endangeredReport.findMany({
      take: 10,
      orderBy: { created_at: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            full_name: true,
            email: true
          }
        }
      }
    });

    // Reports by Province
    const reportsByProvince = await prisma.endangeredReport.groupBy({
      by: ['province'],
      _count: true,
      where: {
        province: { not: null }
      },
      orderBy: {
        _count: {
          province: 'desc'
        }
      },
      take: 10
    });

    // Reports by Threat Type
    const reportsByThreat = await prisma.endangeredReport.groupBy({
      by: ['threat_type'],
      _count: true,
      orderBy: {
        _count: {
          threat_type: 'desc'
        }
      },
      take: 5
    });

    // Monthly trend (last 6 months)
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      
      const reports = await prisma.endangeredReport.count({
        where: {
          created_at: {
            gte: monthStart,
            lte: monthEnd
          }
        }
      });

      const approved = await prisma.endangeredReport.count({
        where: {
          status: 'approved',
          reviewed_at: {
            gte: monthStart,
            lte: monthEnd
          }
        }
      });

      const rejected = await prisma.endangeredReport.count({
        where: {
          status: 'rejected',
          reviewed_at: {
            gte: monthStart,
            lte: monthEnd
          }
        }
      });

      monthlyData.push({
        month: monthStart.toLocaleString('id-ID', { month: 'short' }),
        reports,
        approved,
        rejected
      });
    }

    // Response Time (average time to review)
    const reviewedReports = await prisma.endangeredReport.findMany({
      where: {
        reviewed_at: { not: null },
        created_at: { gte: thirtyDaysAgo }
      },
      select: {
        created_at: true,
        reviewed_at: true
      }
    });

    let totalResponseTime = 0;
    reviewedReports.forEach(report => {
      if (report.reviewed_at) {
        const diff = report.reviewed_at.getTime() - report.created_at.getTime();
        totalResponseTime += diff;
      }
    });

    const avgResponseTimeHours = reviewedReports.length > 0 
      ? Math.round((totalResponseTime / reviewedReports.length) / (1000 * 60 * 60))
      : 0;

    // Performance this week vs last week
    const lastWeekStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const lastWeekEnd = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const thisWeekReviewed = await prisma.endangeredReport.count({
      where: {
        reviewed_at: { gte: sevenDaysAgo }
      }
    });

    const lastWeekReviewed = await prisma.endangeredReport.count({
      where: {
        reviewed_at: { 
          gte: lastWeekStart,
          lt: lastWeekEnd
        }
      }
    });

    const performanceChange = lastWeekReviewed === 0 ? 100 : 
      Math.round(((thisWeekReviewed - lastWeekReviewed) / lastWeekReviewed) * 100);

    return NextResponse.json({
      success: true,
      data: {
        totalReports,
        pendingReports,
        approvedReports,
        rejectedReports,
        weeklyStats: {
          approved: weeklyApproved,
          rejected: weeklyRejected,
          pending: weeklyPending
        },
        contentVerification: {
          cultures: pendingCultures,
          articles: pendingArticles,
          quizzes: pendingQuizzes,
          total: totalPendingContent
        },
        recentReports: recentReports.map(report => ({
          id: report.id,
          cultureName: report.culture_name,
          threatType: report.threat_type,
          location: report.location,
          province: report.province,
          status: report.status,
          isAnonymous: report.is_anonymous,
          reporterName: report.reporter_name || 'Anonymous',
          createdAt: report.created_at,
          user: report.user
        })),
        reportsByProvince: reportsByProvince.map(item => ({
          province: item.province || 'Unknown',
          count: item._count
        })),
        reportsByThreat: reportsByThreat.map(item => ({
          threatType: item.threat_type,
          count: item._count
        })),
        monthlyTrend: monthlyData,
        avgResponseTimeHours,
        performanceChange,
        thisWeekReviewed,
        lastWeekReviewed
      }
    });
  } catch (error: any) {
    console.error('Error fetching petugas dashboard stats:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
