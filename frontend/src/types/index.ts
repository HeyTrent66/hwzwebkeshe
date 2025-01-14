// 定义TypeScript类型
export interface User {
  userId: number;
  username: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  status: number;
  creditScore: number;
  bio?: string;
  followersCount?: number;
  followingCount?: number;
}

export interface Post {
  postId: number;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  isTop: boolean;
  isEssence: boolean;
  isLocked: boolean;
  status: number;
  boardId: number;
}

export interface Comment {
  commentId: number;
  postId: number;
  userId: number;
  parentId: number | null;
  content: string;
  createdAt: string;
  status: number;
  author?: User;
}

export interface Board {
  boardId: number;
  boardName: string;
  description: string;
  sortOrder: number;
  status: number;
} 