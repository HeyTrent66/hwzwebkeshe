import { User } from './user';

export interface Post {
  postId: number;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  status: number;  // 0: 草稿, 1: 已发布, 2: 待审核, -1: 已删除
  isTop: boolean;  // 是否置顶
  isEssence: boolean;  // 是否精华
  isLocked: boolean;  // 是否锁定
  boardId: number;  // 所属板块
  tags: string[];  // 标签
  isLiked?: boolean;
}

export interface Board {
  boardId: number;
  name: string;
  description: string;
  postCount: number;
  order: number;
  parentId: number | null;  // 父板块ID，用于实现子板块
}

export interface Tag {
  tagId: number;
  name: string;
  postCount: number;
}

export interface CreatePostData {
  title: string;
  content: string;
  boardId: number;
  tags: string[];
} 