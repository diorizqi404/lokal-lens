import Image from 'next/image';

interface ReportCardProps {
  report: {
    id: number;
    title: string;
    image: string;
    status: 'new' | 'review' | 'verified' | 'rejected';
    threat: string;
    location: string;
    date: string;
  };
}

const statusConfig = {
  new: {
    label: 'Baru',
    bgColor: 'bg-[#F7F7F7]',
    textColor: 'text-[#1A1A1A]',
  },
  review: {
    label: 'Dalam Peninjauan',
    bgColor: 'bg-[rgba(0,108,132,0.2)]',
    textColor: 'text-[#006C84]',
  },
  verified: {
    label: 'Terverifikasi',
    bgColor: 'bg-[rgba(39,174,96,0.2)]',
    textColor: 'text-[#27AE60]',
  },
  rejected: {
    label: 'Ditolak',
    bgColor: 'bg-[rgba(192,57,43,0.2)]',
    textColor: 'text-[#C0392B]',
  },
};

const ReportCard = ({ report }: ReportCardProps) => {
  const status = statusConfig[report.status];

  return (
    <div className="flex flex-col gap-4 p-4 border border-[rgba(0,0,0,0.1)] rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full aspect-[376.66/211.86] rounded-lg overflow-hidden">
        <Image
          src={report.image}
          alt={report.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-[#1A1A1A] font-bold text-base leading-6">
              {report.title}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold leading-4 ${status.bgColor} ${status.textColor}`}>
              {status.label}
            </span>
          </div>

          <p className="text-[#887D63] font-normal text-sm leading-5">
            Ancaman: {report.threat}
          </p>

          <p className="text-[#887D63] font-normal text-sm leading-5">
            Lokasi: {report.location}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[#887D63] font-normal text-xs leading-4">
            Dilaporkan pada {report.date}
          </p>

          <button className="flex items-center justify-center px-4 h-9 min-w-[84px] rounded-lg bg-[rgba(212,155,22,0.2)] hover:bg-[rgba(212,155,22,0.3)] transition-colors">
            <span className="text-primary-gold font-bold text-sm leading-5 text-[#D49B16]">
              Lihat Detail
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
