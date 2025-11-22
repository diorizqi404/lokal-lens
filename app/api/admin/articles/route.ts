import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// GET - List all articles with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const author = searchParams.get('author') || '';
    
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } }
      ];
    }
    
    if (category) {
      where.category = category;
    }
    
    if (author) {
      where.author_id = parseInt(author);
    }
    
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              full_name: true,
              email: true
            }
          },
          category_rel: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        },
        orderBy: { created_at: 'desc' }
      }),
      prisma.article.count({ where })
    ]);
    
    return NextResponse.json({
      success: true,
      data: articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new article
export async function POST(request: NextRequest) {
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
    if (!decoded || (role !== 'admin' && role !== 'contributor')) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featured_image,
      category_id,
      tags,
      province,
      read_time,
      is_highlight,
      status
    } = body;
    
    // Check if slug already exists
    const existingArticle = await prisma.article.findUnique({
      where: { slug }
    });
    
    if (existingArticle) {
      return NextResponse.json(
        { success: false, error: 'Slug already exists' },
        { status: 400 }
      );
    }
    
    const article = await prisma.article.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        featured_image,
        author_id: decoded.userId,
        category_id: category_id || null,
        tags,
        province,
        read_time: read_time || 5,
        is_highlight: is_highlight || false,
        status: status || 'draft'
      },
      include: {
        author: {
          select: {
            id: true,
            full_name: true,
            email: true
          }
        },
        category_rel: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      data: article,
      message: 'Article created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating article:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
