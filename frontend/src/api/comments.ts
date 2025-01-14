import { Comment } from '../types/comment';

const COMMENTS_STORAGE_KEY = 'local_comments';

// 获取评论列表
const getComments = (): Comment[] => {
  try {
    const commentsJson = localStorage.getItem(COMMENTS_STORAGE_KEY);
    console.log('Raw comments from storage:', commentsJson);
    if (!commentsJson) return [];
    
    const comments = JSON.parse(commentsJson);
    console.log('Parsed comments:', comments);
    return Array.isArray(comments) ? comments : [];
  } catch (error) {
    console.error('Error reading comments:', error);
    return [];
  }
};

// 保存评论
const saveComments = (comments: Comment[]) => {
  try {
    console.log('Saving comments:', comments);
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
    console.log('Comments saved successfully');
  } catch (error) {
    console.error('Error saving comments:', error);
    throw error;
  }
};

// 添加评论
export const addComment = async (
  postId: number, 
  content: string, 
  userId: number,
  replyToCommentId?: number
) => {
  const comments = getComments();
  
  // 获取用户信息
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  
  if (!user) {
    throw new Error('用户未登录');
  }

  // 如果是回复评论，获取被回复的评论信息
  let replyToInfo = undefined;
  if (replyToCommentId) {
    const replyToComment = comments.find(c => c.commentId === replyToCommentId);
    if (replyToComment) {
      replyToInfo = {
        commentId: replyToComment.commentId,
        username: replyToComment.author.username
      };
    }
  }

  const newComment: Comment = {
    commentId: Math.floor(Math.random() * 10000) + 1,
    postId,
    userId: user.userId,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    author: {
      userId: user.userId,
      username: user.username,
      avatarUrl: user.avatarUrl
    },
    likes: 0,
    isLiked: false,
    replyTo: replyToInfo
  };

  comments.unshift(newComment);
  saveComments(comments);

  return newComment;
};

// 获取用户的评论
export const getUserComments = async (userId: number) => {
  console.log('Getting comments for userId:', userId);
  const comments = getComments();
  const userComments = comments.filter(comment => comment.userId === userId);
  console.log('Found comments:', userComments);
  return userComments;
};

// 获取帖子的评论
export const getPostComments = async (postId: number) => {
  const comments = getComments();
  return comments.filter(comment => comment.postId === postId);
}; 