'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  increment,
  arrayUnion,
  arrayRemove,
  deleteDoc
} from 'firebase/firestore';

export interface Comment {
  id: string;
  topicId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  likedBy?: string[];
  parentId?: string; // If it's a reply to another comment
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  category: string;
  createdAt: string;
  likes: number;
  likedBy?: string[];
  views: number;
  repliesCount: number;
}

interface ForumContextType {
  topics: Topic[];
  comments: Comment[];
  addTopic: (title: string, content: string, category: string) => Promise<void>;
  addComment: (topicId: string, content: string, parentId?: string) => Promise<void>;
  toggleLikeTopic: (topicId: string) => Promise<void>;
  toggleLikeComment: (commentId: string) => Promise<void>;
  incrementViews: (topicId: string) => Promise<void>;
  deleteTopic: (topicId: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
}

const ForumContext = createContext<ForumContextType | undefined>(undefined);

export function ForumProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  // Listen to Topics from Firestore in Real-time
  useEffect(() => {
    const q = query(collection(db, 'topics'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTopics: Topic[] = [];
      snapshot.forEach((docSnap) => {
        fetchedTopics.push({ id: docSnap.id, ...docSnap.data() } as Topic);
      });
      setTopics(fetchedTopics);
    });

    return () => unsubscribe();
  }, []);

  // Listen to Comments from Firestore in Real-time
  useEffect(() => {
    const q = query(collection(db, 'comments'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments: Comment[] = [];
      snapshot.forEach((docSnap) => {
        fetchedComments.push({ id: docSnap.id, ...docSnap.data() } as Comment);
      });
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, []);

  const addTopic = async (title: string, content: string, category: string) => {
    if (!user) return;
    
    await addDoc(collection(db, 'topics'), {
      title,
      content,
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar,
      category,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      views: 0,
      repliesCount: 0,
    });
  };

  const addComment = async (topicId: string, content: string, parentId?: string) => {
    if (!user) return;

    // Add the comment
    await addDoc(collection(db, 'comments'), {
      topicId,
      content,
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      parentId: parentId || null,
    });

    // Increment replies count on the topic
    const topicRef = doc(db, 'topics', topicId);
    await updateDoc(topicRef, {
      repliesCount: increment(1)
    });
  };

  const toggleLikeTopic = async (topicId: string) => {
    if (!user) return;
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;

    const topicRef = doc(db, 'topics', topicId);
    const hasLiked = topic.likedBy?.includes(user.id);

    if (hasLiked) {
      await updateDoc(topicRef, {
        likes: increment(-1),
        likedBy: arrayRemove(user.id)
      });
    } else {
      await updateDoc(topicRef, {
        likes: increment(1),
        likedBy: arrayUnion(user.id)
      });
    }
  };

  const toggleLikeComment = async (commentId: string) => {
    if (!user) return;
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;

    const commentRef = doc(db, 'comments', commentId);
    const hasLiked = comment.likedBy?.includes(user.id);

    if (hasLiked) {
      await updateDoc(commentRef, {
        likes: increment(-1),
        likedBy: arrayRemove(user.id)
      });
    } else {
      await updateDoc(commentRef, {
        likes: increment(1),
        likedBy: arrayUnion(user.id)
      });
    }
  };

  const incrementViews = async (topicId: string) => {
    const topicRef = doc(db, 'topics', topicId);
    await updateDoc(topicRef, {
      views: increment(1)
    });
  };

  const deleteTopic = async (topicId: string) => {
    if (user?.role !== 'admin') return;
    await deleteDoc(doc(db, 'topics', topicId));
  };

  const deleteComment = async (commentId: string) => {
    if (user?.role !== 'admin') return;
    await deleteDoc(doc(db, 'comments', commentId));
  };

  return (
    <ForumContext.Provider value={{ 
      topics, 
      comments, 
      addTopic, 
      addComment, 
      toggleLikeTopic, 
      toggleLikeComment,
      incrementViews,
      deleteTopic,
      deleteComment
    }}>
      {children}
    </ForumContext.Provider>
  );
}

export function useForum() {
  const context = useContext(ForumContext);
  if (context === undefined) {
    throw new Error('useForum must be used within a ForumProvider');
  }
  return context;
}
