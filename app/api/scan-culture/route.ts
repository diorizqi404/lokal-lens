import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        { error: "Gambar tidak ditemukan" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key tidak ditemukan" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Analisis objek budaya Indonesia dalam gambar ini dengan detail dan spesifik. Identifikasi JENIS atau VARIAN SPESIFIK dari objek budaya tersebut, jangan hanya kategori umumnya dan menggunakan bahasa indonesia.

CONTOH ANALISIS YANG BENAR:
- Untuk batik: Identifikasi motifnya seperti "Batik Parang Rusak", "Batik Kawung", "Batik Mega Mendung", "Batik Truntum", dll.
- Untuk wayang: Identifikasi karakternya seperti "Wayang Kulit Arjuna", "Wayang Golek Cepot", dll.
- Untuk keris: Identifikasi jenisnya seperti "Keris Luk 5 Jawa Tengah", "Keris Bali Pamor Ngulit Semangka", dll.
- Untuk tari: Identifikasi tariannya seperti "Tari Kecak Bali", "Tari Saman Aceh", "Tari Jaipong Jawa Barat", dll.
- Untuk alat musik: Identifikasi spesifiknya seperti "Gamelan Jawa Gong Ageng", "Angklung Buhun", "Sasando Rote", dll.
- Untuk senjata tradisional: Identifikasi jenisnya seperti "Mandau Dayak Kalimantan", "Badik Bugis Makassar", dll.
- Untuk rumah adat: Identifikasi spesifiknya seperti "Rumah Gadang Minangkabau", "Tongkonan Toraja", dll.
- Untuk pakaian adat: Identifikasi lengkapnya seperti "Kebaya Encim Betawi", "Ulos Batak Toba Ragi Hotang", dll.

Berikan informasi dalam format JSON berikut (WAJIB menggunakan format ini):

{
  "name": "Nama SPESIFIK objek budaya dengan jenis/motif/varian yang jelas",
  "location": "Daerah/Provinsi asal spesifik, Indonesia",
  "accuracy": "Persentase akurasi (contoh: 92%)",
  "description": "Deskripsi detail tentang objek budaya ini, termasuk ciri khas, makna filosofis, dan keunikan dari jenis/motif spesifik ini (minimal 3-4 kalimat yang informatif)",
  "rarity": "Sangat Langka / Langka / Umum",
  "unesco": "Terdaftar / Tidak Terdaftar",
  "image": "Gambar referensi objek budaya ini dalam format URL string"
}

PENTING: 
- Untuk field "image", SELALU berikan string kosong (""). Jangan isi dengan teks placeholder atau deskripsi.
- Untuk field "name", WAJIB menyebutkan jenis/motif/varian spesifik, JANGAN hanya kategori umum (contoh: SALAH "Batik", BENAR "Batik Parang Rusak")
- Untuk field "description", jelaskan detail ciri khas dari jenis/motif spesifik tersebut, bukan hanya penjelasan umum
- Jika tidak bisa mengidentifikasi jenis spesifik dengan pasti, sebutkan beberapa kemungkinan jenis yang mirip
- Jika bukan objek budaya Indonesia, tetap berikan format JSON dengan informasi bahwa objek tidak dikenali sebagai budaya Indonesia.`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: image,
              },
            },
          ],
        },
      ],
    });

    const textResponse = result.text || "";

    // Extract JSON from response
    let scanResult;
    try {
      // Try to find JSON in the response
      const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        scanResult = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback if no JSON found
        scanResult = {
          name: "Objek Tidak Dikenali",
          location: "Tidak Diketahui",
          accuracy: "0%",
          description: textResponse || "Tidak dapat mengidentifikasi objek budaya.",
          rarity: "Tidak Diketahui",
          unesco: "Tidak Terdaftar",
          image: "",
        };
      }
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      scanResult = {
        name: "Objek Tidak Dikenali",
        location: "Tidak Diketahui",
        accuracy: "0%",
        description: textResponse || "Tidak dapat mengidentifikasi objek budaya.",
        rarity: "Tidak Diketahui",
        unesco: "Tidak Terdaftar",
        image: "",
      };
    }

    return NextResponse.json(scanResult);
  } catch (error) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        detail: String(error),
      },
      { status: 500 }
    );
  }
}
