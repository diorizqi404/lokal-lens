import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth/utils';

const prisma = new PrismaClient();

// GET - List all cultures with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const province = searchParams.get('province') || '';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';
    
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { location: { contains: search } }
      ];
    }
    
    if (province) {
      where.province = province;
    }
    
    if (category) {
      where.category = category;
    }
    
    if (status) {
      where.status = status;
    }
    
    const [cultures, total] = await Promise.all([
      prisma.culture.findMany({
        where,
        skip,
        take: limit,
        include: {
          category_rel: true,
          images: {
            orderBy: { display_order: 'asc' }
          }
        },
        orderBy: { created_at: 'desc' }
      }),
      prisma.culture.count({ where })
    ]);
    
    return NextResponse.json({
      success: true,
      data: cultures,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error('Error fetching cultures:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new culture
export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token);
    if (!decoded || (decoded.role !== 'admin' && decoded.role !== 'contributor')) {
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
    
    // Check if slug already exists
    const existingCulture = await prisma.culture.findUnique({
      where: { slug }
    });
    
    if (existingCulture) {
      return NextResponse.json(
        { success: false, error: 'Slug already exists' },
        { status: 400 }
      );
    }
    
    const culture = await prisma.culture.create({
      data: {
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
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        status: status || 'draft',
        is_endangered: is_endangered || false,
        thumbnail,
        map_embed_url,
        images: images ? {
          create: images.map((img: any, index: number) => ({
            image_url: img.image_url,
            alt_text: img.alt_text || name,
            is_primary: img.is_primary || index === 0,
            display_order: img.display_order || index
          }))
        } : undefined
      },
      include: {
        category_rel: true,
        images: true
      }
    });
    
    return NextResponse.json({
      success: true,
      data: culture,
      message: 'Culture created successfully'
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating culture:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
