import request from './request';
import { User } from '../types';

interface FollowResponse {
  success: boolean;
  followersCount: number;
}

export const followUser = async (userId: number) => {
  const response = await request.post<FollowResponse>(`/users/${userId}/follow`);
  return response.data;
};

export const unfollowUser = async (userId: number) => {
  const response = await request.delete<FollowResponse>(`/users/${userId}/follow`);
  return response.data;
};

export const getFollowers = async (userId: number) => {
  const response = await request.get<User[]>(`/users/${userId}/followers`);
  return response.data;
};

export const getFollowing = async (userId: number) => {
  const response = await request.get<User[]>(`/users/${userId}/following`);
  return response.data;
};

export const updateProfile = async (data: {
  nickname?: string;
  bio?: string;
  avatarUrl?: string;
}) => {
  const response = await request.put<User>('/users/profile', data);
  return response.data;
};

export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  const response = await request.put('/users/password', data);
  return response.data;
}; 