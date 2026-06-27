'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Settings, Bell, Shield, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen pt-32 pb-20 transition-colors">
        <div className="max-w-4xl mx-auto px-4">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="p-3 bg-primary/10 dark:bg-emerald-500/20 text-primary dark:text-emerald-400 rounded-2xl">
              <Settings className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-primary dark:text-emerald-400">الإعدادات</h1>
          </motion.div>

          <div className="space-y-6">
            
            {/* Appearance Settings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-primary/10 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-foreground dark:text-white mb-6 flex items-center gap-2">
                <Sun className="w-5 h-5 text-primary dark:text-emerald-400" /> المظهر
              </h2>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                <div>
                  <p className="font-bold text-foreground dark:text-white">الوضع الليلي (Dark Mode)</p>
                  <p className="text-sm text-foreground/60 dark:text-gray-400">تغيير ألوان الموقع لتناسب القراءة الليلية</p>
                </div>
                <button 
                  onClick={toggleDarkMode}
                  className={`relative w-16 h-8 rounded-full transition-colors ${isDarkMode ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${isDarkMode ? 'left-1' : 'right-1'}`}>
                    {isDarkMode ? <Moon className="w-4 h-4 text-primary m-1" /> : <Sun className="w-4 h-4 text-amber-500 m-1" />}
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Notifications Settings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-primary/10 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-foreground dark:text-white mb-6 flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary dark:text-emerald-400" /> الإشعارات
              </h2>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                <div>
                  <p className="font-bold text-foreground dark:text-white">إشعارات المنتدى</p>
                  <p className="text-sm text-foreground/60 dark:text-gray-400">تلقي إشعارات عند تفاعل الأعضاء مع مواضيعك</p>
                </div>
                <button 
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`relative w-16 h-8 rounded-full transition-colors ${notificationsEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${notificationsEnabled ? 'left-1' : 'right-1'}`} />
                </button>
              </div>
            </motion.div>

            {/* Account Settings */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 shadow-sm border border-primary/10 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-foreground dark:text-white mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary dark:text-emerald-400" /> الحساب والبيانات
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-foreground/60 dark:text-gray-400" />
                    <div>
                      <p className="font-bold text-foreground dark:text-white">إدارة الحساب</p>
                      <p className="text-sm text-foreground/60 dark:text-gray-400">تعديل البريد الإلكتروني وكلمة المرور</p>
                    </div>
                  </div>
                  <button className="text-primary dark:text-emerald-400 font-bold hover:underline">تعديل</button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                  <div>
                    <p className="font-bold text-foreground dark:text-white">توفير البيانات</p>
                    <p className="text-sm text-foreground/60 dark:text-gray-400">تقليل جودة الصور والصوتيات لتوفير الإنترنت</p>
                  </div>
                  <button 
                    onClick={() => setDataSaver(!dataSaver)}
                    className={`relative w-16 h-8 rounded-full transition-colors ${dataSaver ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${dataSaver ? 'left-1' : 'right-1'}`} />
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
