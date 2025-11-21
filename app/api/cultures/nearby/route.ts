import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Haversine formula untuk menghitung jarak antara dua koordinat
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius bumi dalam km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lng = parseFloat(searchParams.get('lng') || '0');
    const radius = parseFloat(searchParams.get('radius') || '1000'); // Default 1000km
    const category = searchParams.get('category') || '';

    if (!lat || !lng) {
      return NextResponse.json(
        { error: 'Latitude dan longitude diperlukan' },
        { status: 400 }
      );
    }

    // Ambil semua budaya dengan koordinat
    const cultures = await prisma.culture.findMany({
      where: {
        AND: [
          { lat: { not: null } },
          { long: { not: null } },
          { status: 'published' },
          category ? { category } : {},
        ],
      },
      include: {
        images: {
          where: {
            is_primary: true,
          },
          take: 1,
        },
      },
    });

    // Filter berdasarkan jarak
    const nearbyCultures = cultures
      .map((culture: any) => {
        const distance = calculateDistance(
          lat,
          lng,
          culture.lat!,
          culture.long!
        );

        return {
          id: culture.id,
          name: culture.name,
          slug: culture.slug,
          subtitle: culture.subtitle,
          description: culture.description,
          category: culture.category,
          location: culture.location,
          province: culture.province,
          city: culture.city,
          lat: culture.lat,
          long: culture.long,
          thumbnail: culture.thumbnail,
          is_endangered: culture.is_endangered,
          distance: Math.round(distance * 10) / 10, // Bulatkan ke 1 desimal
          image: culture.images[0]?.image_url || culture.thumbnail,
        };
      })
      .filter((culture: any) => culture.distance <= radius)
      .sort((a: any, b: any) => a.distance - b.distance);

    return NextResponse.json({
      success: true,
      data: nearbyCultures,
      count: nearbyCultures.length,
    });
  } catch (error) {
    console.error('Error fetching nearby cultures:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data budaya' },
      { status: 500 }
    );
  }
}
