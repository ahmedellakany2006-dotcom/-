"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { bookCategories, books, Book } from "@/lib/booksData";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, LibraryBig } from "lucide-react";
import { BookCover } from "@/components/books/BookCover";

export default function LibraryIndexPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBooks = books.filter((book) => {
    const matchesCategory = activeCategory === "all" || book.category === activeCategory;
    const matchesSearch = book.title.includes(searchQuery) || book.author.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen relative overflow-hidden bg-[#faf7f2] pt-32">
        {/* Heritage Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative z-10 text-center px-4 bg-gradient-to-b from-[#f3ead3] to-[#faf7f2] border-b border-[#e5d8b8] shadow-sm">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-md text-[#8B5A2B] mb-6"
            >
              <LibraryBig className="w-12 h-12" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-[#5c3a21] mb-6 drop-shadow-sm font-serif"
            >
              المكتبة التراثية
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#7a5c43] max-w-2xl mx-auto leading-relaxed mb-10"
            >
              منهل العلم الصافي، يضم أمهات الكتب في المعاجم، الأحاديث، الفقه، والتاريخ.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#8B5A2B]/50">
                <Search className="w-6 h-6" />
              </div>
              <input 
                type="text"
                placeholder="ابحث عن اسم كتاب أو مؤلف..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-[#e5d8b8] text-[#5c3a21] placeholder-[#8B5A2B]/40 rounded-full py-4 pr-14 pl-6 text-lg focus:outline-none focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#8B5A2B]/20 transition-all shadow-inner"
              />
            </motion.div>
          </div>
        </section>

        {/* Categories Bar */}
        <section className="border-b border-[#e5d8b8] bg-white/50 backdrop-blur-md sticky top-16 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex overflow-x-auto hide-scrollbar py-4 gap-4 justify-start md:justify-center">
              {bookCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`whitespace-nowrap px-6 py-2 rounded-full font-bold transition-all ${
                    activeCategory === cat.id 
                      ? 'bg-[#8B5A2B] text-white shadow-md' 
                      : 'bg-transparent text-[#8B5A2B] border border-[#e5d8b8] hover:bg-[#8B5A2B]/10'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Books Grid - Wooden Shelf Design */}
        <section className="max-w-7xl mx-auto px-4 py-16 relative z-10 min-h-[50vh]">
          
          {filteredBooks.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-[#8B5A2B]/50 font-bold">لم يتم العثور على كتب تطابق بحثك.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 gap-y-16">
              {filteredBooks.map((book, index) => (
                <motion.div 
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col items-center relative"
                >
                  <Link href={`/books/${book.id}`} className="w-full">
                    {/* Book Cover */}
                    <div className="relative w-[140px] md:w-[180px] h-[200px] md:h-[260px] mx-auto perspective-1000 mb-6">
                      <div className="absolute inset-0 transform preserve-3d translate-z-1 group-hover:translate-z-4 transition-transform duration-500">
                        <BookCover 
                          title={book.title}
                          author={book.author}
                          color={book.coverColor}
                        />
                      </div>
                    </div>
                    
                    {/* Shelf Wood Below Book */}
                    <div className="absolute top-[210px] md:top-[270px] left-[-20%] right-[-20%] h-4 bg-gradient-to-b from-[#8c6746] to-[#5c3a21] shadow-xl rounded-sm -z-10" />
                    
                    {/* Book Info */}
                    <div className="text-center mt-6">
                      <h3 className="text-xl font-bold text-[#4a2e1b] group-hover:text-[#8B5A2B] transition-colors line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-[#8B5A2B]/70 font-semibold text-sm mt-1">
                        {book.author}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
          
        </section>
      </main>
      <Footer />
    </>
  );
}
