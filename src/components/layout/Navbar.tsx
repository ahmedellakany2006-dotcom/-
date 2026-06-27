"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, User, Bell, LogOut, Settings, ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-2 sm:top-6 inset-x-0 z-50 flex justify-center px-2 sm:px-4 pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-5xl backdrop-blur-md bg-white/95 border border-primary/20 shadow-lg rounded-2xl sm:rounded-full transition-all duration-300">
        <div className="px-4 sm:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl sm:text-2xl font-bold text-primary flex items-center gap-2">
                قد أفلح المؤمنون
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/quran" className="text-foreground hover:text-primary transition-colors font-semibold text-lg">القرآن الكريم</Link>
              <Link href="/history" className="text-foreground hover:text-primary transition-colors font-semibold text-lg">التاريخ الإسلامي</Link>
              <Link href="/scholars" className="text-foreground hover:text-primary transition-colors font-semibold text-lg">القراء</Link>
              <Link href="/books" className="text-foreground hover:text-primary transition-colors font-semibold text-lg">المكتبة</Link>
              <Link href="/forum" className="text-foreground hover:text-primary transition-colors font-semibold text-lg">المنتدى</Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="hidden sm:block p-2 text-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10">
                <Search className="w-5 h-5" />
              </button>
              <button className="hidden sm:block p-2 text-foreground hover:text-primary transition-colors rounded-full hover:bg-primary/10 relative">
                <Bell className="w-5 h-5" />
                {isAuthenticated && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />}
              </button>
              
              {isAuthenticated && user ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 bg-[#f0ebd8] hover:bg-[#e6d5b8] text-primary px-3 sm:px-4 py-1 sm:py-1.5 rounded-full transition-all shadow-sm border border-[#D4AF37]/30"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={user.avatar} alt="avatar" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#D4AF37]" />
                    <span className="font-semibold text-sm hidden md:block">{user.name}</span>
                    <ChevronDown className="w-4 h-4 text-primary/70" />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-4 w-48 bg-white rounded-2xl shadow-xl border border-[#D4AF37]/20 overflow-hidden"
                      >
                        <div className="p-3 bg-[#f8f5ed] border-b border-[#D4AF37]/10">
                          <p className="font-bold text-primary truncate">{user.name}</p>
                          <p className="text-xs text-foreground/60 truncate">{user.email}</p>
                        </div>
                        <div className="p-2 flex flex-col">
                          <Link onClick={() => setIsDropdownOpen(false)} href="/profile" className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-[#f0ebd8] hover:text-primary rounded-xl transition-colors">
                            <User className="w-4 h-4" /> ملفي الشخصي
                          </Link>
                          <Link onClick={() => setIsDropdownOpen(false)} href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-[#f0ebd8] hover:text-primary rounded-xl transition-colors">
                            <Settings className="w-4 h-4" /> الإعدادات
                          </Link>
                          <div className="h-px bg-gray-100 my-1 mx-2" />
                          <button 
                            onClick={() => {
                              logout();
                              setIsDropdownOpen(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full text-right"
                          >
                            <LogOut className="w-4 h-4" /> تسجيل خروج
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/login" className="hidden md:flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full hover:bg-primary/90 transition-all shadow-md font-bold">
                  <User className="w-4 h-4" />
                  تسجيل الدخول
                </Link>
              )}

              {/* Mobile Menu Toggle Button */}
              <button 
                className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-primary/10 bg-white rounded-b-2xl"
            >
              <div className="flex flex-col p-4 gap-4">
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/quran" className="text-foreground hover:text-primary font-semibold">القرآن الكريم</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/history" className="text-foreground hover:text-primary font-semibold">التاريخ الإسلامي</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/scholars" className="text-foreground hover:text-primary font-semibold">القراء</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/books" className="text-foreground hover:text-primary font-semibold">المكتبة</Link>
                <Link onClick={() => setIsMobileMenuOpen(false)} href="/forum" className="text-foreground hover:text-primary font-semibold">المنتدى</Link>
                
                {!isAuthenticated && (
                  <>
                    <div className="h-px bg-gray-100 my-2" />
                    <Link onClick={() => setIsMobileMenuOpen(false)} href="/login" className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold">
                      تسجيل الدخول
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
