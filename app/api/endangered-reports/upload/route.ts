import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { randomBytes } from "crypto";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "video/mp4",
      "video/webm",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Invalid file type" },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "File size exceeds 10MB" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split(".").pop();
    const filename = `${randomBytes(16).toString("hex")}.${ext}`;

    // Upload file to Vercel Blob (instead of writing to disk)
    const blob = await put(`reports/${filename}`, file, {
      access: "public", // URL langsung bisa dipakai
    });

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      fileUrl: blob.url, // URL public
      pathname: blob.pathname,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { success: false, message: "Failed to upload file" },
      { status: 500 }
    );
  }
}
