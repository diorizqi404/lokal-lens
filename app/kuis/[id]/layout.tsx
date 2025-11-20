import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
