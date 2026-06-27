import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PrayerTimesWidget } from "@/components/home/PrayerTimes";
import { DailyInspiration } from "@/components/home/DailyInspiration";
import { ContentPreviews } from "@/components/home/ContentPreviews";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0 bg-black">
            {/* Fallback Image */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565552643954-1eb31a89626b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50" />
            {/* Local Video Placeholder */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70"
            >
              <source src="/kaaba.mp4" type="video/mp4" />
            </video>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 z-10" />
          </div>

          {/* Hero Content */}
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-20">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
              مرحبًا بكم في <span className="text-secondary">المنتدى الإسلامي</span>
            </h1>
            <p className="text-xl md:text-3xl text-white/90 mb-10 drop-shadow-md font-light">
              ﴿ قَدْ أَفْلَحَ الْمُؤْمِنُونَ * الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ ﴾
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/quran" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-primary/50 transform hover:-translate-y-1">
                تصفح القرآن الكريم
              </a>
              <a href="/forum" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-white/20 transform hover:-translate-y-1">
                شارك في المنتدى
              </a>
            </div>
          </div>
        </section>

        <PrayerTimesWidget />
        <DailyInspiration />
        <ContentPreviews />
      </main>
      <Footer />
    </>
  );
}
