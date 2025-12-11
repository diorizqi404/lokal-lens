import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/utils';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir, unlink } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: number } | null;

    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('avatar') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB' },
        { status: 400 }
      );
    }

    // Generate filename
    const ext = file.name.split('.').pop();
    const filename = `avatar_${decoded.userId}_${Date.now()}.${ext}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create avatars directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'avatars');
    await mkdir(uploadDir, { recursive: true });

    // Delete old avatar if exists
    const oldProfile = await prisma.profile.findUnique({
      where: { user_id: decoded.userId },
      select: { avatar: true }
    });

    if (oldProfile?.avatar && oldProfile.avatar.startsWith('/uploads/')) {
      try {
        const oldFilePath = path.join(process.cwd(), 'public', oldProfile.avatar);
        await unlink(oldFilePath);
      } catch (error) {
        console.log('Could not delete old avatar:', error);
      }
    }

    // Save file to public/uploads/avatars
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const avatarUrl = `/uploads/avatars/${filename}`;

    // Update user profile in DB
    await prisma.profile.upsert({
      where: { user_id: decoded.userId },
      update: { avatar: avatarUrl },
      create: {
        user_id: decoded.userId,
        avatar: avatarUrl,
      },
    });

    return NextResponse.json({
      message: 'Avatar uploaded successfully',
      avatar: avatarUrl,
    });
  } catch (error) {
    console.error('Avatar upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload avatar' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: number } | null;

    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get current avatar
    const profile = await prisma.profile.findUnique({
      where: { user_id: decoded.userId },
      select: { avatar: true }
    });

    // Delete avatar file if exists
    if (profile?.avatar && profile.avatar.startsWith('/uploads/')) {
      try {
        const filePath = path.join(process.cwd(), 'public', profile.avatar);
        await unlink(filePath);
      } catch (error) {
        console.log('Could not delete avatar file:', error);
      }
    }

    // Remove avatar URL from DB
    await prisma.profile.update({
      where: { user_id: decoded.userId },
      data: { avatar: null },
    });

    return NextResponse.json({
      message: 'Avatar removed successfully',
    });
  } catch (error) {
    console.error('Avatar delete error:', error);
    return NextResponse.json(
      { error: 'Failed to remove avatar' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
