import Image from 'next/image';

export default function ArticleContent() {
  return (
    <article className="w-full max-w-[896px] mx-auto px-4 py-8 md:py-12 lg:py-16">
      {/* Header */}
      <header className="flex flex-col items-start gap-4 mb-12">
        {/* Category */}
        <div className="w-full text-center">
          <span className="text-sm font-bold leading-5 text-[#4DB6AC] font-[family-name:var(--font-noto-sans)]">
            Cerita Budaya
          </span>
        </div>

        {/* Title */}
        <h1 className="w-full text-center text-[#333] font-[family-name:var(--font-newsreader)] text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-extrabold leading-tight lg:leading-[60px] tracking-[-3px]">
          Filosofi di Balik Setiap Corak Tenun Ikat Sumba
        </h1>

        {/* Meta Information */}
        <div className="w-full flex flex-wrap justify-center items-center gap-4 pt-2">
          <span className="text-sm leading-5 text-[#4B5563] font-[family-name:var(--font-noto-sans)]">
            Oleh: Andrea Hirata
          </span>
          <span className="text-sm leading-5 text-[#9CA3AF] font-[family-name:var(--font-noto-sans)]">
            |
          </span>
          <span className="text-sm leading-5 text-[#4B5563] font-[family-name:var(--font-noto-sans)]">
            12 Mei 2024
          </span>
          <span className="text-sm leading-5 text-[#9CA3AF] font-[family-name:var(--font-noto-sans)]">
            |
          </span>
          <span className="text-sm leading-5 text-[#4B5563] font-[family-name:var(--font-noto-sans)]">
            7 menit baca
          </span>
        </div>
      </header>

      {/* Article Body */}
      <div className="flex flex-col gap-12">
        {/* Opening Paragraph */}
        <p className="text-[#333] font-[family-name:var(--font-noto-sans)] text-lg sm:text-xl leading-[32.5px]">
          Di hamparan sabana Sumba yang kering, tersembunyi sebuah tradisi kuno yang kaya akan makna dan keindahan. Tenun ikat Sumba bukan sekadar kain; ia adalah kanvas kehidupan, sebuah narasi visual yang ditenun helai demi helai dengan doa, harapan, dan pengetahuan leluhur. Setiap motif yang lahir dari jemari para penenun adalah simbol yang menceritakan status sosial, keberanian, kesuburan, hingga perjalanan ruh ke alam baka.
        </p>

        {/* Main Image */}
        <figure className="w-full flex flex-col gap-2">
          <div className="w-full aspect-[36/25] relative rounded-lg overflow-hidden bg-gray-100">
            <Image
              src="/assets/img/artikel.jpg"
              alt="Seorang mama penenun di Sumba Timur dengan sabar merangkai benang di atas alat tenun tradisionalnya"
              fill
              className="object-cover"
              priority
            />
          </div>
          <figcaption className="text-sm leading-5 text-[#6B7280] text-center font-[family-name:var(--font-noto-sans)]">
            Seorang mama penenun di Sumba Timur dengan sabar merangkai benang di atas alat tenun tradisionalnya.
          </figcaption>
        </figure>

        {/* Body Paragraph */}
        <p className="text-[#333] font-[family-name:var(--font-noto-sans)] text-base sm:text-lg leading-[29.25px]">
          Proses pembuatannya sendiri adalah sebuah ritual yang sakral, bisa memakan waktu berbulan-bulan bahkan bertahun-tahun. Dimulai dari memintal kapas menjadi benang, lalu mewarnainya dengan pewarna alami yang diambil dari akar, daun, dan kulit kayu. Warna biru indigo dari tanaman nila, merah dari akar mengkudu, dan kuning dari kayu kuning menjadi palet utama yang menghidupkan kain-kain ini. Proses pencelupan yang berulang-ulang inilah yang menghasilkan warna yang pekat dan tahan lama.
        </p>

        {/* Heading */}
        <h3 className="text-[#333] font-[family-name:var(--font-newsreader)] text-lg font-bold leading-7">
          Makna di Balik Motif
        </h3>

        {/* Body Paragraph */}
        <p className="text-[#333] font-[family-name:var(--font-noto-sans)] text-base sm:text-lg leading-[29.25px]">
          Corak yang paling ikonik adalah motif kuda, yang melambangkan kepahlawanan, kekayaan, dan status sosial tinggi, karena kuda adalah hewan yang sangat dihargai di Sumba. Ada pula motif naga (mamuli) yang merepresentasikan kesuburan dan dunia gaib, serta motif ayam jantan yang menjadi simbol kehidupan dan keberanian. Setiap kain menjadi sebuah buku cerita yang bisa dibaca, mengungkapkan identitas dan asal-usul pemakainya.
        </p>

        {/* Blockquote */}
        <blockquote className="pl-5 border-l-4 border-[#C1A36F]">
          <p className="text-[#4B5563] font-[family-name:var(--font-noto-sans)] text-base sm:text-lg italic leading-7">
            "Bagi kami, menenun adalah cara untuk terhubung dengan para leluhur. Setiap benang adalah doa, setiap ikatan adalah janji untuk menjaga warisan ini tetap hidup."
          </p>
        </blockquote>

        {/* Body Paragraph */}
        <p className="text-[#333] font-[family-name:var(--font-noto-sans)] text-base sm:text-lg leading-[29.25px]">
          Kain tenun ikat Sumba tidak hanya digunakan sebagai pakaian sehari-hari atau busana adat dalam upacara penting seperti pernikahan dan pemakaman. Ia juga berfungsi sebagai mas kawin, alat tukar, hingga bekal bagi orang yang meninggal dunia. Sebuah kain yang menyertai manusia dari lahir hingga kembali ke pangkuan Sang Pencipta, menunjukkan betapa dalamnya filosofi yang terkandung di dalamnya.
        </p>

        {/* Closing Paragraph */}
        <p className="text-[#333] font-[family-name:var(--font-noto-sans)] text-base sm:text-lg leading-[29.25px]">
          Di era modern ini, para penenun Sumba terus berjuang untuk menjaga tradisi ini tetap relevan. Mereka beradaptasi dengan permintaan pasar tanpa meninggalkan pakem-pakem tradisi. Dengan membeli dan menghargai sehelai kain tenun ikat Sumba, kita tidak hanya mendapatkan sebuah karya seni yang indah, tetapi juga turut serta dalam melestarikan sebuah peradaban yang agung.
        </p>
      </div>
    </article>
  );
}
