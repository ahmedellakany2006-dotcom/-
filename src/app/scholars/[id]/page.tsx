"use client";

import { useState, useRef, useEffect, use } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getScholarById, formatSurahNumber } from "@/lib/scholarsData";
import { SURAH_NAMES, toArabicNumber } from "@/lib/quranApi";
import { Play, Pause, Volume2, SkipBack, SkipForward } from "lucide-react";
import Link from "next/link";

export default function ScholarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const scholar = getScholarById(resolvedParams.id);
  
  const [playingSurah, setPlayingSurah] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    audioRef.current = new Audio();
    
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      // Optional: Auto play next surah
      if (playingSurah && playingSurah < 114) {
        playSurah(playingSurah + 1);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
      audio.src = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playSurah = (surahNumber: number) => {
    if (!scholar || !audioRef.current) return;
    
    if (playingSurah === surahNumber) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      const paddedNum = formatSurahNumber(surahNumber);
      const url = `${scholar.audioServer}${paddedNum}.mp3`;
      audioRef.current.src = url;
      audioRef.current.play();
      setPlayingSurah(surahNumber);
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!scholar) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-white flex flex-col items-center justify-center min-h-screen">
          <p className="text-red-500 font-bold text-xl">لم يتم العثور على الشيخ.</p>
          <Link href="/scholars" className="mt-4 text-primary hover:underline">العودة لقائمة القراء</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 min-h-screen pb-32">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 min-h-[50vh] flex items-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            {/* Blurred Background */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={scholar.image} 
              alt={scholar.name} 
              className="w-full h-full object-cover opacity-20 scale-110 blur-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/20 to-transparent" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
            {/* Scholar Profile Image */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={scholar.image} 
                alt={scholar.name} 
                className="w-full h-full object-cover object-top"
              />
            </div>
            
            <div className="flex-1 text-center md:text-right">
              <span className="bg-primary/20 text-primary px-4 py-1 rounded-full font-bold text-sm mb-4 inline-block backdrop-blur-md">المصحف المرتل</span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">{scholar.name}</h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl drop-shadow-md">
                {scholar.bio}
              </p>
            </div>
          </div>
        </section>

        {/* Surahs List */}
        <section className="max-w-7xl mx-auto px-4 py-12 relative z-10 -mt-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-primary/10">
            <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <Volume2 className="text-primary w-6 h-6" />
              اختر السورة للاستماع
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {SURAH_NAMES.map((name, index) => {
                const surahNumber = index + 1;
                const isCurrentlyPlaying = playingSurah === surahNumber;
                
                return (
                  <button
                    key={surahNumber}
                    onClick={() => playSurah(surahNumber)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      isCurrentlyPlaying 
                        ? "bg-primary border-primary text-white shadow-md transform scale-[1.02]" 
                        : "bg-gray-50 border-gray-200 hover:border-primary/50 hover:bg-white text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCurrentlyPlaying ? "bg-white/20" : "bg-primary/10 text-primary"
                      }`}>
                        {toArabicNumber(surahNumber)}
                      </div>
                      <span className="font-bold text-lg">سورة {name}</span>
                    </div>
                    
                    {isCurrentlyPlaying && isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className={`w-5 h-5 ${isCurrentlyPlaying ? '' : 'opacity-50'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Floating Audio Player */}
      {playingSurah && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-primary/20 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] z-50 transform transition-transform duration-500 ease-in-out translate-y-0">
          <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              
              {/* Scholar & Surah Info */}
              <div className="flex items-center gap-4 min-w-[200px]">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Volume2 className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-primary">سورة {SURAH_NAMES[playingSurah - 1]}</h3>
                  <p className="text-sm text-foreground/60">{scholar.name}</p>
                </div>
              </div>

              {/* Controls & Progress */}
              <div className="flex-1 w-full flex flex-col items-center gap-2">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => playingSurah > 1 && playSurah(playingSurah - 1)}
                    className="text-foreground/50 hover:text-primary transition-colors"
                  >
                    <SkipForward className="w-6 h-6" /> {/* SkipForward looks like SkipBack in RTL */}
                  </button>
                  
                  <button 
                    onClick={() => playSurah(playingSurah)}
                    className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg shadow-primary/30"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </button>
                  
                  <button 
                    onClick={() => playingSurah < 114 && playSurah(playingSurah + 1)}
                    className="text-foreground/50 hover:text-primary transition-colors"
                  >
                    <SkipBack className="w-6 h-6" /> {/* SkipBack looks like SkipForward in RTL */}
                  </button>
                </div>

                <div className="w-full flex items-center gap-3 text-sm font-sans text-foreground/60">
                  <span>{formatTime(currentTime)}</span>
                  <input 
                    type="range" 
                    min="0" 
                    max={duration || 100} 
                    value={currentTime} 
                    onChange={handleSeek}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* End Spacer to balance layout on desktop */}
              <div className="hidden md:block min-w-[200px]"></div>

            </div>
          </div>
        </div>
      )}

      {/* Adjust footer when player is active to prevent overlapping content */}
      <div className={playingSurah ? "pb-32" : ""}>
        <Footer />
      </div>
    </>
  );
}
