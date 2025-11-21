import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const highlight = searchParams.get('highlight');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (category && category !== 'semua') {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (highlight === 'true') {
      where.is_highlight = true;
    }

    // Get articles with pagination
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              full_name: true,
              profile: {
                select: {
                  avatar: true,
                },
              },
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
        orderBy: {
          published_at: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.article.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Get articles error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
