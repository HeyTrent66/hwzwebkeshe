import { User } from './user';

export interface Comment {
  commentId: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  author: {
    userId: number;
    username: string;
    avatarUrl?: string;
  };
  likes: number;
  isLiked?: boolean;
  replyTo?: {
    commentId: number;
    username: string;
  };
  parentId?: number;
}

export interface CommentFormData {
  content: string;
  parentId?: number;
  replyTo?: {
    commentId: number;
    username: string;
  };
} 