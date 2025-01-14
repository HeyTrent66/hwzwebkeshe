import React, { useState, useEffect } from 'react';
import { Space, Button, message, Modal } from 'antd';
import { 
  LikeOutlined, 
  StarOutlined, 
  ShareAltOutlined, 
  LikeFilled, 
  StarFilled,
  DeleteOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Post } from '../../types/post';

interface PostActionsProps {
  post: Post;
  onPostUpdate?: (updatedPost: Post) => void;
  onPostDelete?: () => void;
}

// 用于存储点赞和收藏记录的 key
const LIKES_STORAGE_KEY = 'user_likes';
const FAVORITES_STORAGE_KEY = 'user_favorites';

const PostActions: React.FC<PostActionsProps> = ({ post, onPostUpdate, onPostDelete }) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // 在组件加载时检查用户是否已点赞和收藏
  useEffect(() => {
    if (user) {
      const userLikes = JSON.parse(localStorage.getItem(LIKES_STORAGE_KEY) || '{}');
      const userFavorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '{}');
      setLiked(!!userLikes[`${user.userId}_${post.postId}`]);
      setFavorited(!!userFavorites[`${user.userId}_${post.postId}`]);
    }
  }, [user, post.postId]);

  const handleLike = () => {
    if (!user) {
      message.error('请先登录');
      return;
    }

    try {
      const postsJson = localStorage.getItem('local_posts');
      if (!postsJson) {
        throw new Error('帖子数据不存在');
      }

      const posts: Post[] = JSON.parse(postsJson);
      const targetPost = posts.find(p => p.postId === post.postId);
      if (!targetPost) {
        throw new Error('帖子不存在');
      }

      // 获取用户点赞记录
      const userLikes = JSON.parse(localStorage.getItem(LIKES_STORAGE_KEY) || '{}');
      const likeKey = `${user.userId}_${post.postId}`;

      if (liked) {
        // 取消点赞
        targetPost.likeCount = Math.max(0, targetPost.likeCount - 1);
        delete userLikes[likeKey];
        setLiked(false);
        message.success('已取消点赞');
      } else {
        // 添加点赞
        targetPost.likeCount += 1;
        userLikes[likeKey] = true;
        setLiked(true);
        message.success('点赞成功');
      }

      localStorage.setItem('local_posts', JSON.stringify(posts));
      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(userLikes));

      if (onPostUpdate) {
        onPostUpdate({
          ...post,
          likeCount: targetPost.likeCount
        });
      }
    } catch (error) {
      console.error('Error handling like:', error);
      message.error('操作失败');
    }
  };

  const handleFavorite = () => {
    if (!user) {
      message.error('请先登录');
      return;
    }

    try {
      const userFavorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '{}');
      const favoriteKey = `${user.userId}_${post.postId}`;

      if (favorited) {
        // 取消收藏
        delete userFavorites[favoriteKey];
        setFavorited(false);
        message.success('已取消收藏');
      } else {
        // 添加收藏
        userFavorites[favoriteKey] = true;
        setFavorited(true);
        message.success('收藏成功');
      }

      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(userFavorites));
    } catch (error) {
      console.error('Error handling favorite:', error);
      message.error('操作失败');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success('链接已复制');
  };

  // 检查是否有权限删除
  const canDelete = user && (
    user.userId === post.author.userId || // 是帖子作者
    user.role === 'ADMIN' // 是管理员
  );

  // 处理删除
  const handleDelete = async () => {
    try {
      const postsJson = localStorage.getItem('local_posts');
      if (!postsJson) return;

      const posts: Post[] = JSON.parse(postsJson);
      const updatedPosts = posts.filter(p => p.postId !== post.postId);
      
      localStorage.setItem('local_posts', JSON.stringify(updatedPosts));

      // 同时删除相关的评论
      const commentsJson = localStorage.getItem('local_comments');
      if (commentsJson) {
        const comments = JSON.parse(commentsJson);
        const updatedComments = comments.filter((c: any) => c.postId !== post.postId);
        localStorage.setItem('local_comments', JSON.stringify(updatedComments));
      }

      message.success('删除成功');
      setDeleteModalVisible(false);
      
      if (onPostDelete) {
        onPostDelete();
      } else {
        navigate('/'); // 如果没有提供删除回调，则导航到首页
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      message.error('删除失败');
    }
  };

  return (
    <>
      <Space size="large" style={{ marginTop: 16 }}>
        <Button 
          icon={liked ? <LikeFilled /> : <LikeOutlined />}
          onClick={handleLike}
          type={liked ? 'primary' : 'default'}
          disabled={!user}
        >
          点赞 {post.likeCount}
        </Button>
        <Button 
          icon={favorited ? <StarFilled /> : <StarOutlined />}
          onClick={handleFavorite}
          type={favorited ? 'primary' : 'default'}
          disabled={!user}
        >
          收藏
        </Button>
        <Button icon={<ShareAltOutlined />} onClick={handleShare}>
          分享
        </Button>
        {canDelete && (
          <Button 
            icon={<DeleteOutlined />} 
            danger
            onClick={() => setDeleteModalVisible(true)}
          >
            删除
          </Button>
        )}
      </Space>

      <Modal
        title="确认删除"
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="确认"
        cancelText="取消"
      >
        <p>确定要删除这篇帖子吗？删除后无法恢复。</p>
      </Modal>
    </>
  );
};

export default PostActions; 