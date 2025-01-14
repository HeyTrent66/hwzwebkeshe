import React, { useState } from 'react';
import { Table, Card, Button, Tag, Space, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Post } from '../types';

interface PostManagementProps {
  boardId?: number;
}

const PostManagement: React.FC<PostManagementProps> = ({ boardId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = (postId: number) => {
    Modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '删除后无法恢复，确定要删除吗？',
      onOk: async () => {
        try {
          // await deletePost(postId);
          message.success('删除成功');
          // 刷新列表
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  const handleToggleTop = async (postId: number, isTop: boolean) => {
    try {
      // await togglePostTop(postId, isTop);
      message.success(isTop ? '取消置顶成功' : '置顶成功');
      // 刷新列表
    } catch (error) {
      message.error('操作失败');
    }
  };

  const columns: ColumnsType<Post> = [
    {
      title: '标题',
      dataIndex: 'title',
      width: '30%',
    },
    {
      title: '作者',
      dataIndex: ['author', 'username'],
    },
    {
      title: '发布时间',
      dataIndex: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '状态',
      key: 'status',
      render: (_, record) => (
        <Space>
          {record.isTop && <Tag color="red">置顶</Tag>}
          {record.isEssence && <Tag color="gold">精华</Tag>}
          {record.isLocked && <Tag color="default">已锁定</Tag>}
        </Space>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            onClick={() => handleToggleTop(record.postId, record.isTop)}
          >
            {record.isTop ? '取消置顶' : '置顶'}
          </Button>
          <Button 
            type="link" 
            danger 
            onClick={() => handleDelete(record.postId)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="帖子管理">
      <Table
        columns={columns}
        dataSource={posts}
        rowKey="postId"
        loading={loading}
      />
    </Card>
  );
};

export default PostManagement; 