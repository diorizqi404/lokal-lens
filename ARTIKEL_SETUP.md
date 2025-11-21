# Artikel Feature - Dynamic Implementation

## Overview
Halaman artikel telah berhasil didinamiskan dengan integrasi API lengkap dan animasi Framer Motion untuk pengalaman pengguna yang interaktif.

## Fitur yang Diimplementasikan

### 1. Halaman List Artikel (`/artikel`)

#### Components:
- **HeroSection**: Menampilkan 1 artikel highlight dengan animasi fade-in dan hover effects
- **SearchSection**: 
  - Input pencarian dengan debounce 500ms
  - Filter kategori: Semua, Cerita Budaya, Tokoh Inspiratif, Event Nasional, Upaya UNESCO
  - Terintegrasi dengan URL search params untuk bookmarking
- **ArticleGridSection**:
  - Grid 3 kolom (responsive: 1 kolom mobile, 2 tablet, 3 desktop)
  - Animasi stagger untuk setiap card artikel
  - Hover effect dengan scale dan shadow
  - Loading skeleton saat fetching
  - Empty state jika tidak ada artikel
- **PaginationSection**:
  - Dinamis berdasarkan total pages dari API
  - Smart pagination (tampilkan 1, current ± 1, last page dengan ellipsis)
  - Hide jika hanya 1 halaman

#### URL Params:
```
/artikel?page=2&category=Cerita%20Budaya&search=batik
```

#### API Integration:
```typescript
GET /api/articles?page=1&limit=9&category=Cerita+Budaya&search=batik&highlight=true
```

Response:
```json
{
  "articles": [...],
  "pagination": {
    "page": 1,
    "limit": 9,
    "total": 27,
    "totalPages": 3
  }
}
```

### 2. Halaman Detail Artikel (`/artikel/[slug]`)

#### Components:
- **ArticleContent**:
  - Dynamic header dengan category badge, title, author, date, read_time
  - Featured image dengan loading animation
  - Content rendered dari HTML (dangerouslySetInnerHTML)
  - Animasi cascade untuk setiap elemen (delays: 0.1s - 0.6s)

- **ArticleDiscussion**:
  - Display comments dengan nested replies
  - Avatar fallback (initial huruf nama)
  - Time ago formatter (Baru saja, X menit lalu, X jam lalu, X hari lalu)
  - Comment form dengan authentication check
  - Real-time update count setelah post
  - Framer Motion stagger animations untuk list komentar
  - Disabled state saat submitting

- **RelatedArticles**:
  - 3 artikel terkait (same category, exclude current)
  - Hover animation (y: -8px)
  - Image hover scale effect
  - Link to detail page

#### API Integration:
```typescript
// Get article detail
GET /api/articles/[slug]

Response:
{
  "article": {
    id, title, slug, content, category, featured_image,
    read_time, views, published_at,
    author: { full_name, profile: { avatar, bio } },
    comments: [ /* top-level with nested replies */ ],
    _count: { comments, bookmarks }
  },
  "relatedArticles": [ /* 3 articles */ ]
}

// Post comment
POST /api/articles/comments
Body: { article_id, content, parent_id? }
```

## Framer Motion Animations

### HeroSection:
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
whileHover={{ scale: 1.05 }}
```

### ArticleGridSection:
```typescript
// Container
variants={{
  visible: { transition: { staggerChildren: 0.1 } }
}}

// Cards
variants={{
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}}
whileHover={{ y: -8 }}
```

### ArticleContent:
```typescript
// Sequential animations
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, delay: 0.1 }} // increasing delays
```

### ArticleDiscussion:
```typescript
// Comments stagger
variants={{
  visible: { transition: { staggerChildren: 0.1 } }
}}

// Individual comments
variants={{
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
}}
```

## State Management

### URL-Based State (Artikel List):
- Page number
- Category filter
- Search query

Benefits:
- SEO friendly
- Bookmarkable
- Shareable
- Browser back/forward support

### Local State (Detail Page):
- Comments array (for real-time updates)
- Comment text input
- Submission loading state

## Utilities

### Category Colors:
```typescript
const colors = {
  'Cerita Budaya': '#4DB6AC',
  'Tokoh Inspiratif': '#E57373',
  'Event Nasional': '#4DB6AC',
  'Upaya UNESCO': '#C1A36F',
}
```

### Date Formatting:
```typescript
formatDate('2024-05-12') // "12 Mei 2024"
getTimeAgo('2024-05-12T10:00:00') // "2 hari lalu"
```

## Next.js 15 Compatibility

Fixed params handling in dynamic routes:
```typescript
// Before (Next.js 14)
{ params }: { params: { slug: string } }

// After (Next.js 15)
{ params }: { params: Promise<{ slug: string }> }
const { slug } = await params;
```

Applied to:
- `/api/articles/[slug]/route.ts`

## Database Schema

### Article Model:
```prisma
model Article {
  id              Int      @id @default(autoincrement())
  title           String
  slug            String   @unique
  excerpt         String
  content         String   @db.Text
  category        String
  tags            String?
  province        String?
  featured_image  String
  read_time       Int
  views           Int      @default(0)
  is_highlight    Boolean  @default(false)
  published_at    DateTime @default(now())
  
  author_id       Int
  author          User     @relation(fields: [author_id], references: [id])
  
  comments        ArticleComment[]
  bookmarks       UserArticleBookmark[]
}
```

### ArticleComment Model:
```prisma
model ArticleComment {
  id         Int      @id @default(autoincrement())
  article_id Int
  user_id    Int
  content    String   @db.Text
  parent_id  Int?     // For nested replies
  created_at DateTime @default(now())
  
  article    Article  @relation(fields: [article_id], references: [id])
  user       User     @relation(fields: [user_id], references: [id])
  parent     ArticleComment?  @relation("CommentReplies", fields: [parent_id], references: [id])
  replies    ArticleComment[] @relation("CommentReplies")
}
```

## Features Summary

✅ **List Articles**:
- Infinite articles with pagination
- Search by keyword (title, excerpt, content)
- Filter by category
- Highlight article in hero
- URL-based state management
- Loading skeletons
- Empty states

✅ **Article Detail**:
- Full article content with HTML rendering
- Category badge with dynamic colors
- Author info with avatar
- View count tracking (auto-increment)
- Related articles (same category)

✅ **Comments System**:
- Top-level comments
- Nested replies
- Real-time comment posting
- Authentication required
- Avatar with fallback
- Time ago display

✅ **Animations**:
- Framer Motion throughout
- Stagger animations for lists
- Hover effects (scale, lift, shadow)
- Sequential reveals
- Loading states

✅ **Responsive Design**:
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Flexible grid layouts
- Touch-friendly interactions

## Performance Considerations

1. **Image Optimization**: Using Next.js Image component with `fill` and `priority`
2. **Debounced Search**: 500ms delay prevents excessive API calls
3. **Pagination**: Limit 9 articles per page
4. **Lazy Loading**: Components render only when in viewport (whileInView)
5. **View Increment**: Done server-side to avoid client manipulation

## Testing Checklist

- [ ] Test pagination navigation (prev, next, direct page)
- [ ] Test category filtering (all categories)
- [ ] Test search with various keywords
- [ ] Test URL state persistence (refresh, back button)
- [ ] Test article detail page with different slugs
- [ ] Test comment posting (logged in vs logged out)
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test animations (smooth, no jank)
- [ ] Test empty states (no articles, no comments)
- [ ] Test error states (404 article, API failures)

## Known Lint Warnings (Non-Critical)

These are Tailwind CSS optimization suggestions, not errors:
- `flex-shrink-0` → `shrink-0`
- `aspect-[16/9]` → `aspect-video`
- `max-w-[896px]` → `max-w-4xl`
- `font-[family-name:var(--font-x)]` → custom utility class

These do not affect functionality and can be optimized later.

## Future Enhancements

- [ ] Comment voting system (upvote/downvote)
- [ ] Bookmark articles
- [ ] Share to social media
- [ ] Reading progress indicator
- [ ] Estimated read time calculator
- [ ] Rich text editor for comments
- [ ] Comment moderation (admin)
- [ ] Article recommendations (ML-based)
- [ ] Full-text search with highlights
- [ ] Export article to PDF
