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
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          long_description: true,
          thumbnail: true,
          category_id: true,
          date_start: true,
          date_end: true,
          time_start: true,
          time_end: true,
          location_name: true,
          location_city: true,
          location_province: true,
          location_address: true,
          latitude: true,
          longitude: true,
          map_embed_url: true,
          price: true,
          status: true,
          organizer: true,
          contact_email: true,
          contact_phone: true,
          website_url: true,
          views: true,
          created_at: true,
          updated_at: true,
          category_rel: {
            select: {
              id: true,
              name: true,
              slug: true,
              icon: true
            }
          },
          galleries: {
            orderBy: {
              order_number: 'asc'
            }
          },
          performers: {
            orderBy: {
              order_number: 'asc'
            }
          }
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
        category_id: category_id ? parseInt(category_id) : null,
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
