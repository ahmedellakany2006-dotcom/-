import type { Metadata } from "next";
import { Tajawal, Amiri_Quran } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ForumProvider } from "@/contexts/ForumContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { FloatingDonation } from "@/components/layout/FloatingDonation";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

const amiriQuran = Amiri_Quran({
  variable: "--font-amiri-quran",
  subsets: ["arabic"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "قد أفلح المؤمنون | المنتدى الإسلامي",
  description: "منتدى إسلامي متميز يحتوي على القرآن الكريم، الشيوخ، الكتب، والتاريخ الإسلامي.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${amiriQuran.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider>
          <AuthProvider>
            <ForumProvider>
              {children}
              <FloatingDonation />
            </ForumProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
