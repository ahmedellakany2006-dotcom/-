'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) return;
    
    try {
      await login(email, password);
      router.push('/');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
      } else {
        setError(err.message || 'حدث خطأ أثناء تسجيل الدخول.');
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f5ed] flex items-center justify-center relative overflow-hidden pt-20">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/arabesque.png")' }}></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#008C45] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#D4AF37] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md px-4 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-primary/70 hover:text-primary font-bold mb-8 transition-colors">
          <ArrowRight className="w-5 h-5" />
          العودة للرئيسية
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-10 border border-[#D4AF37]/20"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2 font-serif">تسجيل الدخول</h1>
            <p className="text-foreground/60">أهلاً بك مجدداً في منتدى القرآن الكريم</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">البريد الإلكتروني</label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-primary/50">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50/50"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-foreground">كلمة المرور</label>
                <Link href="#" className="text-sm text-primary hover:underline font-medium">نسيت كلمة المرور؟</Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-primary/50">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50/50"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'تسجيل الدخول'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-foreground/60">
            ليس لديك حساب بعد؟{' '}
            <Link href="/register" className="text-primary hover:underline font-bold">
              إنشاء حساب جديد
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
