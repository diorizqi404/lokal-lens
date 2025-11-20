import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scan Budaya - LokalLens",
  description: "Pindai objek budaya dan temukan ceritanya secara instan dengan teknologi AI.",
};

export default function ScanBudayaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
