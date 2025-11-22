import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// GET - Get event by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const event = await prisma.event.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        category_rel: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true
          }
        },
        performers: { orderBy: { order_number: 'asc' } },
        galleries: { orderBy: { order_number: 'asc' } }
      }
    });
    
    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: event
    });
  } catch (error: any) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update event
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
      description,
      long_description,
      thumbnail,
      date_start,
      date_end,
      time_start,
      time_end,
      location_name,
      location_city,
      location_province,
      location_address,
      latitude,
      longitude,
      map_embed_url,
      price,
      status,
      category_id,
      organizer,
      contact_email,
      contact_phone,
      website_url,
      performers,
      galleries
    } = body;
    
    const existingEvent = await prisma.event.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!existingEvent) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Check slug
    if (slug && slug !== existingEvent.slug) {
      const slugTaken = await prisma.event.findUnique({
        where: { slug }
      });
      
      if (slugTaken) {
        return NextResponse.json(
          { success: false, error: 'Slug already exists' },
          { status: 400 }
        );
      }
    }
    
    // Delete existing performers and galleries if updating
    if (performers) {
      await prisma.eventPerformer.deleteMany({
        where: { event_id: parseInt(params.id) }
      });
    }
    
    if (galleries) {
      await prisma.eventGallery.deleteMany({
        where: { event_id: parseInt(params.id) }
      });
    }
    
    const event = await prisma.event.update({
      where: { id: parseInt(params.id) },
      data: {
        title,
        slug,
        description,
        long_description,
        thumbnail,
        category_id: category_id ? parseInt(category_id) : undefined,
        date_start: date_start ? new Date(date_start) : undefined,
        date_end: date_end ? new Date(date_end) : undefined,
        time_start,
        time_end,
        location_name,
        location_city,
        location_province,
        location_address,
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
        map_embed_url,
        price,
        status,
        organizer,
        contact_email,
        contact_phone,
        website_url,
        performers: performers ? {
          create: performers.map((p: any, index: number) => ({
            name: p.name,
            title: p.title,
            description: p.description,
            image_url: p.image_url,
            order_number: p.order_number || index
          }))
        } : undefined,
        galleries: galleries ? {
          create: galleries.map((g: any, index: number) => ({
            image_url: g.image_url,
            alt_text: g.alt_text || title,
            order_number: g.order_number || index
          }))
        } : undefined
      },
      include: {
        category_rel: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true
          }
        },
        performers: true,
        galleries: true
      }
    });
    
    return NextResponse.json({
      success: true,
      data: event,
      message: 'Event updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete event
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
    
    const event = await prisma.event.findUnique({
      where: { id: parseInt(params.id) }
    });
    
    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }
    
    await prisma.event.delete({
      where: { id: parseInt(params.id) }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
