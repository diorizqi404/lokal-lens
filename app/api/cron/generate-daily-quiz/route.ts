import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { GoogleGenAI } from '@google/genai';

const prisma = new PrismaClient();

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

interface QuizQuestion {
  question: string;
  needsImage: boolean;
  imageQuery?: string;
  explanation: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

interface GeneratedQuiz {
  title: string;
  description: string;
  difficulty: string;
  questions: QuizQuestion[];
}

// Fungsi untuk mencari gambar menggunakan SerpAPI
async function searchImage(query: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://serpapi.com/search.json?engine=google_images&q=${encodeURIComponent(
        query
      )}&api_key=${process.env.SERPAPI_KEY}`
    );

    const data = await response.json();
    const images = data?.images_results;

    if (!Array.isArray(images) || images.length === 0) return null;

    // Ambil maksimal 5 kandidat
    const candidates = images
      .map((img: any) => img.original || img.thumbnail || img.source || null)
      .filter((url: string | null) => !!url);

    if (candidates.length === 0) return null;

    // Filter URL yang mengandung ?url= (ini yang bikin error Next.js)
    const safeCandidates = candidates.filter(
      (url: string) => !url.includes("url=")
    );

    let finalUrl = safeCandidates[0] || candidates[0]; // fallback

    // Bersihkan query berbahaya
    try {
      const parsed = new URL(finalUrl);
      finalUrl = parsed.origin + parsed.pathname; // hapus semua query
    } catch {}

    return finalUrl;
  } catch (err) {
    console.error("Error searching image:", err);
    return null;
  }
}

// Fungsi untuk generate quiz menggunakan Gemini berdasarkan kategori
async function generateQuizWithGemini(categoryName: string, categorySlug: string): Promise<GeneratedQuiz> {
  const prompt = `Generate a quiz about "${categoryName}" (Indonesian culture category: ${categorySlug}) with exactly 5 questions.
  
IMPORTANT: Respond with ONLY valid JSON, no other text before or after.

Create questions specifically about ${categoryName} in Indonesian culture. For example:
- If category is "Alat Musik": focus on traditional musical instruments
- If category is "Tarian": focus on traditional dances
- If category is "Arsitektur": focus on traditional architecture and buildings
- If category is "Pakaian": focus on traditional clothing and textiles
- If category is "Makanan": focus on traditional food and cuisine
- And so on based on the category theme

Format your response as a JSON object with this exact structure:
{
  "title": "Quiz title in Indonesian related to ${categoryName}",
  "description": "Brief description in Indonesian about ${categoryName}",
  "difficulty": "easy" or "medium" or "hard",
  "questions": [
    {
      "question": "Question text in Indonesian about ${categoryName}",
      "needsImage": true or false,
      "imageQuery": "search query for image in Indonesian or English (if needsImage is true)",
      "explanation": "Detailed explanation in Indonesian",
      "options": [
        {"text": "Option A", "isCorrect": false},
        {"text": "Option B", "isCorrect": true},
        {"text": "Option C", "isCorrect": false},
        {"text": "Option D", "isCorrect": false}
      ]
    }
  ]
}

Requirements:
- Exactly 5 questions
- Each question must have exactly 4 options
- Only one correct answer per question
- Set needsImage to true for 2-3 questions that would benefit from visual aids
- For questions with needsImage=true, provide specific imageQuery
- Make questions engaging and educational about ${categoryName}
- Use proper Indonesian language
- Questions should be diverse within the ${categoryName} category`;

  const result = await genAI.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt
  });

  const text: any = await result.text;

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const quizData: GeneratedQuiz = JSON.parse(cleaned);

  return quizData;
}

// Fungsi untuk generate quiz untuk satu kategori
async function generateQuizForCategory(category: any) {
  console.log(`Generating quiz for category: ${category.name}`);

  // 1. Hapus quiz lama untuk kategori ini beserta relasi
  const oldQuizzes = await prisma.quiz.findMany({
    where: { category_id: category.id },
    select: { id: true },
  });

  if (oldQuizzes.length > 0) {
    const oldQuizIds = oldQuizzes.map(q => q.id);
    
    // Get all question IDs first
    const oldQuestions = await prisma.quizQuestion.findMany({
      where: { quiz_id: { in: oldQuizIds } },
      select: { id: true },
    });
    const oldQuestionIds = oldQuestions.map(q => q.id);

    if (oldQuestionIds.length > 0) {
      // Hapus quiz_options
      await prisma.quizOption.deleteMany({
        where: { question_id: { in: oldQuestionIds } },
      });
    }
    
    // Hapus quiz_questions
    await prisma.quizQuestion.deleteMany({
      where: { quiz_id: { in: oldQuizIds } },
    });
    
    // Hapus attempts
    await prisma.quizAttempt.deleteMany({
      where: { quiz_id: { in: oldQuizIds } },
    });
    
    // Hapus quiz
    await prisma.quiz.deleteMany({
      where: { id: { in: oldQuizIds } },
    });
    
    console.log(`Deleted ${oldQuizzes.length} old quiz(zes) for ${category.name}`);
  }

  // 2. Generate quiz baru dengan Gemini
  console.log(`Generating new quiz with Gemini for ${category.name}...`);
  const generatedQuiz = await generateQuizWithGemini(category.name, category.slug);

  // 3. Cari thumbnail untuk quiz dari SerpAPI
  console.log(`Searching thumbnail for quiz about ${category.name}...`);
  const thumbnailQuery = `${category.name} budaya Indonesia`;
  const thumbnailUrl = await searchImage(thumbnailQuery);
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 4. Buat slug unik dengan tanggal
  const today = new Date().toISOString().split('T')[0];
  const slug = `${category.slug}-${today}`;

  // 5. Buat quiz baru
  const newQuiz = await prisma.quiz.create({
    data: {
      title: generatedQuiz.title,
      slug: slug,
      description: generatedQuiz.description,
      thumbnail: thumbnailUrl,
      category_id: category.id,
      difficulty: generatedQuiz.difficulty as 'easy' | 'medium' | 'hard',
      total_questions: 5,
      status: 'published',
    },
  });

  console.log(`Created quiz: ${newQuiz.title} with thumbnail`);

  // 5. Buat pertanyaan dengan gambar (jika diperlukan)
  for (let i = 0; i < generatedQuiz.questions.length; i++) {
    const q = generatedQuiz.questions[i];
    
    let imageUrl: string | null = null;
    if (q.needsImage && q.imageQuery) {
      console.log(`Searching image for: ${q.imageQuery}`);
      imageUrl = await searchImage(q.imageQuery);
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const question = await prisma.quizQuestion.create({
      data: {
        quiz_id: newQuiz.id,
        question: q.question,
        image_url: imageUrl,
        explanation: q.explanation,
        order_number: i + 1,
        points: 10,
      },
    });

    // 6. Buat opsi jawaban
    for (let j = 0; j < q.options.length; j++) {
      await prisma.quizOption.create({
        data: {
          question_id: question.id,
          option_text: q.options[j].text,
          is_correct: q.options[j].isCorrect,
          order_number: j + 1,
        },
      });
    }
  }

  return {
    category_name: category.name,
    quiz_id: newQuiz.id,
    quiz_title: newQuiz.title,
    total_questions: generatedQuiz.questions.length,
  };
}

// POST /api/cron/generate-daily-quiz
export async function POST(request: NextRequest) {
  try {
    console.log('Starting daily random quiz generation...');

    // 1. Ambil semua kategori
    const categories = await prisma.category.findMany({
      select: { id: true, name: true, slug: true },
    });

    if (categories.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No categories found. Please add categories first.' },
        { status: 404 }
      );
    }

    console.log(`Found ${categories.length} categories`);

    // 2. Acak kategori dan ambil 5
    const shuffled = categories.sort(() => Math.random() - 0.5);
    const selectedCategories = shuffled.slice(5);

    console.log("Selected categories:", selectedCategories.map(c => c.name));

    // 3. Loop hanya 5 kategori
    const results = [];
    const errors = [];

    for (const category of selectedCategories) {
      try {
        const result = await generateQuizForCategory(category);
        results.push(result);

        // Delay untuk menghindari rate limit
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (err) {
        console.error(`Error generating quiz for ${category.name}:`, err);
        errors.push({
          category: category.name,
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    }

    console.log('Random quiz generation completed');

    return NextResponse.json({
      success: true,
      message: `Generated ${results.length} random quizzes successfully`,
      data: {
        selected_categories: selectedCategories,
        results,
        errors: errors.length ? errors : undefined,
      },
    });

  } catch (error) {
    console.error('Error in quiz generation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate quizzes', details: `${error}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// GET endpoint untuk testing
export async function GET() {
  return NextResponse.json({
    message: 'Use POST method to generate daily quizzes',
    note: 'This will generate quizzes for ALL categories',
  });
}