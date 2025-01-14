import React from 'react';
import { Card, Avatar, Space, Typography } from 'antd';
import { LikeOutlined, MessageOutlined, EyeOutlined } from '@ant-design/icons';
import { Post } from '../types';
import { Link } from 'react-router-dom';

const { Text } = Typography;

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card hoverable className="post-card">
      <Card.Meta
        avatar={
          <Avatar src={post.author?.avatarUrl}>
            {post.author?.username[0]}
          </Avatar>
        }
        title={<Link to={`/posts/${post.postId}`}>{post.title}</Link>}
        description={
          <Space direction="vertical" size={2}>
            <Text type="secondary">
              {post.author?.username} · {new Date(post.createdAt).toLocaleDateString()}
            </Text>
            <Space size={16}>
              <Space>
                <EyeOutlined /> {post.viewCount}
              </Space>
              <Space>
                <LikeOutlined /> {post.likeCount}
              </Space>
              <Space>
                <MessageOutlined /> {post.commentCount}
              </Space>
            </Space>
          </Space>
        }
      />
    </Card>
  );
};

export default PostCard; 