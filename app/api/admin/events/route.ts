import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// GET - List all events
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const province = searchParams.get('province') || '';
    
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { location_name: { contains: search } }
      ];
    }
    
    if (status) {
      where.status = status;
    }
    
    if (province) {
      where.location_province = province;
    }
    
    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        include: {
          performers: true,
          galleries: true
        },
        orderBy: { date_start: 'desc' }
      }),
      prisma.event.count({ where })
    ]);
    
    return NextResponse.json({
      success: true,
      data: events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new event
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token) as any;
    if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'contributor')) {
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
      category,
      organizer,
      contact_email,
      contact_phone,
      website_url,
      performers,
      galleries
    } = body;
    
    // Check if slug already exists
    const existingEvent = await prisma.event.findUnique({
      where: { slug }
    });
    
    if (existingEvent) {
      return NextResponse.json(
        { success: false, error: 'Slug already exists' },
        { status: 400 }
      );
    }
    
    const event = await prisma.event.create({
      data: {
        title,
        slug,
        description,
        long_description,
        thumbnail,
        date_start: new Date(date_start),
        date_end: new Date(date_end),
        time_start,
        time_end,
        location_name,
        location_city,
        location_province,
        location_address,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        map_embed_url,
        price,
        status: status || 'available',
        category,
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
        performers: true,
        galleries: true
      }
    });
    
    return NextResponse.json({
      success: true,
      data: event,
      message: 'Event created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
