import React, { useState, useEffect } from 'react';
import { Card, Tabs, List, Avatar, Space, Tag } from 'antd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';
import { Post } from '../types/post';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils';
import { getUserComments } from '../api/comments';
import { Comment } from '../types/comment';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchPosts } from '../store/postSlice';

const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
`;

const UserInfoCard = styled(Card)`
  margin-bottom: 24px;
`;

const FAVORITES_STORAGE_KEY = 'user_favorites';

// 添加这个函数来获取评论所属的帖子
const getPostById = (postId: number, posts: Post[]) => {
  return posts.find(post => post.postId === postId);
};

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts, loading } = useSelector((state: RootState) => state.posts);
  const [activeTab, setActiveTab] = React.useState('posts');
  const [favoritesPosts, setFavoritesPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  // 获取用户的帖子
  useEffect(() => {
    if (user) {
      dispatch(fetchPosts({ page: 1, size: 100, userId: user.userId }))
        .unwrap()
        .then(response => {
          setUserPosts(response.posts);
        });
    }
  }, [user, dispatch]);

  // 获取收藏的帖子
  useEffect(() => {
    if (user) {
      const userFavorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '{}');
      const favoritePostIds = Object.keys(userFavorites)
        .filter(key => key.startsWith(`${user.userId}_`))
        .map(key => Number(key.split('_')[1]));

      const favoritePosts = posts.filter(post => favoritePostIds.includes(post.postId));
      setFavoritesPosts(favoritePosts);

      // 获取点赞的帖子
      const userLikes = JSON.parse(localStorage.getItem('user_likes') || '{}');
      const likedPostIds = Object.keys(userLikes)
        .filter(key => key.startsWith(`${user.userId}_`))
        .map(key => Number(key.split('_')[1]));

      const likedPosts = posts.filter(post => likedPostIds.includes(post.postId));
      setLikedPosts(likedPosts);
    }
  }, [user, posts]);

  useEffect(() => {
    if (user) {
      console.log('Current user:', user);
      console.log('Fetching comments for user:', user.userId);
      
      // 直接检查 localStorage 中的评论数据
      const commentsJson = localStorage.getItem('local_comments');
      console.log('Raw comments from localStorage:', commentsJson);
      
      getUserComments(user.userId).then(userComments => {
        console.log('Received comments:', userComments);
        setComments(userComments);
      }).catch(error => {
        console.error('Error fetching comments:', error);
      });
    }
  }, [user]);

  if (!user) {
    return <div>请先登录</div>;
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return '超级管理员';
      case 'BOARD_ADMIN':
        return '板块管理员';
      default:
        return '普通用户';
    }
  };

  const items = [
    {
      key: 'posts',
      label: '我的帖子',
      children: (
        <List
          dataSource={userPosts}
          loading={loading}
          renderItem={(post: Post) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Link to={`/posts/${post.postId}`}>
                    <Space>
                      {post.title}
                      {post.isTop && <Tag color="red">置顶</Tag>}
                      {post.isEssence && <Tag color="gold">精华</Tag>}
                    </Space>
                  </Link>
                }
                description={
                  <Space>
                    <span>发布于 {formatDate(post.createdAt)}</span>
                    <span>浏览 {post.viewCount}</span>
                    <span>点赞 {post.likeCount}</span>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      )
    },
    {
      key: 'favorites',
      label: '我的收藏',
      children: (
        <List
          dataSource={favoritesPosts}
          renderItem={(post: Post) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Link to={`/posts/${post.postId}`}>
                    <Space>
                      {post.title}
                      {post.isTop && <Tag color="red">置顶</Tag>}
                      {post.isEssence && <Tag color="gold">精华</Tag>}
                    </Space>
                  </Link>
                }
                description={
                  <Space>
                    <span>作者：{post.author.username}</span>
                    <span>发布于 {formatDate(post.createdAt)}</span>
                    <span>浏览 {post.viewCount}</span>
                    <span>点赞 {post.likeCount}</span>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      )
    },
    {
      key: 'likes',
      label: '我的点赞',
      children: (
        <List
          dataSource={likedPosts}
          renderItem={(post: Post) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Link to={`/posts/${post.postId}`}>
                    <Space>
                      {post.title}
                      {post.isTop && <Tag color="red">置顶</Tag>}
                      {post.isEssence && <Tag color="gold">精华</Tag>}
                    </Space>
                  </Link>
                }
                description={
                  <Space>
                    <span>作者：{post.author.username}</span>
                    <span>发布于 {formatDate(post.createdAt)}</span>
                    <span>浏览 {post.viewCount}</span>
                    <span>点赞 {post.likeCount}</span>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      )
    },
    {
      key: 'comments',
      label: '我的评论',
      children: (
        <List
          dataSource={comments}
          renderItem={(comment: Comment) => {
            const post = getPostById(comment.postId, posts);
            if (!post) return null;

            return (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Link to={`/posts/${post.postId}`}>
                      <Space>
                        {post.title}
                        {post.isTop && <Tag color="red">置顶</Tag>}
                        {post.isEssence && <Tag color="gold">精华</Tag>}
                      </Space>
                    </Link>
                  }
                  description={
                    <Space>
                      <span>评论内容：{comment.content}</span>
                      <span>评论时间：{formatDate(comment.createdAt)}</span>
                      <span>点赞 {comment.likes}</span>
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      )
    }
  ];

  return (
    <ProfileContainer>
      <UserInfoCard>
        <Card.Meta
          avatar={<Avatar src={user.avatarUrl}>{user.username[0]}</Avatar>}
          title={user.username}
          description={
            <Space direction="vertical">
              {user.studentId && (
                <div>学号：{user.studentId}</div>
              )}
              <div>
                角色：
                <Tag color={user.role === 'ADMIN' ? 'red' : user.role === 'BOARD_ADMIN' ? 'blue' : 'green'}>
                  {getRoleText(user.role)}
                </Tag>
              </div>
              {user.role === 'BOARD_ADMIN' && (
                <div>
                  管理板块：
                  <Tag color="blue">学习交流</Tag>
                </div>
              )}
            </Space>
          }
        />
      </UserInfoCard>

      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />
      </Card>
    </ProfileContainer>
  );
};

export default Profile; 