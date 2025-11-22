import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Params = Promise<{ slug: string }>;

/**
 * GET /api/categories/[slug]
 * Get single category by slug
 */
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const { slug } = await params;

    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: {
            cultures: true,
            articles: true,
            quizzes: true,
            events: true,
            scan_histories: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: category,
    });
  } catch (error: unknown) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch category',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/categories/[slug]
 * Update category (admin only)
 */
export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const { name, slug: newSlug, description, icon, type } = body;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });

    if (!existingCategory) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category not found',
        },
        { status: 404 }
      );
    }

    // If slug is being changed, check if new slug already exists
    if (newSlug && newSlug !== slug) {
      const slugExists = await prisma.category.findUnique({
        where: { slug: newSlug },
      });

      if (slugExists) {
        return NextResponse.json(
          {
            success: false,
            error: 'Slug already in use',
            message: `Category with slug "${newSlug}" already exists`,
          },
          { status: 409 }
        );
      }
    }

    const updatedCategory = await prisma.category.update({
      where: { slug },
      data: {
        ...(name && { name }),
        ...(newSlug && { slug: newSlug }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
        ...(type && { type }),
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedCategory,
      message: 'Category updated successfully',
    });
  } catch (error: unknown) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update category',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/categories/[slug]
 * Delete category (admin only)
 * Note: This will set category_id to NULL in related records due to onDelete: SetNull
 */
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const { slug } = await params;

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        _count: {
          select: {
            cultures: true,
            articles: true,
            quizzes: true,
            events: true,
            scan_histories: true,
          },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category not found',
        },
        { status: 404 }
      );
    }

    // Optional: Prevent deletion if category is in use
    const totalUsage =
      category._count.cultures +
      category._count.articles +
      category._count.quizzes +
      category._count.events +
      category._count.scan_histories;

    if (totalUsage > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Category in use',
          message: `Cannot delete category. It is used by ${totalUsage} items.`,
          usage: category._count,
        },
        { status: 409 }
      );
    }

    await prisma.category.delete({
      where: { slug },
    });

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error: unknown) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete category',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
