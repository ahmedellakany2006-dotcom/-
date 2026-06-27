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
  increment 
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
      parentId: parentId || null,
    });

    // Increment replies count on the topic
    const topicRef = doc(db, 'topics', topicId);
    await updateDoc(topicRef, {
      repliesCount: increment(1)
    });
  };

  const toggleLikeTopic = async (topicId: string) => {
    const topicRef = doc(db, 'topics', topicId);
    await updateDoc(topicRef, {
      likes: increment(1) // In a real app, track user likes to prevent multi-liking
    });
  };

  const toggleLikeComment = async (commentId: string) => {
    const commentRef = doc(db, 'comments', commentId);
    await updateDoc(commentRef, {
      likes: increment(1)
    });
  };

  const incrementViews = async (topicId: string) => {
    const topicRef = doc(db, 'topics', topicId);
    await updateDoc(topicRef, {
      views: increment(1)
    });
  };

  return (
    <ForumContext.Provider value={{ 
      topics, 
      comments, 
      addTopic, 
      addComment, 
      toggleLikeTopic, 
      toggleLikeComment,
      incrementViews
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
