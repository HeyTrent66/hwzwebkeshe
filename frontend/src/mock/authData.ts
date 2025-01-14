import { User } from '../types/index';

export const createMockAuthResponse = (userData: Partial<User>) => {
  const user: User = {
    userId: 1,
    username: userData.username || "测试用户",
    email: userData.email || "test@school.edu",
    avatarUrl: userData.avatarUrl || "",
    createdAt: new Date().toISOString(),
    status: 1,
    creditScore: 100,
    bio: userData.bio || "这是一个测试账号"
  };

  return {
    token: "mock-jwt-token",
    user
  };
}; 