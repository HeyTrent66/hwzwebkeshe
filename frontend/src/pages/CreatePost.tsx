import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Post } from '../types/post';

const { TextArea } = Input;
const { Option } = Select;

const CreatePostContainer = styled.div`
  max-width: 800px;
  margin: 24px auto;
  padding: 0 16px;
`;

interface CreatePostForm {
  title: string;
  content: string;
  boardId: number;
}

const BOARD_OPTIONS = [
  { id: 1, name: '学习交流' },
  { id: 2, name: '校园生活' },
  { id: 3, name: '求职就业' }
];

const CreatePost: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = async (values: CreatePostForm) => {
    if (!user) {
      message.error('请先登录');
      return;
    }

    setLoading(true);
    try {
      const postsJson = localStorage.getItem('local_posts');
      let existingPosts: Post[] = [];
      
      if (postsJson) {
        try {
          const parsed = JSON.parse(postsJson);
          existingPosts = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          console.error('Error parsing posts:', e);
          existingPosts = [];
        }
      }

      const newPost: Post = {
        postId: Math.floor(Math.random() * 10000),
        title: values.title,
        content: values.content,
        author: user,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        status: 1,
        isTop: false,
        isEssence: false,
        isLocked: false,
        boardId: values.boardId,
        tags: []
      };

      const updatedPosts = Array.isArray(existingPosts) 
        ? [newPost, ...existingPosts]
        : [newPost];

      localStorage.setItem('local_posts', JSON.stringify(updatedPosts));
      
      message.success('发布成功');
      navigate(`/posts/${newPost.postId}`);
    } catch (error) {
      console.error('Error creating post:', error);
      message.error('发布失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreatePostContainer>
      <Card title="发布帖子">
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="boardId"
            label="选择板块"
            rules={[{ required: true, message: '请选择板块' }]}
          >
            <Select placeholder="请选择板块">
              {BOARD_OPTIONS.map(board => (
                <Option key={board.id} value={board.id}>
                  {board.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input placeholder="请输入标题" maxLength={100} />
          </Form.Item>

          <Form.Item
            name="content"
            label="内容"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <TextArea
              placeholder="请输入内容"
              autoSize={{ minRows: 6, maxRows: 12 }}
              maxLength={10000}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              发布
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </CreatePostContainer>
  );
};

export default CreatePost; 