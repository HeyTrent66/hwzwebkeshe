import React from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addComment } from '../../api/comments';

interface Props {
  postId: number;
  onCommentAdded: () => void;
}

const CommentForm: React.FC<Props> = ({ postId, onCommentAdded }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [form] = Form.useForm();

  const handleSubmit = async (values: { content: string }) => {
    if (!user) return;
    
    try {
      await addComment(postId, values.content, user.userId);
      form.resetFields();
      onCommentAdded();
    } catch (error) {
      console.error('发表评论失败:', error);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="content" rules={[{ required: true, message: '请输入评论内容' }]}>
        <Input.TextArea rows={4} placeholder="写下你的评论..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          发表评论
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm; 