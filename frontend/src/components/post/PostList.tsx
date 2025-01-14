import React from 'react';
import { List, Space, Tag, Typography, Card, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { LikeOutlined, MessageOutlined, EyeOutlined } from '@ant-design/icons';
import { Post } from '../../types/post';
import { formatDate } from '../../utils';
import styled from 'styled-components';

const { Text, Paragraph } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 16px;
  .ant-card-body {
    padding: 16px;
  }
`;

const PostContent = styled(Paragraph)`
  margin: 16px 0;
  white-space: pre-wrap;
`;

interface PostListProps {
  posts: Post[];
  loading: boolean;
  pagination?: {
    current: number;
    total: number;
    onChange: (page: number) => void;
  } | false;
}

const PostList: React.FC<PostListProps> = ({ posts, loading, pagination }) => {
  return (
    <List
      loading={loading}
      itemLayout="vertical"
      dataSource={posts}
      pagination={pagination}
      renderItem={(post) => (
        <StyledCard>
          <List.Item 
            key={post.postId}
            actions={[
              <Space>
                <EyeOutlined /> {post.viewCount}
              </Space>,
              <Space>
                <LikeOutlined /> {post.likeCount}
              </Space>,
              <Space>
                <MessageOutlined /> {post.commentCount}
              </Space>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={post.author.avatarUrl} />}
              title={
                <Space>
                  <Link to={`/posts/${post.postId}`}>{post.title}</Link>
                  {post.isTop && <Tag color="red">置顶</Tag>}
                  {post.isEssence && <Tag color="gold">精华</Tag>}
                </Space>
              }
              description={
                <Space>
                  <Text type="secondary">{post.author.username}</Text>
                  <Text type="secondary">{formatDate(post.createdAt)}</Text>
                  {post.tags?.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Space>
              }
            />
            <PostContent>
              {post.content}
            </PostContent>
          </List.Item>
        </StyledCard>
      )}
    />
  );
};

export default PostList; 