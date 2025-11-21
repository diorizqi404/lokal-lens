-- Seed data untuk tabel cultures dan culture_images

-- Insert sample cultures
INSERT INTO cultures (name, slug, subtitle, description, long_description, meaning, location, province, city, latitude, longitude, status, is_endangered, thumbnail, map_embed_url, updated_at) VALUES
('Reog Ponorogo', 'reog-ponorogo', 'Tarian Mistis dari Gerbang Timur Jawa', 
'Reog adalah salah satu kesenian budaya yang berasal dari Jawa Timur bagian barat-laut dan Ponorogo dianggap sebagai kota asal Reog yang sebenarnya. Gerbang kota Ponorogo dihiasi oleh sosok warok dan gemblak, dua sosok yang ikut tampil pada saat Reog dipertunjukkan.',
'Reog adalah salah satu budaya daerah di Indonesia yang masih sangat kental dengan hal-hal yang berbau mistis dan ilmu kebatinan yang kuat. Sejarahnya dimulai pada zaman Kerajaan Majapahit, di mana Ki Ageng Kutu, seorang abdi kerajaan, menciptakan tarian ini sebagai sindiran kepada Raja Kertabhumi.',
'Tarian ini menggambarkan singa barong, raja hutan, yang menjadi simbol bagi Kertabhumi, dan di atasnya bertengger bulu merak hingga menyerupai kipas raksasa yang menyimbolkan pengaruh kuat para rekannya dari kerajaan Tiongkok. Kesenian ini merupakan wujud kritik terhadap penguasa yang tunduk pada kehendak asing.',
'Ponorogo, Jawa Timur', 'Jawa Timur', 'Ponorogo', -7.8754, 111.4625, 'active', TRUE, 
'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126142.77835087282!2d111.38!3d-7.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79a1c3c3c3c3c3%3A0x1234567890abcdef!2sPonorogo!5e0!3m2!1sen!2sid!4v1234567890123',
'2025-11-21 11:02:59.202'),

('Tari Saman', 'tari-saman', 'Tarian Seribu Tangan dari Aceh', 
'Tari Saman adalah tarian suku Gayo yang biasa ditampilkan untuk merayakan peristiwa-peristiwa penting dalam adat. Tarian ini juga digunakan untuk merayakan kelahiran Nabi Muhammad SAW.',
'Dalam beberapa literatur menyebutkan, tari Saman diciptakan oleh Syekh Saman, seorang ulama yang berasal dari Gayo, Aceh Tenggara. Tarian ini diciptakan untuk mendakwahkan ajaran Islam.',
'Tari Saman mengandung pendidikan keagamaan, sopan santun, kepahlawanan, kekompakan, dan kebersamaan. Semua penari harus bersatu dalam gerakan dan suara.',
'Gayo Lues, Aceh', 'Aceh', 'Gayo Lues', 4.3230, 97.3250, 'active', FALSE,
'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255841.77835087282!2d97.325!3d4.323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303fb8c3c3c3c3c3%3A0x1234567890abcdef!2sGayo%20Lues!5e0!3m2!1sen!2sid!4v1234567890123',
'2025-11-21 11:02:59.202'),

('Batik Parang', 'batik-parang', 'Motif Keris Diagonal yang Megah', 
'Batik Parang adalah salah satu motif batik tertua di Indonesia. Motif ini menggambarkan sebuah garis miring yang teratur membentuk huruf S.',
'Parang berasal dari kata "Pereng" yang berarti lereng. Motif ini menggambarkan lereng gunung yang digunakan oleh para raja dan keluarga kerajaan sebagai simbol kekuatan.',
'Motif parang melambangkan keluhuran budi, kekuatan, dan keteguhan hati. Dahulu, motif ini hanya boleh dikenakan oleh keluarga kerajaan Yogyakarta.',
'Yogyakarta, DI Yogyakarta', 'DI Yogyakarta', 'Yogyakarta', -7.7956, 110.3695, 'active', FALSE,
'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126142.77835087282!2d110.369!3d-7.795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787bd5b6b45%3A0x21723fd4d3b2d63!2sYogyakarta!5e0!3m2!1sen!2sid!4v1234567890123',
'2025-11-21 11:02:59.202'),

('Rumah Gadang', 'rumah-gadang', 'Arsitektur Megah Minangkabau', 
'Rumah Gadang adalah nama untuk rumah adat Minangkabau yang merupakan rumah tradisional dan banyak jumpai di provinsi Sumatera Barat, Indonesia.',
'Rumah ini dikenal karena atapnya yang runcing dan melengkung menyerupai tanduk kerbau. Arsitekturnya mencerminkan sistem matrilineal masyarakat Minangkabau.',
'Rumah Gadang adalah simbol dari sistem kekerabatan matrilineal, di mana garis keturunan berasal dari pihak ibu. Rumah ini adalah milik kaum perempuan dan diwariskan secara turun temurun.',
'Bukittinggi, Sumatera Barat', 'Sumatera Barat', 'Bukittinggi', -0.3097, 100.3693, 'active', FALSE,
'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800',
'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255841.77835087282!2d100.369!3d-0.309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b8c3c3c3c3c3%3A0x1234567890abcdef!2sBukittinggi!5e0!3m2!1sen!2sid!4v1234567890123',
'2025-11-21 11:02:59.202');

-- Get the IDs (adjust these based on actual inserted IDs)
SET @reog_id = LAST_INSERT_ID();
SET @saman_id = @reog_id + 1;
SET @batik_id = @reog_id + 2;
SET @rumah_id = @reog_id + 3;

-- Insert images for Reog Ponorogo
INSERT INTO culture_images (culture_id, image_url, alt_text, is_primary, display_order) VALUES
(@reog_id, 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200', 'Reog Ponorogo Main', TRUE, 0),
(@reog_id, 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600', 'Reog Ponorogo 2', FALSE, 1),
(@reog_id, 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600', 'Reog Ponorogo 3', FALSE, 2),
(@reog_id, 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600', 'Reog Ponorogo 4', FALSE, 3);

-- Insert images for Tari Saman
INSERT INTO culture_images (culture_id, image_url, alt_text, is_primary, display_order) VALUES
(@saman_id, 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200', 'Tari Saman Main', TRUE, 0),
(@saman_id, 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600', 'Tari Saman 2', FALSE, 1);

-- Insert images for Batik Parang
INSERT INTO culture_images (culture_id, image_url, alt_text, is_primary, display_order) VALUES
(@batik_id, 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200', 'Batik Parang Main', TRUE, 0),
(@batik_id, 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600', 'Batik Parang 2', FALSE, 1);

-- Insert images for Rumah Gadang
INSERT INTO culture_images (culture_id, image_url, alt_text, is_primary, display_order) VALUES
(@rumah_id, 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200', 'Rumah Gadang Main', TRUE, 0),
(@rumah_id, 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600', 'Rumah Gadang 2', FALSE, 1);
