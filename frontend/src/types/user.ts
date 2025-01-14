export type UserRole = 'USER' | 'ADMIN' | 'BOARD_ADMIN';

export interface User {
  userId: number;
  username: string;
  studentId?: string;
  avatarUrl?: string;
  role: UserRole;
  managedBoards?: number[];
}

export interface LoginForm {
  username: string;
  password: string;
} 