'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  joinedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch custom user data from Firestore
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            setUser(userDocSnap.data() as User);
          } else {
            // Fallback if document doesn't exist for some reason
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'مستخدم',
              email: firebaseUser.email!,
              avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${firebaseUser.email}&backgroundColor=008C45`,
              role: 'user',
              joinedAt: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password?: string) => {
    if (!password) throw new Error("Password is required for Firebase auth");
    
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (name: string, email: string, password?: string) => {
    if (!password) throw new Error("Password is required for Firebase auth");

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newFirebaseUser = userCredential.user;
      
      const newUser: User = {
        id: newFirebaseUser.uid,
        name: name,
        email: email,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundColor=008C45`,
        role: 'user',
        joinedAt: new Date().toISOString(),
      };

      // Save custom user data to Firestore
      await setDoc(doc(db, 'users', newFirebaseUser.uid), newUser);
      
      // onAuthStateChanged will handle updating the state automatically
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
