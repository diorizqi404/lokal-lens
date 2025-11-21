# Setup Database untuk Fitur Jelajahi Budaya

## 1. Generate Prisma Client

Setelah menambahkan schema baru, jalankan:

```bash
npx prisma generate
```

## 2. Buat Migration

Untuk membuat tabel baru di database:

```bash
npx prisma migrate dev --name add_cultures_tables
```

## 3. Seed Data (Optional)

Untuk menambahkan contoh data budaya, jalankan SQL seed file:

```bash
# Jika menggunakan MySQL CLI
mysql -u your_username -p your_database < prisma/migrations/seed_cultures.sql

# Atau gunakan tool database management seperti phpMyAdmin, MySQL Workbench, dll
```

## 4. Struktur Database

### Tabel `cultures`
Menyimpan informasi utama budaya:
- `id`: Primary key
- `name`: Nama budaya
- `slug`: URL-friendly identifier (unique)
- `subtitle`: Tagline/subtitle budaya
- `description`: Deskripsi singkat
- `long_description`: Deskripsi panjang
- `meaning`: Makna dan filosofi
- `location`: Lokasi lengkap (misal: "Ponorogo, Jawa Timur")
- `province`: Nama provinsi
- `city`: Nama kota/kabupaten
- `latitude` & `longitude`: Koordinat untuk peta dan perhitungan jarak
- `status`: Status budaya (active/inactive/draft)
- `is_endangered`: Boolean, apakah terancam punah
- `thumbnail`: URL gambar utama
- `map_embed_url`: Google Maps embed URL
- `created_at` & `updated_at`: Timestamps

### Tabel `culture_images`
Menyimpan multiple images untuk setiap budaya:
- `id`: Primary key
- `culture_id`: Foreign key ke tabel cultures
- `image_url`: URL gambar
- `alt_text`: Alternative text untuk accessibility
- `is_primary`: Boolean, apakah gambar utama
- `display_order`: Urutan tampilan gambar
- `created_at`: Timestamp

## 5. API Endpoints

### GET `/api/cultures`
Mengambil list budaya dengan pagination

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 8)
- `search` (optional): Pencarian berdasarkan nama/lokasi
- `province` (optional): Filter berdasarkan provinsi
- `status` (default: 'active')

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Reog Ponorogo",
      "slug": "reog-ponorogo",
      "location": "Ponorogo, Jawa Timur",
      "province": "Jawa Timur",
      "city": "Ponorogo",
      "thumbnail": "https://...",
      "is_endangered": true,
      "subtitle": "Tarian Mistis dari Gerbang Timur Jawa"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 8,
    "total": 50,
    "totalPages": 7,
    "hasMore": true
  }
}
```

### GET `/api/cultures/[slug]`
Mengambil detail budaya beserta budaya terdekat

**Response:**
```json
{
  "culture": {
    "id": 1,
    "name": "Reog Ponorogo",
    "slug": "reog-ponorogo",
    "subtitle": "...",
    "description": "...",
    "long_description": "...",
    "meaning": "...",
    "location": "Ponorogo, Jawa Timur",
    "province": "Jawa Timur",
    "city": "Ponorogo",
    "is_endangered": true,
    "map_embed_url": "https://...",
    "latitude": -7.8754,
    "longitude": 111.4625,
    "images": [
      {
        "id": 1,
        "url": "https://...",
        "alt": "Reog Ponorogo",
        "is_primary": true
      }
    ]
  },
  "nearby_cultures": [
    {
      "id": 2,
      "name": "Ketoprak Dor",
      "slug": "ketoprak-dor",
      "location": "Jombang, Jawa Timur",
      "thumbnail": "https://...",
      "distance": 45.2
    }
  ]
}
```

## 6. Cara Mendapatkan Google Maps Embed URL

1. Buka [Google Maps](https://www.google.com/maps)
2. Cari lokasi budaya
3. Klik tombol "Share" atau "Bagikan"
4. Pilih tab "Embed a map" atau "Sematkan peta"
5. Copy iframe src URL
6. Paste ke field `map_embed_url`

Contoh:
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126142.77835087282!2d111.38!3d-7.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x...!2sPonorogo!5e0!3m2!1sen!2sid!4v1234567890123
```

## 7. Fitur

### Halaman Jelajahi (`/jelajahi`)
- ✅ List budaya dengan infinite scroll
- ✅ Pagination dengan tombol "Muat Lebih Banyak"
- ✅ Loading state
- ✅ Error handling
- ✅ Responsive layout (grid masonry style)
- ✅ Badge "Terancam Punah" untuk budaya yang endangered
- ✅ Layout tetap sama, hanya data yang dinamis

### Halaman Detail (`/jelajahi/[slug]`)
- ✅ Detail lengkap budaya
- ✅ Multiple images dengan slider
- ✅ Thumbnail navigation
- ✅ Info lokasi dan status
- ✅ Deskripsi, deskripsi panjang, dan makna filosofi
- ✅ Google Maps embed
- ✅ Budaya terdekat (berdasarkan koordinat atau provinsi yang sama)
- ✅ Distance calculation menggunakan Haversine formula
- ✅ Loading state dan error handling
- ✅ Breadcrumb navigation
- ✅ Layout tetap sama, hanya data yang dinamis

## 8. Tips

- Gunakan gambar dengan aspect ratio yang konsisten untuk tampilan yang rapi
- Koordinat latitude/longitude bisa didapatkan dari Google Maps (klik kanan > "What's here?")
- Untuk budaya terdekat, sistem akan prioritas berdasarkan jarak geografis jika ada koordinat
- Jika tidak ada koordinat, sistem akan menampilkan budaya dari provinsi yang sama
- Maksimal 4 budaya terdekat yang ditampilkan

## 9. Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```
