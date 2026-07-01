"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MessageSquare, ThumbsUp, Eye, Clock, PlusCircle, X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForum } from "@/contexts/ForumContext";
import { useAuth } from "@/contexts/AuthContext";

export default function ForumPage() {
  const { topics, addTopic, toggleLikeTopic, deleteTopic } = useForum();
  const { isAuthenticated, user } = useAuth();
  
  const [activeTab, setActiveTab] = useState("الكل");
  const tabs = ["الكل", "القرآن الكريم", "الحديث الشريف", "العقيدة", "الفقه", "التاريخ"];

  const filteredTopics = activeTab === "الكل" 
    ? topics 
    : topics.filter(t => t.category === activeTab);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  const [newTopicCategory, setNewTopicCategory] = useState("القرآن الكريم");

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("يرجى تسجيل الدخول أولاً لإضافة موضوع.");
      return;
    }
    if (!newTopicTitle.trim() || !newTopicContent.trim()) return;

    addTopic(newTopicTitle, newTopicContent, newTopicCategory);
    setIsModalOpen(false);
    setNewTopicTitle("");
    setNewTopicContent("");
    setNewTopicCategory("القرآن الكريم");
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white py-12 pt-32 min-h-screen relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">المنتدى الإسلامي</h1>
              <p className="text-foreground/70">شارك في النقاشات، اطرح أسئلتك، واستفد من علم الآخرين.</p>
            </div>
            <button 
              onClick={() => {
                if (!isAuthenticated) alert("يرجى تسجيل الدخول أولاً.");
                else setIsModalOpen(true);
              }}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-bold transition-all shadow-md flex items-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              موضوع جديد
            </button>
          </div>

          <div className="flex overflow-x-auto pb-4 mb-6 hide-scrollbar gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
                  activeTab === tab 
                    ? "bg-secondary text-white shadow-md" 
                    : "bg-white border border-primary/10 text-foreground/70 hover:bg-primary/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-primary/20 overflow-hidden min-h-[400px]">
            {filteredTopics.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-foreground/50">
                <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-xl">لا توجد مواضيع في هذا القسم بعد.</p>
              </div>
            ) : (
              filteredTopics.map((topic, i) => {
                const dateObj = new Date(topic.createdAt);
                const timeString = dateObj.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });

                return (
                  <motion.div 
                    key={topic.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="p-6 border-b border-primary/10 last:border-0 hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                      <div className="flex-1">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">
                          {topic.category}
                        </span>
                        <Link href={`/forum/${topic.id}`}>
                          <h2 className="text-xl font-bold text-foreground hover:text-primary transition-colors mb-2 cursor-pointer">
                            {topic.title}
                          </h2>
                        </Link>
                        <div className="flex items-center gap-4 text-sm text-foreground/60">
                          <span className="flex items-center gap-1">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={topic.authorAvatar} alt="avatar" className="w-6 h-6 rounded-full border border-primary/20" />
                            {topic.authorName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {timeString}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 text-foreground/50 border-t md:border-t-0 md:border-r border-primary/10 pt-4 md:pt-0 md:pr-6">
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-foreground">{topic.repliesCount}</span>
                          <span className="text-xs flex items-center gap-1"><MessageSquare className="w-3 h-3"/> ردود</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-foreground">{topic.views}</span>
                          <span className="text-xs flex items-center gap-1"><Eye className="w-3 h-3"/> مشاهدة</span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            if (isAuthenticated) toggleLikeTopic(topic.id);
                            else alert('سجل دخولك للإعجاب');
                          }}
                          className="flex flex-col items-center hover:text-primary transition-colors"
                        >
                          <span className="font-bold text-primary">{topic.likes}</span>
                          <span className="text-xs flex items-center gap-1"><ThumbsUp className="w-3 h-3"/> إعجاب</span>
                        </button>
                        {user?.role === 'admin' && (
                          <button 
                            onClick={(e) => {
                              e.preventDefault(); // Prevent navigating to the topic
                              if (confirm('هل أنت متأكد من حذف الموضوع بالكامل؟')) {
                                deleteTopic(topic.id);
                              }
                            }}
                            className="flex flex-col items-center text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 mb-1" />
                            <span className="text-xs font-bold">حذف</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* New Topic Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden"
              >
                <div className="flex justify-between items-center p-6 border-b border-primary/10 bg-[#f8f5ed]">
                  <h3 className="text-2xl font-bold text-primary">إضافة موضوع جديد</h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 text-foreground/50 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleCreateTopic} className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">عنوان الموضوع</label>
                    <input 
                      type="text" 
                      value={newTopicTitle}
                      onChange={(e) => setNewTopicTitle(e.target.value)}
                      placeholder="اكتب عنواناً واضحاً لموضوعك..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">القسم</label>
                    <select 
                      value={newTopicCategory}
                      onChange={(e) => setNewTopicCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    >
                      {tabs.filter(t => t !== "الكل").map(tab => (
                        <option key={tab} value={tab}>{tab}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">محتوى الموضوع</label>
                    <textarea 
                      value={newTopicContent}
                      onChange={(e) => setNewTopicContent(e.target.value)}
                      placeholder="اكتب تفاصيل موضوعك أو سؤالك هنا..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[150px] resize-y"
                      required
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2.5 rounded-full font-bold text-foreground/70 hover:bg-gray-100 transition-colors"
                    >
                      إلغاء
                    </button>
                    <button 
                      type="submit" 
                      className="px-8 py-2.5 rounded-full font-bold text-white bg-primary hover:bg-primary/90 shadow-md transition-colors"
                    >
                      نشر الموضوع
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>
      <Footer />
    </>
  );
}
