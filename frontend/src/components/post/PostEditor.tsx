import React, { useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { addPost, fetchPosts, setCurrentPost } from '../../store/postSlice';
import { useBoards } from '../../hooks/useBoards';
import { useTags } from '../../hooks/useTags';
import { Board, Tag, Post } from '../../types/post';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const EditorContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const PostEditor: React.FC = () => {
  const [form] = Form.useForm();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { boards } = useBoards();
  const { tags } = useTags();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: any) => {
    if (!content.trim()) {
      message.error('请输入帖子内容');
      return;
    }

    try {
      setLoading(true);
      const postData = {
        title: values.title,
        content: content,
        boardId: values.boardId,
        tags: values.tags || []
      };

      const result = await dispatch(addPost(postData)).unwrap();
      console.log('Created post result:', result);

      // 等待一下确保数据已保存
      await new Promise(resolve => setTimeout(resolve, 100));

      // 验证帖子是否成功保存
      const postsJson = localStorage.getItem('local_posts');
      if (postsJson) {
        const posts = JSON.parse(postsJson) as Post[];
        const savedPost = posts.find(p => p.postId === result.postId);
        
        if (savedPost) {
          message.success('发布成功');
          form.resetFields();
          setContent('');
          
          // 使用同步 action 设置当前帖子
          dispatch(setCurrentPost(savedPost));
          navigate(`/posts/${result.postId}`);
        } else {
          message.error('帖子保存失败');
        }
      } else {
        message.error('帖子保存失败');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      message.error('发布失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <EditorContainer>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="title"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input placeholder="请输入标题" size="large" />
        </Form.Item>

        <Form.Item
          name="boardId"
          rules={[{ required: true, message: '请选择板块' }]}
        >
          <Select placeholder="选择板块">
            {boards.map((board: Board) => (
              <Select.Option key={board.boardId} value={board.boardId}>
                {board.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="tags">
          <Select
            mode="tags"
            placeholder="添加标签（可选）"
            style={{ width: '100%' }}
          >
            {tags.map((tag: Tag) => (
              <Select.Option key={tag.tagId} value={tag.name}>
                {tag.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Input.TextArea
            rows={6}
            placeholder="请输入正文内容..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          block
        >
          发布
        </Button>
      </Form>
    </EditorContainer>
  );
};

export default PostEditor; 