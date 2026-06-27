import { getSurahs, toArabicNumber, SURAH_NAMES } from "@/lib/quranApi";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default async function QuranIndexPage() {
  const surahs = await getSurahs();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white py-12 pt-32 min-h-screen relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">القرآن الكريم</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              تصفح سور القرآن الكريم بالرسم العثماني.
            </p>
          </div>

          {surahs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-red-500 font-bold text-xl">حدث خطأ أثناء جلب السور. يرجى المحاولة لاحقاً.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {surahs.map((surah) => (
                <Link key={surah.number} href={`/quran/${surah.number}`}>
                  <div className="bg-white rounded-2xl p-6 border border-primary/20 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all group flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg rotate-45 group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="-rotate-45 block font-sans">{toArabicNumber(surah.number)}</span>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          سورة {SURAH_NAMES[surah.number - 1]}
                        </h2>
                        <p className="text-sm text-foreground/60">
                          {surah.revelationType === "Meccan" ? "مكية" : "مدنية"} • {toArabicNumber(surah.numberOfAyahs)} آية
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
