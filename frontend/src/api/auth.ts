import { User, LoginForm } from '../types/user';
import axios from 'axios';

const USERS_STORAGE_KEY = 'local_users';

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

export const login = async (username: string, password: string) => {
  try {
    // 先检查用户是否存在
    const checkUser = await axios.get(`/api/users/check/${username}`);
    
    if (!checkUser.data.exists) {
      throw new Error('用户不存在,请先注册');
    }

    const response = await axios.post('/api/auth/login', {
      username,
      password
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (values: LoginForm & { studentId: string }) => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  
  if (users.some((u: any) => u.username === values.username)) {
    throw new Error('用户名已存在');
  }

  const newUser = {
    userId: Math.floor(Math.random() * 10000) + 100,
    username: values.username,
    password: values.password, // 实际项目中应该加密存储
    studentId: values.studentId,
    role: 'USER' as const,
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${values.username}`
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  return {
    user: newUser,
    token: 'mock_token_' + Math.random()
  };
}; 