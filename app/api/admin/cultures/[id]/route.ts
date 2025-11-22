import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// GET - Get culture by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const culture = await prisma.culture.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        images: {
          orderBy: { display_order: 'asc' }
        }
      }
    });
    
    if (!culture) {
      return NextResponse.json(
        { success: false, error: 'Culture not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: culture
    });
  } catch (error: any) {
    console.error('Error fetching culture:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update culture
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
      name,
      slug,
      subtitle,
      description,
      long_description,
      meaning,
      category_id,
      location,
      province,
      city,
      latitude,
      longitude,
      status,
      is_endangered,
      thumbnail,
      map_embed_url,
      images
    } = body;
    
    // Check if culture exists
    const existingCulture = await prisma.culture.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!existingCulture) {
      return NextResponse.json(
        { success: false, error: 'Culture not found' },
        { status: 404 }
      );
    }
    
    // Check if slug is taken by another culture
    if (slug && slug !== existingCulture.slug) {
      const slugTaken = await prisma.culture.findUnique({
        where: { slug }
      });
      
      if (slugTaken) {
        return NextResponse.json(
          { success: false, error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }
    
    // Update culture
    const culture = await prisma.culture.update({
      where: { id: parseInt(params.id) },
      data: {
        name,
        slug,
        subtitle,
        description,
        long_description,
        meaning,
        location,
        province,
        city,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        status,
        is_endangered,
        thumbnail,
        map_embed_url
      },
      include: {
        images: true
      }
    });
    
    // Handle images update if provided
    if (images) {
      // Delete existing images
      await prisma.cultureImage.deleteMany({
        where: { culture_id: parseInt(params.id) }
      });
      
      // Create new images
      await prisma.cultureImage.createMany({
        data: images.map((img: any, index: number) => ({
          culture_id: parseInt(params.id),
          image_url: img.image_url,
          alt_text: img.alt_text || name,
          is_primary: img.is_primary || index === 0,
          display_order: img.display_order || index
        }))
      });
    }
    
    return NextResponse.json({
      success: true,
      data: culture,
      message: 'Culture updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating culture:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete culture
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
    
    const culture = await prisma.culture.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!culture) {
      return NextResponse.json(
        { success: false, error: 'Culture not found' },
        { status: 404 }
      );
    }
    
    await prisma.culture.delete({
      where: { id: parseInt(params.id) }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Culture deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting culture:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
