'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useForum } from '@/contexts/ForumContext';
import { User, MessageSquare, ThumbsUp, FileText, Settings, LogOut, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const { topics, comments } = useForum();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null; // Will redirect
  }

  // Calculate stats
  const userTopics = topics.filter(t => t.authorId === user.id);
  const userComments = comments.filter(c => c.authorId === user.id);
  
  const totalTopicLikes = userTopics.reduce((acc, topic) => acc + topic.likes, 0);
  const totalCommentLikes = userComments.reduce((acc, comment) => acc + comment.likes, 0);
  const totalLikes = totalTopicLikes + totalCommentLikes;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleUpgradeToAdmin = async () => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.id), { role: 'admin' });
      alert("تمت ترقيتك بنجاح! سيتم تحديث الصفحة...");
      window.location.reload();
    } catch (e) {
      console.error(e);
      alert("حدث خطأ أثناء الترقية.");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('الرجاء اختيار صورة صالحة.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('حجم الصورة كبير جداً، اختر صورة أقل من 2 ميجابايت.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64String = event.target?.result as string;
      
      const img = new Image();
      img.src = base64String;
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const compressedBase64 = canvas.toDataURL('image/webp', 0.7);

        try {
          if (!user) return;
          await updateDoc(doc(db, 'users', user.id), { avatar: compressedBase64 });
          alert('تم تحديث الصورة الشخصية بنجاح! سيتم تحديث الصفحة.');
          window.location.reload();
        } catch (error) {
          console.error(error);
          alert('حدث خطأ أثناء رفع الصورة.');
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen pt-32 pb-20 transition-colors">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />
        
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          
          {/* Profile Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-sm border border-primary/10 dark:border-gray-700 mb-8 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="relative group cursor-pointer w-32 h-32 flex-shrink-0 mx-auto md:mx-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=user"} 
                alt="Profile" 
                className="w-full h-full rounded-full border-4 border-primary/20 dark:border-emerald-500/30 object-cover"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                title="تغيير الصورة الشخصية"
              >
                <Camera className="w-8 h-8 text-white" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
            
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl font-bold text-primary dark:text-emerald-400 mb-2">{user.name}</h1>
              <p className="text-foreground/60 dark:text-gray-400 mb-6">{user.email}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link href="/settings" className="flex items-center gap-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-foreground dark:text-white rounded-full font-bold transition-colors">
                  <Settings className="w-4 h-4" /> الإعدادات
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-2 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 rounded-full font-bold transition-colors">
                  <LogOut className="w-4 h-4" /> تسجيل الخروج
                </button>
                {user.role !== 'admin' && (
                  <button onClick={handleUpgradeToAdmin} className="flex items-center gap-2 px-6 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full font-bold transition-colors">
                    ترقية لمشرف (زر مؤقت)
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-primary/10 dark:border-gray-700 flex items-center gap-4"
            >
              <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-foreground/60 dark:text-gray-400 font-bold mb-1">المواضيع</p>
                <p className="text-3xl font-bold text-foreground dark:text-white">{userTopics.length}</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-primary/10 dark:border-gray-700 flex items-center gap-4"
            >
              <div className="p-4 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl">
                <MessageSquare className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-foreground/60 dark:text-gray-400 font-bold mb-1">التعليقات والردود</p>
                <p className="text-3xl font-bold text-foreground dark:text-white">{userComments.length}</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-primary/10 dark:border-gray-700 flex items-center gap-4"
            >
              <div className="p-4 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl">
                <ThumbsUp className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm text-foreground/60 dark:text-gray-400 font-bold mb-1">الإعجابات المتلقاة</p>
                <p className="text-3xl font-bold text-foreground dark:text-white">{totalLikes}</p>
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-primary dark:text-emerald-400 mb-6 flex items-center gap-2">
              <User className="w-6 h-6" /> أحدث مواضيعك
            </h2>
            
            {userTopics.length > 0 ? (
              <div className="space-y-4">
                {userTopics.slice(0, 5).map(topic => (
                  <Link href={`/forum/${topic.id}`} key={topic.id} className="block bg-white dark:bg-gray-800 p-6 rounded-2xl border border-primary/10 dark:border-gray-700 hover:border-primary/50 dark:hover:border-emerald-500/50 transition-colors">
                    <h3 className="text-lg font-bold text-foreground dark:text-white mb-2">{topic.title}</h3>
                    <p className="text-sm text-foreground/60 dark:text-gray-400 line-clamp-2">{topic.content}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-3xl border border-primary/10 dark:border-gray-700">
                <p className="text-foreground/60 dark:text-gray-400">لم تقم بكتابة أي مواضيع بعد.</p>
                <Link href="/forum" className="inline-block mt-4 text-primary dark:text-emerald-400 font-bold hover:underline">
                  اذهب للمنتدى واكتب أول موضوع
                </Link>
              </div>
            )}
          </motion.div>

        </div>
      </main>
      <Footer />
    </>
  );
}
