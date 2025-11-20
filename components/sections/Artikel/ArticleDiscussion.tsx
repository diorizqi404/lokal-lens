'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Comment {
  id: number;
  author: string;
  timeAgo: string;
  content: string;
  avatar: string;
}

const comments: Comment[] = [
  {
    id: 1,
    author: 'Budi Santoso',
    timeAgo: '2 hari lalu',
    content: 'Artikel yang sangat mencerahkan! Saya jadi makin kagum dengan kekayaan budaya Sumba. Terima kasih Lokallens.',
    avatar: '/assets/img/avatar.svg'
  },
  {
    id: 2,
    author: 'Rina Wijaya',
    timeAgo: '1 hari lalu',
    content: 'Penjelasannya detail sekali. Saya pernah ke Sumba dan melihat langsung prosesnya, memang luar biasa rumit dan penuh makna.',
    avatar: '/assets/img/avatar.svg'
  }
];

export default function ArticleDiscussion() {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting comment:', commentText);
    setCommentText('');
  };

  return (
    <section className="w-full max-w-[896px] mx-auto px-4 py-8 border-t border-[#EAEAEA]">
      {/* Section Title */}
      <h2 className="text-[#333] font-[family-name:var(--font-newsreader)] text-2xl sm:text-[30px] font-bold leading-9 mb-6">
        Diskusi ({comments.length} Komentar)
      </h2>

      {/* Comments List */}
      <div className="flex flex-col gap-8 mb-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              <Image
                src={comment.avatar}
                alt={comment.author}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Comment Content */}
            <div className="flex-1 bg-white rounded-lg shadow-sm p-4 flex flex-col gap-2">
              {/* Comment Header */}
              <div className="flex justify-between items-center">
                <h4 className="text-[#333] font-[family-name:var(--font-newsreader)] text-base font-bold leading-6">
                  {comment.author}
                </h4>
                <span className="text-[#6B7280] font-[family-name:var(--font-noto-sans)] text-xs leading-4">
                  {comment.timeAgo}
                </span>
              </div>

              {/* Comment Text */}
              <p className="text-[#374151] font-[family-name:var(--font-noto-sans)] text-sm leading-5">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Textarea */}
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Tulis komentar Anda..."
          className="w-full min-h-[120px] px-4 py-4 rounded-lg border border-[#EAEAEA] bg-white text-[#374151] font-[family-name:var(--font-noto-sans)] text-sm leading-5 placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#E57373] focus:border-transparent resize-y"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="self-start px-6 py-2.5 rounded-full bg-[#E57373] hover:bg-[#d86565] transition-colors"
        >
          <span className="text-white text-center font-[family-name:var(--font-noto-sans)] text-sm font-bold leading-[21px] tracking-[0.21px]">
            Kirim Komentar
          </span>
        </button>
      </form>
    </section>
  );
}
