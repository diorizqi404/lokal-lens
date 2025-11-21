# Setup Leaflet Maps untuk Peta Budaya

## Leaflet - Open Source Map (100% GRATIS!)

Leaflet adalah library peta open source yang **tidak memerlukan API key** dan **sepenuhnya gratis**. Menggunakan data dari OpenStreetMap.

### Keuntungan Leaflet:
- ✅ **Gratis 100%** - Tidak ada biaya sama sekali
- ✅ **Tidak perlu API key** - Langsung pakai
- ✅ **Open source** - Kode terbuka dan customizable
- ✅ **Ringan** - File size kecil (~39KB)
- ✅ **Mobile friendly** - Touch gestures support
- ✅ **Lengkap** - Markers, popups, custom icons, dll.

## Setup (Sangat Mudah!)

### 1. **Install Package**
```bash
npm install leaflet
npm install --save-dev @types/leaflet
```

### 2. **Import CSS (Sudah Otomatis)**
CSS Leaflet sudah di-import di component, jadi tidak perlu setup tambahan!

### 3. **Restart Server**
```bash
npm run dev
```

**Itu saja!** Tidak perlu API key, tidak perlu registrasi, tidak perlu konfigurasi tambahan! 🎉

## Fitur yang Sudah Diimplementasikan

### 1. **Geolocation Permission**
- Website otomatis meminta izin lokasi user saat halaman dimuat
- Jika ditolak, default ke Jakarta dengan pesan informatif
- User dapat mengaktifkan kembali di pengaturan browser

### 2. **Leaflet Maps Integration**
- Peta interaktif dari OpenStreetMap
- Zoom, pan, dan kontrol peta standar
- Scroll wheel zoom
- Touch gestures untuk mobile
- Attribution OpenStreetMap contributors

### 3. **Culture Markers**
- Custom marker dengan warna sesuai kategori
- Hover effect scale 1.2x
- Klik marker untuk melihat detail
- Popup dengan nama budaya
- Auto pan ke marker yang dipilih

### 4. **User Location Marker**
- Marker biru custom dengan border putih
- Icon lebih besar dari culture markers
- Popup "📍 Lokasi Anda"
- Z-index tinggi (selalu di atas)

### 5. **Search & Filter**
- Search bar overlay di atas peta
- Legend dengan kategori warna
- Filter dari sidebar terintegrasi
- Real-time update markers

### 6. **Culture Card**
- Card ngambang saat marker diklik
- Tampil di desktop (bottom-left)
- Tampil di bawah peta untuk mobile
- Tombol close untuk menutup card

### 7. **Auto Bounds**
- Map otomatis fit untuk menampilkan semua markers
- Termasuk user location dan culture markers
- Padding 50px untuk aesthetic

## Troubleshooting

### Peta Tidak Muncul
- Pastikan package `leaflet` sudah terinstall
- Restart development server: `npm run dev`
- Cek console browser untuk error

### Permission Denied
- Klik icon gembok/info di address bar browser
- Ubah permission "Location" menjadi "Allow"
- Refresh halaman

### Marker Tidak Muncul
- Pastikan ada data budaya dengan koordinat lat/long di database
- Jalankan migration dan seeder jika belum
- Cek console untuk error API

### CSS Tidak Load
- CSS Leaflet sudah di-import otomatis
- Jika masalah, coba clear cache browser
- Restart dev server

## Tech Stack

- **Leaflet**: Library peta open source
- **OpenStreetMap**: Tile provider (data peta)
- **Geolocation API**: Browser API untuk lokasi user
- **Haversine Formula**: Perhitungan jarak geografis
- **Dynamic Import**: Next.js feature untuk SSR compatibility

## Marker Colors (Kategori)

```javascript
tarian: '#FD7E14'      // 🟠 Orange
musik: '#4A90E2'       // 🔵 Blue
pakaian: '#E91E63'     // 🔴 Pink
arsitektur: '#9C27B0'  // 🟣 Purple
kuliner: '#FF5722'     // 🟠 Deep Orange
upacara: '#D0021B'     // 🔴 Red
kerajinan: '#9013FE'   // 🟣 Violet
senjata: '#795548'     // 🟤 Brown
permainan: '#00BCD4'   // 🔵 Cyan
bahasa: '#4CAF50'      // 🟢 Green
```

## Performance Tips

1. **Dynamic Import**: Component di-load hanya di client-side (ssr: false)
2. **Marker Optimization**: Semua markers di-render efisien
3. **Debounce Search**: Implementasi debounce untuk search input (opsional)
4. **Lazy Loading**: Tiles di-load on-demand saat user pan/zoom

## Customization

### Ganti Tile Provider (Opsional)
Selain OpenStreetMap, bisa pakai tile provider lain:

```javascript
// Dark mode
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png')

// Watercolor style
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg')

// Satellite (dari Esri)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}')
```

### Custom Marker Icons
Bisa ganti marker dengan gambar/icon custom:

```javascript
const customIcon = L.icon({
  iconUrl: '/path/to/icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
```

## Perbandingan dengan Google Maps

| Feature | Leaflet + OSM | Google Maps |
|---------|---------------|-------------|
| **Biaya** | 100% Gratis | $200 kredit/bulan → bayar |
| **API Key** | ❌ Tidak perlu | ✅ Wajib |
| **Registrasi** | ❌ Tidak perlu | ✅ Wajib CC |
| **Limit** | ❌ Unlimited | ✅ 28,000 loads/bulan |
| **Data** | OpenStreetMap | Google |
| **Customization** | ✅ Sangat fleksibel | ⚠️ Terbatas |
| **Offline** | ✅ Bisa | ❌ Tidak |

## Resources

- **Leaflet Documentation**: https://leafletjs.com/
- **OpenStreetMap**: https://www.openstreetmap.org/
- **Leaflet Tutorials**: https://leafletjs.com/examples.html
- **Marker Icons**: https://github.com/pointhi/leaflet-color-markers

## Kesimpulan

Dengan Leaflet, Anda mendapatkan:
- 🆓 Peta gratis tanpa batas
- 🚀 Setup cepat (hanya install package)
- 🎨 Kustomisasi penuh
- 📱 Mobile-friendly
- ⚡ Performa cepat
- 🌍 Data OpenStreetMap yang lengkap

**Perfect untuk project seperti Lokal Lens!** 🗺️✨
