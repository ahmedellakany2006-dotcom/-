"use client";

import { use } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getEraById } from "@/lib/historyData";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function HistoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const era = getEraById(resolvedParams.id);

  if (!era) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-white flex flex-col items-center justify-center min-h-screen">
          <p className="text-red-500 font-bold text-xl">لم يتم العثور على الحقبة الزمنية.</p>
          <Link href="/history" className="mt-4 text-primary hover:underline">العودة للتاريخ الإسلامي</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 min-h-screen pb-20">
        {/* Hero Banner */}
        <section className="relative pt-32 pb-24 min-h-[50vh] flex items-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={era.image} 
              alt={era.title} 
              className="w-full h-full object-cover opacity-40 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-black/50 to-transparent" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10 w-full text-center">
            <Link href="/history" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
              <ArrowRight className="w-5 h-5" />
              العودة للخط الزمني
            </Link>
            <span className="block text-primary bg-primary/20 backdrop-blur-md px-4 py-1 rounded-full font-bold text-sm mb-6 mx-auto w-max border border-primary/30">
              {era.dateRange}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {era.title}
            </h1>
            <p className="text-lg md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto drop-shadow-md">
              {era.description}
            </p>
          </div>
        </section>

        {/* Content Events / Articles */}
        <section className="max-w-5xl mx-auto px-4 py-16 relative z-10 -mt-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-primary/10">
            <h2 className="text-2xl font-bold text-primary mb-10 flex items-center gap-3 border-b border-gray-100 pb-4">
              <BookOpen className="w-6 h-6" />
              أبرز الأحداث والمقالات في هذا العصر
            </h2>
            
            <div className="relative border-r-2 border-primary/20 pr-8 space-y-12">
              {era.events.map((event, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={event.id} 
                  className="relative group cursor-pointer"
                >
                  {/* Timeline Node Dot */}
                  <div className="absolute -right-[41px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-primary group-hover:bg-primary transition-colors" />
                  
                  <div className="bg-gray-50 hover:bg-primary/5 p-6 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <span className="flex items-center gap-2 text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full w-max">
                        <Clock className="w-4 h-4" />
                        {event.year}
                      </span>
                    </div>
                    <p className="text-foreground/70 leading-relaxed text-lg">
                      {event.summary}
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link href={`/history/${era.id}/${event.id}`} className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all w-max">
                        اقرأ المزيد 
                        <span className="text-lg">←</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
