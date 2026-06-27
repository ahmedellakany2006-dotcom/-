"use client";

import { use } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBookById } from "@/lib/booksData";
import { BookCover } from "@/components/books/BookCover";
import Link from "next/link";
import { ArrowRight, BookOpen, Download, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const book = getBookById(resolvedParams.id);

  if (!book) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-[#faf7f2] flex flex-col items-center justify-center min-h-screen">
          <p className="text-red-500 font-bold text-xl">لم يتم العثور على الكتاب.</p>
          <Link href="/books" className="mt-4 text-[#8B5A2B] hover:underline">العودة للمكتبة</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen bg-[#faf7f2] relative pt-32 pb-24">
        {/* Heritage Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <Link href="/books" className="inline-flex items-center gap-2 text-[#8B5A2B]/70 hover:text-[#8B5A2B] font-bold mb-8 transition-colors">
            <ArrowRight className="w-5 h-5" />
            العودة للمكتبة
          </Link>

          <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-16 border border-[#e5d8b8] flex flex-col md:flex-row gap-12 items-start relative overflow-hidden">
            {/* Background decoration inside card */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#f3ead3] to-transparent pointer-events-none" />

            {/* Book Cover Right Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full md:w-1/3 flex justify-center relative z-10"
            >
              <div className="w-[200px] md:w-[280px] h-[300px] md:h-[400px] shadow-[15px_15px_30px_rgba(0,0,0,0.3)] rounded-r-2xl rounded-l-sm overflow-hidden border-l-[8px] border-l-[#e8dcc4] relative">
                {/* Book Front Cover */}
                <div className="absolute inset-0 backface-hidden rounded-r-2xl rounded-l-md overflow-hidden">
                  <BookCover 
                    title={book.title}
                    author={book.author}
                    color={book.coverColor}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 mix-blend-overlay pointer-events-none" />
                </div>
              </div>
            </motion.div>

            {/* Book Details Left Side */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full md:w-2/3 relative z-10"
            >
              <div className="inline-block px-4 py-1 rounded-full bg-[#8B5A2B]/10 text-[#8B5A2B] font-bold text-sm mb-6 border border-[#8B5A2B]/20">
                {book.category === 'dictionary' ? 'معجم لغوي' : 
                 book.category === 'hadith' ? 'حديث شريف' : 
                 book.category === 'fiqh' ? 'فقه وعقيدة' : 'كتاب عام'}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#4a2e1b] mb-4 leading-tight font-serif">
                {book.title}
              </h1>
              
              <h2 className="text-2xl text-[#8B5A2B] font-semibold mb-8">
                تأليف: {book.author}
              </h2>

              <div className="bg-[#fcfaf7] border border-[#e5d8b8] rounded-2xl p-6 mb-8">
                <h3 className="flex items-center gap-2 text-lg font-bold text-[#5c3a21] mb-3">
                  <Info className="w-5 h-5 text-[#8B5A2B]" />
                  نبذة عن الكتاب
                </h3>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-white border border-[#e5d8b8] p-4 rounded-xl flex items-center justify-between">
                  <span className="text-[#8B5A2B]/60 font-bold">سنة النشر/الوفاة</span>
                  <span className="text-[#5c3a21] font-bold">{book.year}</span>
                </div>
                <div className="bg-white border border-[#e5d8b8] p-4 rounded-xl flex items-center justify-between">
                  <span className="text-[#8B5A2B]/60 font-bold">عدد الصفحات</span>
                  <span className="text-[#5c3a21] font-bold">{book.pages}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => alert("سيتم قريباً توفير خاصية القراءة الإلكترونية التفاعلية المباشرة داخل الموقع.")}
                  className="flex-1 bg-[#8B5A2B] hover:bg-[#6e4620] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <BookOpen className="w-6 h-6" />
                  قراءة الكتاب
                </button>
                <button 
                  onClick={() => alert("عذراً، التحميل غير متاح حالياً للحفاظ على حقوق الملكية الفكرية، أو أنه جاري توفير النسخة المعتمدة.")}
                  className="flex-1 bg-white hover:bg-[#f3ead3] text-[#8B5A2B] border-2 border-[#8B5A2B] py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-6 h-6" />
                  تحميل PDF
                </button>
              </div>

            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
