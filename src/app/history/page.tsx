"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { historyEras } from "@/lib/historyData";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function HistoryIndexPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 min-h-screen relative overflow-hidden">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-primary mb-6 drop-shadow-sm"
          >
            موسوعة التاريخ الإسلامي
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed"
          >
            رحلة عبر الزمن نستكشف فيها أعظم الأحداث والمواقف التي شكلت حضارة الإسلام منذ فجر النبوة وحتى يومنا هذا.
          </motion.p>
        </section>

        {/* Winding Timeline Section */}
        <section className="max-w-5xl mx-auto px-4 py-16 relative z-10">
          {/* Center Line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-16 bottom-16 w-1 bg-primary/20 transform -translate-x-1/2 rounded-full" />

          <div className="space-y-16 md:space-y-32">
            {historyEras.map((era, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={era.id} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Timeline Dot (Desktop only) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-white shadow-lg z-20 items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                  </div>

                  {/* Image Side */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/2"
                  >
                    <Link href={`/history/${era.id}`}>
                      <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-xl border border-primary/10 group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity group-hover:opacity-80" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={era.image} 
                          alt={era.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-bold border border-white/30">
                          {era.dateRange}
                        </div>
                      </div>
                    </Link>
                  </motion.div>

                  {/* Content Side */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`w-full md:w-1/2 text-center md:text-right ${!isEven && 'md:text-left'}`}
                  >
                    <h2 className={`text-3xl font-bold text-primary mb-4 flex items-center justify-center md:justify-start gap-4 ${!isEven && 'md:flex-row-reverse'}`}>
                      <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                        {index + 1}
                      </span>
                      {era.title}
                    </h2>
                    <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                      {era.description}
                    </p>
                    <Link 
                      href={`/history/${era.id}`}
                      className={`inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors group ${!isEven && 'md:flex-row-reverse'}`}
                    >
                      استكشف الحقبة
                      <ArrowLeft className={`w-5 h-5 transform group-hover:-translate-x-2 transition-transform ${!isEven && 'md:rotate-180 md:group-hover:translate-x-2'}`} />
                    </Link>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
