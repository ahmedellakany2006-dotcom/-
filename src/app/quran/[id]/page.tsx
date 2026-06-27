"use client";

import { useEffect, useState, use } from "react";
import { getSurahUthmani, getSurahTafsir, SurahDetail, toArabicNumber, SURAH_NAMES } from "@/lib/quranApi";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Loader2, BookOpen, Settings } from "lucide-react";

export default function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [surah, setSurah] = useState<SurahDetail | null>(null);
  const [tafsir, setTafsir] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Settings
  const [showTafsir, setShowTafsir] = useState(false);
  const [fontSize, setFontSize] = useState(36); // px

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [surahData, tafsirData] = await Promise.all([
          getSurahUthmani(resolvedParams.id),
          getSurahTafsir(resolvedParams.id)
        ]);
        setSurah(surahData);
        setTafsir(tafsirData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-white flex flex-col items-center justify-center min-h-screen">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="text-primary font-bold text-xl">جارٍ تحميل السورة...</p>
        </main>
      </>
    );
  }

  if (!surah) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-white flex flex-col items-center justify-center min-h-screen">
          <p className="text-red-500 font-bold text-xl">لم يتم العثور على السورة.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white py-12 pt-32 min-h-screen relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block border-y-2 border-primary/30 py-4 px-12 mb-8 relative">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-primary text-2xl">✨</div>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-primary text-2xl">✨</div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary font-quran leading-loose">
                سورة {SURAH_NAMES[surah.number - 1]}
              </h1>
            </div>
            
            {/* Settings Bar */}
            <div className="flex flex-wrap items-center justify-center gap-6 bg-gray-50 rounded-2xl p-4 border border-primary/10 max-w-2xl mx-auto">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setFontSize(f => Math.max(20, f - 4))}
                  className="w-10 h-10 rounded-full bg-white border border-primary/20 flex items-center justify-center hover:bg-primary/5 text-primary font-bold transition-colors"
                >
                  A-
                </button>
                <button 
                  onClick={() => setFontSize(f => Math.min(60, f + 4))}
                  className="w-10 h-10 rounded-full bg-white border border-primary/20 flex items-center justify-center hover:bg-primary/5 text-primary font-bold transition-colors"
                >
                  A+
                </button>
              </div>

              <div className="w-px h-8 bg-primary/20" />

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={showTafsir}
                    onChange={(e) => setShowTafsir(e.target.checked)}
                  />
                  <div className={`block w-14 h-8 rounded-full transition-colors ${showTafsir ? 'bg-primary' : 'bg-gray-300'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${showTafsir ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </div>
                <span className="font-bold text-foreground/80 group-hover:text-primary transition-colors flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  إظهار التفسير (الميسر)
                </span>
              </label>
            </div>
          </div>

          {/* Bismillah */}
          {surah.number !== 1 && surah.number !== 9 && (
            <div className="text-center mb-12">
              <p className="font-quran text-4xl text-foreground/90" style={{ fontSize: `${fontSize}px` }}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>
          )}

          {/* Reading Area */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-primary/20 leading-loose text-center">
            
            {!showTafsir ? (
              // Connected Uthmani Text View
              <div 
                className="font-quran text-foreground/90 mx-auto" 
                style={{ 
                  fontSize: `${fontSize}px`, 
                  lineHeight: '2.5',
                  wordSpacing: '5px'
                }}
                dir="rtl"
              >
                {surah.ayahs.map((ayah, i) => {
                  // The API sometimes includes Bismillah in the first ayah of Al-Fatiha, we keep it as is.
                  // For other surahs, it might have it in the text. Alquran.cloud removes it from the text usually, except Fatiha.
                  // Wait, actually Alquran.cloud includes "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ " in ayah 1 of most surahs.
                  let text = ayah.text;
                  if (surah.number !== 1 && ayah.numberInSurah === 1) {
                     text = text.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\n", "");
                     text = text.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ", "");
                  }

                  return (
                    <span key={ayah.number}>
                      {text}
                      <span className="inline-flex items-center justify-center mx-2 text-primary">
                        <span className="text-[0.6em] relative top-[-0.2em] px-1 font-sans font-bold">
                           ﴿{toArabicNumber(ayah.numberInSurah)}﴾
                        </span>
                      </span>
                    </span>
                  );
                })}
              </div>
            ) : (
              // Tafsir Mode View (Line by Line)
              <div className="flex flex-col gap-12 text-right" dir="rtl">
                {surah.ayahs.map((ayah, index) => {
                  const tafsirAyah = tafsir?.ayahs[index];
                  let text = ayah.text;
                  if (surah.number !== 1 && ayah.numberInSurah === 1) {
                     text = text.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\n", "");
                     text = text.replace("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ", "");
                  }

                  return (
                    <div key={ayah.number} className="border-b border-primary/10 pb-10 last:border-0 last:pb-0">
                      <div className="flex flex-col gap-6">
                        <p 
                          className="font-quran text-foreground/90 leading-loose" 
                          style={{ fontSize: `${fontSize}px` }}
                        >
                          {text}
                          <span className="inline-flex items-center justify-center mx-2 text-primary">
                            <span className="text-[0.6em] relative top-[-0.2em] px-1 font-sans font-bold">
                               ﴿{toArabicNumber(ayah.numberInSurah)}﴾
                            </span>
                          </span>
                        </p>
                        
                        {tafsirAyah && (
                          <div className="bg-gray-50 rounded-2xl p-6 border-r-4 border-primary">
                            <p className="text-primary font-bold mb-2 flex items-center gap-2">
                              <BookOpen className="w-5 h-5" />
                              التفسير الميسر:
                            </p>
                            <p className="text-foreground/80 leading-relaxed text-xl font-sans">
                              {tafsirAyah.text}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
