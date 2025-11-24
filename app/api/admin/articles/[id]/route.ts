import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// GET - Get article by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
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
    
    // Build update payload dynamically. Prisma model uses `category_rel`
    // relation rather than a scalar `category_id`, so connect/disconnect
    // the relation when a category is provided.
    const updatePayload: any = {};
    if (title !== undefined) updatePayload.title = title;
    if (slug !== undefined) updatePayload.slug = slug;
    if (excerpt !== undefined) updatePayload.excerpt = excerpt;
    if (content !== undefined) updatePayload.content = content;
    if (featured_image !== undefined) updatePayload.featured_image = featured_image;
    if (tags !== undefined) updatePayload.tags = tags;
    if (province !== undefined) updatePayload.province = province;
    if (read_time !== undefined) updatePayload.read_time = read_time;
    if (is_highlight !== undefined) updatePayload.is_highlight = is_highlight;

    // Handle category relation: connect if provided, disconnect if null/empty string
    if (typeof category_id !== 'undefined') {
      if (category_id === null || category_id === '' || category_id === 0) {
        updatePayload.category_rel = { disconnect: true };
      } else {
        updatePayload.category_rel = { connect: { id: Number(category_id) } };
      }
    }

    const article = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: updatePayload,
      include: {
        author: {
          select: {
            id: true,
            full_name: true,
            email: true
          }
        },
        category_rel: true
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
