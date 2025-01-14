import { Post } from '../types/index';
import { createMockAuthResponse } from './authData';

const defaultUser = createMockAuthResponse({}).user;

export const mockPosts: Post[] = [
  {
    postId: 1,
    title: "新生入学指南",
    content: "欢迎来到大学校园！这里是一些实用的入学建议...",
    author: defaultUser,
    createdAt: "2024-03-15",
    updatedAt: "2024-03-15",
    viewCount: 156,
    likeCount: 45,
    commentCount: 12,
    status: 1,
    isTop: false,
    isEssence: true,
    isLocked: false,
    boardId: 1
  },
  {
    postId: 2,
    title: "图书馆使用攻略",
    content: "图书馆资源丰富，这里是一些使用技巧...",
    author: {
      userId: 2,
      username: "图书馆管理员",
      email: "library@school.edu",
      avatarUrl: "",
      createdAt: "2024-01-01",
      status: 1,
      creditScore: 90
    },
    createdAt: "2024-03-16",
    updatedAt: "2024-03-16",
    viewCount: 89,
    likeCount: 23,
    commentCount: 8,
    status: 1,
    isTop: false,
    isEssence: false,
    isLocked: false,
    boardId: 1
  }
];

export const mockPostsResponse = {
  posts: mockPosts,
  totalPages: 5,
  currentPage: 1
}; 