import React from 'react';
import { Card, Tag, Space, Typography } from 'antd';
import { Post } from '../../types/post';
import { formatDate } from '../../utils';

const { Text, Title } = Typography;

interface PostContentProps {
  post: Post;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <div style={{ padding: '16px 0' }}>
      <Title level={4}>{post.title}</Title>
      
      <Space style={{ margin: '16px 0' }}>
        <Text type="secondary">作者：{post.author.username}</Text>
        <Text type="secondary">发布于：{formatDate(post.createdAt)}</Text>
        <Text type="secondary">浏览：{post.viewCount}</Text>
        {post.isTop && <Tag color="red">置顶</Tag>}
        {post.isEssence && <Tag color="gold">精华</Tag>}
      </Space>

      <div style={{ 
        margin: '24px 0', 
        whiteSpace: 'pre-wrap',
        fontSize: '16px',
        lineHeight: '1.8'
      }}>
        {post.content}
      </div>

      {post.tags?.length > 0 && (
        <Space style={{ marginTop: '16px' }}>
          {post.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>
      )}
    </div>
  );
};

export default PostContent; 