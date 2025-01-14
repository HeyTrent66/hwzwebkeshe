import React from 'react';
import { Card, Tag, Space, Button, message } from 'antd';
import { LikeOutlined, StarOutlined, ShareAltOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Post } from '../../types/post';
import { formatDate } from '../../utils';

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const PostTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const PostMeta = styled.div`
  margin-bottom: 24px;
  color: #8c8c8c;
`;

const PostContent = styled.div`
  font-size: 16px;
  line-height: 1.8;
  
  img {
    max-width: 100%;
  }
`;

const PostActions = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
`;

interface PostDetailProps {
  post: Post;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const handleLike = () => {
    message.success('点赞成功');
  };

  const handleCollect = () => {
    message.success('收藏成功');
  };

  const handleShare = () => {
    message.success('分享链接已复制');
  };

  return (
    <PostContainer>
      <Card>
        <PostTitle>
          {post.isTop && <Tag color="red">置顶</Tag>}
          {post.isEssence && <Tag color="gold">精华</Tag>}
          {post.title}
        </PostTitle>

        <PostMeta>
          <Space>
            <span>作者: {post.author.username}</span>
            <span>发布于: {formatDate(post.createdAt)}</span>
            <span>浏览: {post.viewCount}</span>
          </Space>
        </PostMeta>

        <PostContent 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />

        <div>
          {post.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <PostActions>
          <Space>
            <Button 
              icon={<LikeOutlined />} 
              onClick={handleLike}
            >
              点赞 {post.likeCount}
            </Button>
            <Button 
              icon={<StarOutlined />} 
              onClick={handleCollect}
            >
              收藏
            </Button>
            <Button 
              icon={<ShareAltOutlined />} 
              onClick={handleShare}
            >
              分享
            </Button>
          </Space>
        </PostActions>
      </Card>
    </PostContainer>
  );
};

export default PostDetail; 