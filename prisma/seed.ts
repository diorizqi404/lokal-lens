import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth/utils';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const adminPassword = await hashPassword('password');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      password: adminPassword,
      full_name: 'Admin Lokal Lens',
      role: 'admin',
      profile: {
        create: {
          bio: 'Administrator platform Lokal Lens',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
          provinces_visited: 34,
          badges_earned: 8,
        },
      },
    },
    include: {
      profile: true,
    },
  });

  console.log(`✅ Admin user created: ${admin.email}`);

  // Create contributor user
  const contributorPassword = await hashPassword('password');
  const contributor = await prisma.user.upsert({
    where: { email: 'contributor@gmail.com' },
    update: {},
    create: {
      email: 'contributor@gmail.com',
      password: contributorPassword,
      full_name: 'Budi Kontributor',
      role: 'contributor',
      profile: {
        create: {
          bio: 'Kontributor aktif di platform Lokal Lens',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
          provinces_visited: 5,
          badges_earned: 3,
        },
      },
    },
    include: {
      profile: true,
    },
  });

  console.log(`✅ Contributor user created: ${contributor.email}`);

  // Create officer user
  const officerPassword = await hashPassword('password');
  const officer = await prisma.user.upsert({
    where: { email: 'officer@gmail.com' },
    update: {},
    create: {
      email: 'officer@gmail.com',
      password: officerPassword,
      full_name: 'Petugas Budaya',
      role: 'officer',
      profile: {
        create: {
          bio: 'Petugas pemeliharaan budaya',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
          provinces_visited: 10,
          badges_earned: 5,
        },
      },
    },
    include: {
      profile: true,
    },
  });

  console.log(`✅ Officer user created: ${officer.email}`);

  // Create regular user
  const userPassword = await hashPassword('password');
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@gmail.com' },
    update: {},
    create: {
      email: 'user@gmail.com',
      password: userPassword,
      full_name: 'User Biasa',
      role: 'user',
      profile: {
        create: {
          bio: 'Pengguna biasa platform Lokal Lens',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
          provinces_visited: 2,
          badges_earned: 1,
        },
      },
    },
    include: {
      profile: true,
    },
  });

  console.log(`✅ Regular user created: ${regularUser.email}`);

  // Create sample certificates for admin
  await prisma.certificate.createMany({
    data: [
      {
        user_id: admin.id,
        title: 'Duta Budaya Lokal Lens',
        description: 'Penghargaan untuk kontribusi luar biasa dalam melestarikan budaya nusantara',
        date_earned: new Date('2024-01-15'),
        certificate_url: 'https://example.com/certificates/duta-budaya.pdf',
      },
      {
        user_id: admin.id,
        title: 'Penjelajah Nusantara',
        description: 'Telah menjelajahi semua 34 provinsi di Indonesia',
        date_earned: new Date('2024-02-20'),
        certificate_url: 'https://example.com/certificates/penjelajah.pdf',
      },
    ],
  });

  console.log(`✅ Certificates created for admin`);

  // Create sample certificates for contributor
  await prisma.certificate.createMany({
    data: [
      {
        user_id: contributor.id,
        title: 'Kontributor Aktif',
        description: 'Apresiasi untuk kontribusi aktif dalam platform',
        date_earned: new Date('2024-03-10'),
        certificate_url: 'https://example.com/certificates/contributor-aktif.pdf',
      },
    ],
  });

  console.log(`✅ Certificates created for contributor`);

  // Create badges
  const badges = await prisma.badge.createMany({
    data: [
      // Explorer badges
      {
        name: 'Penjelajah Pemula',
        description: 'Scan 5 objek budaya pertama kamu',
        icon: '🔍',
        category: 'explorer',
        requirement: 'Scan 5 objek budaya',
        points: 50,
      },
      {
        name: 'Penjelajah Berpengalaman',
        description: 'Scan 25 objek budaya dari berbagai daerah',
        icon: '🗺️',
        category: 'explorer',
        requirement: 'Scan 25 objek budaya',
        points: 100,
      },
      {
        name: 'Master Penjelajah',
        description: 'Scan 100 objek budaya nusantara',
        icon: '🏆',
        category: 'explorer',
        requirement: 'Scan 100 objek budaya',
        points: 500,
      },
      // Collector badges
      {
        name: 'Kolektor Batik',
        description: 'Scan 10 jenis batik berbeda',
        icon: '👘',
        category: 'collector',
        requirement: 'Scan 10 jenis batik',
        points: 75,
      },
      {
        name: 'Kolektor Wayang',
        description: 'Scan 10 karakter wayang berbeda',
        icon: '🎭',
        category: 'collector',
        requirement: 'Scan 10 karakter wayang',
        points: 75,
      },
      {
        name: 'Kolektor Keris',
        description: 'Scan 5 jenis keris berbeda',
        icon: '🗡️',
        category: 'collector',
        requirement: 'Scan 5 jenis keris',
        points: 100,
      },
      // Master badges
      {
        name: 'Ahli Budaya Jawa',
        description: 'Lengkapi semua koleksi budaya Jawa',
        icon: '🎌',
        category: 'master',
        requirement: 'Scan semua budaya Jawa',
        points: 200,
      },
      {
        name: 'Ahli Budaya Bali',
        description: 'Lengkapi semua koleksi budaya Bali',
        icon: '🏯',
        category: 'master',
        requirement: 'Scan semua budaya Bali',
        points: 200,
      },
      {
        name: 'Guru Budaya Nusantara',
        description: 'Lengkapi koleksi dari 10 provinsi berbeda',
        icon: '📚',
        category: 'master',
        requirement: 'Scan budaya dari 10 provinsi',
        points: 300,
      },
      // Social badges
      {
        name: 'Storyteller',
        description: 'Bagikan 5 hasil scan ke media sosial',
        icon: '📱',
        category: 'social',
        requirement: 'Bagikan 5 hasil scan',
        points: 50,
      },
      {
        name: 'Kontributor Emas',
        description: 'Kontribusi 50+ artikel budaya',
        icon: '✨',
        category: 'special',
        requirement: 'Tulis 50 artikel',
        points: 500,
      },
    ],
  });

  console.log(`✅ ${badges.count} badges created`);

  // Create challenges
  const challenges = await prisma.challenge.createMany({
    data: [
      // Scan challenges
      {
        title: 'Petualangan Pertama',
        description: 'Scan objek budaya pertama kamu dan mulai petualanganmu!',
        category: 'scan',
        difficulty: 'easy',
        points: 25,
        requirements: 'Scan 1 objek budaya',
      },
      {
        title: 'Minggu Produktif',
        description: 'Scan 10 objek budaya dalam 7 hari',
        category: 'scan',
        difficulty: 'medium',
        points: 100,
        requirements: 'Scan 10 objek dalam 7 hari',
      },
      {
        title: 'Marathon Budaya',
        description: 'Scan 50 objek budaya dalam sebulan',
        category: 'scan',
        difficulty: 'hard',
        points: 500,
        requirements: 'Scan 50 objek dalam 30 hari',
      },
      // Quiz challenges
      {
        title: 'Kuis Master',
        description: 'Selesaikan 5 kuis budaya dengan sempurna',
        category: 'quiz',
        difficulty: 'medium',
        points: 150,
        requirements: 'Perfect score di 5 kuis',
      },
      {
        title: 'Jenius Budaya',
        description: 'Jawab benar 100 pertanyaan kuis',
        category: 'quiz',
        difficulty: 'hard',
        points: 300,
        requirements: 'Jawab 100 pertanyaan dengan benar',
      },
      // Article challenges
      {
        title: 'Pembaca Setia',
        description: 'Baca 10 artikel budaya',
        category: 'article',
        difficulty: 'easy',
        points: 50,
        requirements: 'Baca 10 artikel',
      },
      {
        title: 'Penulis Pemula',
        description: 'Tulis artikel budaya pertama kamu',
        category: 'article',
        difficulty: 'medium',
        points: 100,
        requirements: 'Publikasikan 1 artikel',
      },
      // Exploration challenges
      {
        title: 'Penjelajah Regional',
        description: 'Kunjungi dan scan budaya dari 3 provinsi berbeda',
        category: 'exploration',
        difficulty: 'medium',
        points: 200,
        requirements: 'Scan dari 3 provinsi',
      },
      {
        title: 'Wisatawan Nusantara',
        description: 'Kunjungi dan scan budaya dari 10 provinsi',
        category: 'exploration',
        difficulty: 'hard',
        points: 750,
        requirements: 'Scan dari 10 provinsi',
      },
      // Social challenges
      {
        title: 'Influencer Budaya',
        description: 'Share 10 hasil scan ke media sosial',
        category: 'social',
        difficulty: 'easy',
        points: 75,
        requirements: 'Share 10 kali',
      },
      {
        title: 'Community Builder',
        description: 'Ajak 5 teman bergabung di LokalLens',
        category: 'social',
        difficulty: 'medium',
        points: 250,
        requirements: 'Referral 5 user',
      },
    ],
  });

  console.log(`✅ ${challenges.count} challenges created`);

  // Award some badges to users for demo
  const allBadges = await prisma.badge.findMany({ take: 5 });
  
  // Use upsert to avoid duplicate key errors
  for (const badgeData of [
    { user_id: admin.id, badge_id: allBadges[0].id },
    { user_id: admin.id, badge_id: allBadges[1].id },
    { user_id: admin.id, badge_id: allBadges[2].id },
    { user_id: regularUser.id, badge_id: allBadges[0].id },
  ]) {
    await prisma.userBadge.upsert({
      where: {
        user_id_badge_id: {
          user_id: badgeData.user_id,
          badge_id: badgeData.badge_id,
        },
      },
      update: {},
      create: badgeData,
    });
  }

  console.log(`✅ User badges awarded`);

  // Complete some challenges for users
  const allChallenges = await prisma.challenge.findMany({ take: 3 });
  
  // Use upsert to avoid duplicate key errors
  for (const challengeData of [
    { user_id: admin.id, challenge_id: allChallenges[0].id },
    { user_id: admin.id, challenge_id: allChallenges[1].id },
    { user_id: regularUser.id, challenge_id: allChallenges[0].id },
  ]) {
    await prisma.userCompleteChallenge.upsert({
      where: {
        user_id_challenge_id: {
          user_id: challengeData.user_id,
          challenge_id: challengeData.challenge_id,
        },
      },
      update: {},
      create: challengeData,
    });
  }

  console.log(`✅ User challenges completed`);

  // Seed Articles
  console.log('\n🌱 Seeding articles...');

  // Delete existing articles to avoid duplicate slug errors
  await prisma.article.deleteMany({});

  const articles = await prisma.article.createMany({
    data: [
      {
        title: 'Mengenal Wayang Kulit: Seni Pertunjukan Klasik Jawa',
        slug: 'mengenal-wayang-kulit-seni-pertunjukan-klasik-jawa',
        excerpt: 'Wayang kulit adalah seni pertunjukan tradisional Indonesia yang telah diakui UNESCO sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi.',
        content: `Wayang kulit adalah salah satu puncak seni budaya Indonesia yang berakar dari tradisi Jawa. Pertunjukan wayang kulit menggabungkan berbagai elemen seni seperti sastra, musik, tutur, rupa, dan pertunjukan yang sangat kompleks.\n\nWayang kulit telah ada sejak abad ke-10 Masehi di Jawa. Pertunjukan ini menggunakan boneka kulit yang diproyeksikan pada layar putih dengan lampu minyak kelapa. Dalang atau pemain wayang akan menggerakkan boneka sambil menceritakan kisah dari epos Mahabharata atau Ramayana.`,
        featured_image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80',
        author_id: admin.id,
        category: 'Seni & Budaya',
        tags: '["wayang", "jawa", "tradisi", "seni pertunjukan", "UNESCO"]',
        province: 'Jawa Tengah',
        read_time: 8,
        views: 1520,
        is_highlight: true,
      },
      {
        title: 'Tari Kecak: Pesona Tari Api dari Bali',
        slug: 'tari-kecak-pesona-tari-api-dari-bali',
        excerpt: 'Tari Kecak adalah tarian tradisional Bali yang unik karena tidak menggunakan alat musik pengiring, melainkan suara "cak" dari puluhan penari pria.',
        content: `Tari Kecak adalah salah satu pertunjukan seni yang paling ikonik dari Bali. Tarian ini diciptakan pada tahun 1930-an dan telah menjadi salah satu daya tarik wisata budaya utama di Indonesia.\n\nTari Kecak diciptakan oleh seniman Bali I Wayan Limbak dan pelukis Jerman Walter Spies pada tahun 1930-an. Yang membuat Tari Kecak berbeda adalah penggunaan suara "cak-cak-cak" yang dilantunkan oleh puluhan penari pria yang duduk melingkar.`,
        featured_image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
        author_id: contributor.id,
        category: 'Seni & Budaya',
        tags: '["tari", "bali", "kecak", "ramayana", "tradisi"]',
        province: 'Bali',
        read_time: 6,
        views: 2340,
        is_highlight: true,
      },
      {
        title: 'Batik: Warisan Budaya Dunia dari Indonesia',
        slug: 'batik-warisan-budaya-dunia-dari-indonesia',
        excerpt: 'Batik Indonesia telah diakui UNESCO sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi sejak 2 Oktober 2009.',
        content: `Batik adalah kain bergambar yang pembuatannya secara khusus dengan menuliskan atau menerakan malam pada kain, kemudian pengolahannya diproses dengan cara tertentu.\n\nBatik telah ada di Indonesia sejak zaman Majapahit. Awalnya, batik hanya digunakan oleh kalangan keraton dan bangsawan. Seiring waktu, batik menyebar ke masyarakat luas dan menjadi identitas budaya Indonesia.`,
        featured_image: 'https://images.unsplash.com/photo-1610419312715-8e686a036c56?w=1200&q=80',
        author_id: admin.id,
        category: 'Seni & Budaya',
        tags: '["batik", "unesco", "tradisi", "tekstil", "warisan budaya"]',
        province: 'Jawa Tengah',
        read_time: 7,
        views: 3120,
        is_highlight: true,
      },
      {
        title: 'Rendang: Makanan Terenak di Dunia dari Minangkabau',
        slug: 'rendang-makanan-terenak-di-dunia-dari-minangkabau',
        excerpt: 'Rendang adalah masakan daging dengan bumbu rempah-rempah khas Minangkabau yang telah dinobatkan sebagai makanan terenak di dunia oleh CNN.',
        content: `Rendang adalah masakan tradisional Indonesia yang berasal dari Sumatera Barat. Pada tahun 2011, CNN International menobatkan Rendang sebagai makanan paling enak di dunia.\n\nRendang berasal dari tradisi masyarakat Minangkabau di Sumatera Barat. Masakan ini telah ada sejak abad ke-16 dan awalnya dibuat sebagai bekal perjalanan karena dapat bertahan lama tanpa pendingin.`,
        featured_image: 'https://images.unsplash.com/photo-1596040033229-a0b3b7f487a0?w=1200&q=80',
        author_id: contributor.id,
        category: 'Kuliner',
        tags: '["rendang", "minangkabau", "kuliner", "sumatera barat"]',
        province: 'Sumatera Barat',
        read_time: 6,
        views: 4520,
        is_highlight: false,
      },
      {
        title: 'Rumah Gadang: Arsitektur Tradisional Minangkabau',
        slug: 'rumah-gadang-arsitektur-tradisional-minangkabau',
        excerpt: 'Rumah Gadang adalah rumah adat tradisional Minangkabau yang memiliki atap berbentuk tanduk kerbau.',
        content: `Rumah Gadang atau Rumah Bagonjong adalah rumah adat tradisional masyarakat Minangkabau di Sumatera Barat. Rumah ini memiliki ciri khas atap yang melengkung seperti tanduk kerbau.\n\nBentuk atap Rumah Gadang yang menyerupai tanduk kerbau memiliki makna filosofis yang dalam. Ini mengingat legenda kemenangan kerbau Minangkabau melawan kerbau Jawa.`,
        featured_image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80',
        author_id: admin.id,
        category: 'Arsitektur',
        tags: '["rumah gadang", "minangkabau", "arsitektur"]',
        province: 'Sumatera Barat',
        read_time: 5,
        views: 1850,
        is_highlight: false,
      },
      {
        title: 'Angklung: Alat Musik Bambu Warisan UNESCO',
        slug: 'angklung-alat-musik-bambu-warisan-unesco',
        excerpt: 'Angklung adalah alat musik multitonal tradisional Indonesia yang terbuat dari bambu.',
        content: `Angklung adalah alat musik yang terbuat dari bambu dan dimainkan dengan cara digoyangkan. Alat musik ini berasal dari Jawa Barat dan telah diakui UNESCO sebagai Masterpiece of Oral and Intangible Heritage of Humanity.\n\nAngklung telah ada sejak abad ke-7 Masehi di wilayah Sunda, Jawa Barat. Awalnya angklung digunakan untuk upacara padi, kemudian berkembang menjadi alat musik hiburan dan pendidikan.`,
        featured_image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80',
        author_id: contributor.id,
        category: 'Seni & Budaya',
        tags: '["angklung", "musik", "bambu", "jawa barat", "unesco"]',
        province: 'Jawa Barat',
        read_time: 5,
        views: 980,
        is_highlight: false,
      },
    ],
  });

  console.log(`✅ ${articles.count} articles seeded`);

  // Seed comments
  const article1 = await prisma.article.findFirst({
    where: { slug: 'mengenal-wayang-kulit-seni-pertunjukan-klasik-jawa' },
  });

  if (article1) {
    await prisma.articleComment.createMany({
      data: [
        {
          article_id: article1.id,
          user_id: regularUser.id,
          content: 'Artikel yang sangat informatif! Saya jadi lebih menghargai seni wayang kulit.',
          upvotes: 12,
        },
        {
          article_id: article1.id,
          user_id: contributor.id,
          content: 'Wayang kulit memang luar biasa!',
          upvotes: 8,
        },
      ],
    });
    console.log('✅ Comments seeded');
  }

  // Seed Cultures
  console.log('\n🌱 Seeding cultures...');

  // Delete existing cultures to avoid duplicate slug errors
  await prisma.culture.deleteMany({});

  const cultures = await prisma.culture.createMany({
    data: [
      {
        name: 'Reog Ponorogo',
        slug: 'reog-ponorogo',
        subtitle: 'Tarian Mistis dari Gerbang Timur Jawa',
        description: 'Reog adalah salah satu kesenian budaya yang berasal dari Jawa Timur bagian barat-laut dan Ponorogo dianggap sebagai kota asal Reog yang sebenarnya. Gerbang kota Ponorogo dihiasi oleh sosok warok dan gemblak, dua sosok yang ikut tampil pada saat Reog dipertunjukkan.',
        long_description: 'Reog adalah salah satu budaya daerah di Indonesia yang masih sangat kental dengan hal-hal yang berbau mistis dan ilmu kebatinan yang kuat. Sejarahnya dimulai pada zaman Kerajaan Majapahit, di mana Ki Ageng Kutu, seorang abdi kerajaan, menciptakan tarian ini sebagai sindiran kepada Raja Kertabhumi.',
        meaning: 'Tarian ini menggambarkan singa barong, raja hutan, yang menjadi simbol bagi Kertabhumi, dan di atasnya bertengger bulu merak hingga menyerupai kipas raksasa yang menyimbolkan pengaruh kuat para rekannya dari kerajaan Tiongkok. Kesenian ini merupakan wujud kritik terhadap penguasa yang tunduk pada kehendak asing.',
        category: 'tarian',
        location: 'Ponorogo, Jawa Timur',
        province: 'Jawa Timur',
        city: 'Ponorogo',
        latitude: -7.8754,
        longitude: 111.4625,
        status: 'active',
        is_endangered: true,
        thumbnail: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800',
        map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126142.77835087282!2d111.38!3d-7.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79a1c3c3c3c3c3%3A0x1234567890abcdef!2sPonorogo!5e0!3m2!1sen!2sid!4v1234567890123',
      },
      {
        name: 'Tari Saman',
        slug: 'tari-saman',
        subtitle: 'Tarian Seribu Tangan dari Aceh',
        description: 'Tari Saman adalah tarian suku Gayo yang biasa ditampilkan untuk merayakan peristiwa-peristiwa penting dalam adat. Tarian ini juga digunakan untuk merayakan kelahiran Nabi Muhammad SAW.',
        long_description: 'Dalam beberapa literatur menyebutkan, tari Saman diciptakan oleh Syekh Saman, seorang ulama yang berasal dari Gayo, Aceh Tenggara. Tarian ini diciptakan untuk mendakwahkan ajaran Islam.',
        meaning: 'Tari Saman mengandung pendidikan keagamaan, sopan santun, kepahlawanan, kekompakan, dan kebersamaan. Semua penari harus bersatu dalam gerakan dan suara.',
        category: 'tarian',
        location: 'Gayo Lues, Aceh',
        province: 'Aceh',
        city: 'Gayo Lues',
        latitude: 4.3230,
        longitude: 97.3250,
        status: 'active',
        is_endangered: false,
        thumbnail: 'https://images.unsplash.com/photo-1604537466608-109fa2f16c3b?w=800',
        map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255841.77835087282!2d97.325!3d4.323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303fb8c3c3c3c3c3%3A0x1234567890abcdef!2sGayo%20Lues!5e0!3m2!1sen!2sid!4v1234567890123',
      },
      {
        name: 'Batik Parang',
        slug: 'batik-parang',
        subtitle: 'Motif Keris Diagonal yang Megah',
        description: 'Batik Parang adalah salah satu motif batik tertua di Indonesia. Motif ini menggambarkan sebuah garis miring yang teratur membentuk huruf S.',
        long_description: 'Parang berasal dari kata "Pereng" yang berarti lereng. Motif ini menggambarkan lereng gunung yang digunakan oleh para raja dan keluarga kerajaan sebagai simbol kekuatan.',
        meaning: 'Motif parang melambangkan keluhuran budi, kekuatan, dan keteguhan hati. Dahulu, motif ini hanya boleh dikenakan oleh keluarga kerajaan Yogyakarta.',
        category: 'pakaian',
        location: 'Yogyakarta, DI Yogyakarta',
        province: 'DI Yogyakarta',
        city: 'Yogyakarta',
        latitude: -7.7956,
        longitude: 110.3695,
        status: 'active',
        is_endangered: false,
        thumbnail: 'https://images.unsplash.com/photo-1610419312715-8e686a036c56?w=800',
        map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126142.77835087282!2d110.369!3d-7.795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787bd5b6b45%3A0x21723fd4d3b2d63!2sYogyakarta!5e0!3m2!1sen!2sid!4v1234567890123',
      },
      {
        name: 'Rumah Gadang',
        slug: 'rumah-gadang',
        subtitle: 'Arsitektur Megah Minangkabau',
        description: 'Rumah Gadang adalah nama untuk rumah adat Minangkabau yang merupakan rumah tradisional dan banyak jumpai di provinsi Sumatera Barat, Indonesia.',
        long_description: 'Rumah ini dikenal karena atapnya yang runcing dan melengkung menyerupai tanduk kerbau. Arsitekturnya mencerminkan sistem matrilineal masyarakat Minangkabau.',
        meaning: 'Rumah Gadang adalah simbol dari sistem kekerabatan matrilineal, di mana garis keturunan berasal dari pihak ibu. Rumah ini adalah milik kaum perempuan dan diwariskan secara turun temurun.',
        category: 'arsitektur',
        location: 'Bukittinggi, Sumatera Barat',
        province: 'Sumatera Barat',
        city: 'Bukittinggi',
        latitude: -0.3097,
        longitude: 100.3693,
        status: 'active',
        is_endangered: false,
        thumbnail: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
        map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255841.77835087282!2d100.369!3d-0.309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b8c3c3c3c3c3%3A0x1234567890abcdef!2sBukittinggi!5e0!3m2!1sen!2sid!4v1234567890123',
      },
      {
        name: 'Angklung',
        slug: 'angklung',
        subtitle: 'Alat Musik Bambu Warisan Dunia',
        description: 'Angklung adalah alat musik multitonal tradisional yang terbuat dari bambu, dimainkan dengan cara digoyangkan.',
        long_description: 'Angklung berasal dari Jawa Barat dan telah diakui UNESCO sebagai Masterpiece of Oral and Intangible Heritage of Humanity pada tahun 2010.',
        meaning: 'Angklung melambangkan kebersamaan dan kerja sama, karena untuk menghasilkan melodi yang indah diperlukan koordinasi antara banyak pemain.',
        category: 'musik',
        location: 'Bandung, Jawa Barat',
        province: 'Jawa Barat',
        city: 'Bandung',
        latitude: -6.9175,
        longitude: 107.6191,
        status: 'active',
        is_endangered: false,
        thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
        map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.57311744335938!3d-6.903444400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung!5e0!3m2!1sen!2sid!4v1234567890123',
      },
      {
        name: 'Rendang',
        slug: 'rendang',
        subtitle: 'Makanan Terenak di Dunia',
        description: 'Rendang adalah masakan daging bercita rasa pedas yang menggunakan campuran berbagai bumbu dan rempah-rempah khas Minangkabau.',
        long_description: 'Rendang telah dinobatkan sebagai hidangan paling enak di dunia versi CNN International pada tahun 2011. Proses memasak rendang memakan waktu berjam-jam.',
        meaning: 'Rendang melambangkan kearifan dan kesabaran masyarakat Minangkabau dalam mengolah makanan dengan sempurna melalui proses yang panjang.',
        category: 'kuliner',
        location: 'Padang, Sumatera Barat',
        province: 'Sumatera Barat',
        city: 'Padang',
        latitude: -0.9471,
        longitude: 100.4172,
        status: 'active',
        is_endangered: false,
        thumbnail: 'https://images.unsplash.com/photo-1596040033229-a0b3b7f487a0?w=800',
        map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127748.4334826047!2d100.3507805!3d-0.9470832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b944f0a0a1b1%3A0xf0db0d7a3f6b6b6!2sPadang!5e0!3m2!1sen!2sid!4v1234567890123',
      },
      {
        name: 'Keris',
        slug: 'keris',
        subtitle: 'Senjata Pusaka Penuh Makna',
        description: 'Keris adalah senjata tikam khas Indonesia yang memiliki corak dan bentuk yang unik dengan banyak variasi pamor.',
        long_description: 'Keris bukan hanya senjata, tetapi juga merupakan benda pusaka yang dipercaya memiliki kekuatan spiritual. Telah diakui UNESCO sebagai warisan budaya tak benda.',
        meaning: 'Keris melambangkan kekuatan, kejantanan, dan status sosial pemiliknya. Setiap pamor dan lekukan memiliki makna filosofis tersendiri.',
        category: 'senjata',
        location: 'Surakarta, Jawa Tengah',
        province: 'Jawa Tengah',
        city: 'Surakarta',
        latitude: -7.5755,
        longitude: 110.8243,
        status: 'active',
        is_endangered: false,
        thumbnail: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800',
        map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126406.82523866256!2d110.7500415!3d-7.5755495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a16627a8930d1%3A0x16c4283d6a20d80!2sSurakarta!5e0!3m2!1sen!2sid!4v1234567890123',
      },
      {
        name: 'Wayang Kulit',
        slug: 'wayang-kulit',
        subtitle: 'Pertunjukan Bayangan Penuh Filosofi',
        description: 'Wayang kulit adalah seni pertunjukan asli Indonesia yang melibatkan boneka kulit yang diproyeksikan pada layar.',
        long_description: 'Wayang kulit telah diakui UNESCO sebagai Masterpiece of Oral and Intangible Heritage of Humanity. Pertunjukan ini biasanya menceritakan kisah dari epos Ramayana dan Mahabharata.',
        meaning: 'Wayang kulit mengandung filosofi kehidupan yang mendalam, mengajarkan tentang kebaikan, kejahatan, dan karma dalam kehidupan manusia.',
        category: 'upacara',
        location: 'Yogyakarta, DI Yogyakarta',
        province: 'DI Yogyakarta',
        city: 'Yogyakarta',
        latitude: -7.7956,
        longitude: 110.3695,
        status: 'active',
        is_endangered: false,
        thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
        map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126142.77835087282!2d110.369!3d-7.795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787bd5b6b45%3A0x21723fd4d3b2d63!2sYogyakarta!5e0!3m2!1sen!2sid!4v1234567890123',
      },
    ],
  });

  console.log(`✅ ${cultures.count} cultures seeded`);

  // Seed culture images
  const reogCulture = await prisma.culture.findUnique({ where: { slug: 'reog-ponorogo' } });
  const samanCulture = await prisma.culture.findUnique({ where: { slug: 'tari-saman' } });
  const batikCulture = await prisma.culture.findUnique({ where: { slug: 'batik-parang' } });
  const rumahCulture = await prisma.culture.findUnique({ where: { slug: 'rumah-gadang' } });

  if (reogCulture) {
    await prisma.cultureImage.createMany({
      data: [
        { culture_id: reogCulture.id, image_url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200', alt_text: 'Reog Ponorogo Main', is_primary: true, display_order: 0 },
        { culture_id: reogCulture.id, image_url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600', alt_text: 'Reog Ponorogo 2', is_primary: false, display_order: 1 },
        { culture_id: reogCulture.id, image_url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600', alt_text: 'Reog Ponorogo 3', is_primary: false, display_order: 2 },
      ],
    });
  }

  if (samanCulture) {
    await prisma.cultureImage.createMany({
      data: [
        { culture_id: samanCulture.id, image_url: 'https://images.unsplash.com/photo-1604537466608-109fa2f16c3b?w=1200', alt_text: 'Tari Saman Main', is_primary: true, display_order: 0 },
        { culture_id: samanCulture.id, image_url: 'https://images.unsplash.com/photo-1604537466608-109fa2f16c3b?w=600', alt_text: 'Tari Saman 2', is_primary: false, display_order: 1 },
      ],
    });
  }

  if (batikCulture) {
    await prisma.cultureImage.createMany({
      data: [
        { culture_id: batikCulture.id, image_url: 'https://images.unsplash.com/photo-1610419312715-8e686a036c56?w=1200', alt_text: 'Batik Parang Main', is_primary: true, display_order: 0 },
        { culture_id: batikCulture.id, image_url: 'https://images.unsplash.com/photo-1610419312715-8e686a036c56?w=600', alt_text: 'Batik Parang 2', is_primary: false, display_order: 1 },
      ],
    });
  }

  if (rumahCulture) {
    await prisma.cultureImage.createMany({
      data: [
        { culture_id: rumahCulture.id, image_url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200', alt_text: 'Rumah Gadang Main', is_primary: true, display_order: 0 },
        { culture_id: rumahCulture.id, image_url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600', alt_text: 'Rumah Gadang 2', is_primary: false, display_order: 1 },
      ],
    });
  }

  console.log('✅ Culture images seeded');

  console.log('🎉 Seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
