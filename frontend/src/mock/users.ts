import { User } from '../types/user';

const generateStudentId = () => {
  return '2024' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
};

export const mockUsers: User[] = [
  {
    userId: 1,
    username: 'admin',
    studentId: generateStudentId(),
    role: 'ADMIN',
    avatarUrl: 'https://example.com/avatar1.jpg'
  },
  {
    userId: 2,
    username: 'boardadmin',
    studentId: generateStudentId(),
    role: 'BOARD_ADMIN',
    avatarUrl: 'https://example.com/avatar2.jpg',
    managedBoards: [1]
  },
  {
    userId: 3,
    username: 'user1',
    studentId: generateStudentId(),
    role: 'USER',
    avatarUrl: 'https://example.com/avatar3.jpg'
  }
]; 