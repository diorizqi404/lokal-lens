import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// GET - Get article by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        author: {
          select: {
            id: true,
            full_name: true,
            email: true
          }
        }
      }
    });
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: article
    });
  } catch (error: any) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update article
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      category,
      tags,
      province,
      read_time,
      is_highlight
    } = body;
    
    const existingArticle = await prisma.article.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!existingArticle) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }
    
    // Check if slug is taken by another article
    if (slug && slug !== existingArticle.slug) {
      const slugTaken = await prisma.article.findUnique({
        where: { slug }
      });
      
      if (slugTaken) {
        return NextResponse.json(
          { success: false, error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }
    
    const article = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: {
        title,
        slug,
        excerpt,
        content,
        featured_image,
        category,
        tags,
        province,
        read_time,
        is_highlight
      },
      include: {
        author: {
          select: {
            id: true,
            full_name: true,
            email: true
          }
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      data: article,
      message: 'Article updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating article:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete article
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    if (!decoded || role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin only' },
        { status: 403 }
      );
    }
    
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found' },
        { status: 404 }
      );
    }
    
    await prisma.article.delete({
      where: { id: parseInt(params.id) }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting article:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
