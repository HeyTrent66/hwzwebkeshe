import React from 'react';
import { Card, Avatar, Space, Typography } from 'antd';
import { LikeOutlined, MessageOutlined, EyeOutlined } from '@ant-design/icons';
import { Post } from '../../types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Text } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  }
`;

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <StyledCard hoverable>
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
    </StyledCard>
  );
};

export default PostCard; 