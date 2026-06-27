export type UserRole = "admin" | "moderator" | "member";

export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  badges: string[];
  createdAt: string;
  bio?: string;
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  categoryId: string;
  tags: string[];
  likes: number;
  views: number;
  repliesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  topicId: string;
  content: string;
  authorId: string;
  authorName: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}
