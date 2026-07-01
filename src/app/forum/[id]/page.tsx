'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForum } from '@/contexts/ForumContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowRight, MessageSquare, ThumbsUp, Eye, Clock, CornerDownLeft, Send, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopicPage() {
  const { id } = useParams();
  const router = useRouter();
  const { topics, comments, incrementViews, toggleLikeTopic, toggleLikeComment, addComment, deleteTopic, deleteComment } = useForum();
  const { user, isAuthenticated } = useAuth();
  
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const topic = topics.find(t => t.id === id);
  const topicComments = comments.filter(c => c.topicId === id);

  // Increment views on load
  useEffect(() => {
    if (topic && typeof id === 'string') {
      incrementViews(id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!topic) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-gray-50 flex items-center justify-center min-h-screen pt-32">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-4">الموضوع غير موجود!</h1>
            <Link href="/forum" className="text-primary hover:underline">العودة للمنتدى</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleAddComment = (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("يرجى تسجيل الدخول للتعليق.");
      return;
    }
    if (!newComment.trim()) return;

    addComment(topic.id, newComment, parentId);
    setNewComment("");
    setReplyingTo(null);
  };

  const handleDeleteTopic = async () => {
    if (confirm('هل أنت متأكد من حذف هذا الموضوع بالكامل؟')) {
      await deleteTopic(topic.id);
      router.push('/forum');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا التعليق؟')) {
      await deleteComment(commentId);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ar-EG', { 
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' 
    });
  };

  // Organize comments into a tree (1-level deep)
  const rootComments = topicComments.filter(c => !c.parentId);
  const getReplies = (parentId: string) => topicComments.filter(c => c.parentId === parentId);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 min-h-screen pt-32 pb-20 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <Link href="/forum" className="inline-flex items-center gap-2 text-primary/70 hover:text-primary font-bold mb-6 transition-colors">
            <ArrowRight className="w-5 h-5" />
            العودة للمنتدى
          </Link>

          {/* Topic Post */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-primary/20 p-6 md:p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                {topic.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-primary mb-6 leading-relaxed">
              {topic.title}
            </h1>

            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={topic.authorAvatar} alt="avatar" className="w-12 h-12 rounded-full border-2 border-primary/20" />
                <div>
                  <p className="font-bold text-foreground">{topic.authorName}</p>
                  <p className="text-sm text-foreground/50 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {formatDate(topic.createdAt)}
                  </p>
                </div>
              </div>
              {user?.role === 'admin' && (
                <button 
                  onClick={handleDeleteTopic}
                  className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors font-bold text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  حذف
                </button>
              )}
            </div>

            <div className="prose prose-lg prose-emerald max-w-none text-foreground/80 mb-10 leading-loose">
              {topic.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>

            <div className="flex items-center gap-6 text-foreground/60 bg-gray-50 p-4 rounded-2xl">
              <button 
                onClick={() => isAuthenticated ? toggleLikeTopic(topic.id) : alert('سجل دخولك للإعجاب')}
                className="flex items-center gap-2 hover:text-primary transition-colors font-bold"
              >
                <ThumbsUp className={`w-5 h-5 ${topic.likes > 0 ? 'text-primary' : ''}`} />
                {topic.likes} إعجاب
              </button>
              <div className="flex items-center gap-2 font-bold">
                <Eye className="w-5 h-5" />
                {topic.views} مشاهدة
              </div>
              <div className="flex items-center gap-2 font-bold">
                <MessageSquare className="w-5 h-5" />
                {topic.repliesCount} رد
              </div>
            </div>
          </motion.div>

          {/* Comments Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-6">الردود والتعليقات</h2>
            
            {/* Main Add Comment Box */}
            <div className="bg-white rounded-3xl shadow-sm border border-primary/20 p-4 md:p-6 mb-10">
              {isAuthenticated ? (
                <form onSubmit={(e) => handleAddComment(e)}>
                  <textarea 
                    value={!replyingTo ? newComment : ""}
                    onChange={(e) => !replyingTo && setNewComment(e.target.value)}
                    placeholder="أضف ردك أو مشاركتك هنا..."
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all min-h-[120px] resize-y mb-4 bg-gray-50"
                  />
                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      إضافة الرد
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6">
                  <p className="text-foreground/60 mb-4">يجب تسجيل الدخول لإضافة تعليق</p>
                  <Link href="/login" className="inline-block bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-primary/90 transition-colors">
                    تسجيل الدخول
                  </Link>
                </div>
              )}
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {rootComments.map((comment) => (
                <motion.div 
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl shadow-sm border border-primary/10 p-6"
                >
                  {/* Root Comment */}
                  <div className="flex gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={comment.authorAvatar} alt="avatar" className="w-10 h-10 rounded-full border border-primary/20 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-primary">{comment.authorName}</p>
                          <p className="text-xs text-foreground/50">{formatDate(comment.createdAt)}</p>
                        </div>
                        {user?.role === 'admin' && (
                          <button 
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-red-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-foreground/80 leading-relaxed mb-4">{comment.content}</p>
                      
                      <div className="flex items-center gap-4 text-sm font-bold text-foreground/60">
                        <button 
                          onClick={() => isAuthenticated ? toggleLikeComment(comment.id) : alert('سجل دخولك للإعجاب')}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                        >
                          <ThumbsUp className={`w-4 h-4 ${comment.likes > 0 ? 'text-primary' : ''}`} /> {comment.likes > 0 && comment.likes}
                        </button>
                        <button 
                          onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                        >
                          <CornerDownLeft className="w-4 h-4" /> رد
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Reply Input Box */}
                  {replyingTo === comment.id && isAuthenticated && (
                    <div className="mt-4 mr-14 pr-4 border-r-2 border-primary/20">
                      <form onSubmit={(e) => handleAddComment(e, comment.id)} className="flex gap-2">
                        <input 
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder={`الرد على ${comment.authorName}...`}
                          className="flex-1 px-4 py-2 text-sm rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none bg-gray-50"
                          autoFocus
                        />
                        <button type="submit" className="bg-secondary text-white px-4 py-2 rounded-xl text-sm font-bold">
                          إرسال
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Nested Replies */}
                  {getReplies(comment.id).length > 0 && (
                    <div className="mt-6 mr-6 md:mr-14 pr-4 border-r-2 border-primary/20 space-y-6">
                      {getReplies(comment.id).map(reply => (
                        <div key={reply.id} className="flex gap-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={reply.authorAvatar} alt="avatar" className="w-8 h-8 rounded-full border border-primary/20 flex-shrink-0" />
                          <div className="flex-1 bg-gray-50 p-4 rounded-2xl rounded-tr-none">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-bold text-primary text-sm">{reply.authorName}</p>
                                <p className="text-xs text-foreground/50">{formatDate(reply.createdAt)}</p>
                              </div>
                              {user?.role === 'admin' && (
                                <button 
                                  onClick={() => handleDeleteComment(reply.id)}
                                  className="text-red-400 hover:text-red-600 p-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            <p className="text-foreground/80 text-sm leading-relaxed mb-3">{reply.content}</p>
                            
                            <button 
                              onClick={() => isAuthenticated ? toggleLikeComment(reply.id) : alert('سجل دخولك للإعجاب')}
                              className="flex items-center gap-1 text-xs font-bold text-foreground/60 hover:text-primary transition-colors"
                            >
                              <ThumbsUp className={`w-3 h-3 ${reply.likes > 0 ? 'text-primary' : ''}`} /> {reply.likes > 0 && reply.likes}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
