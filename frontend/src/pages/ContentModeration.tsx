import React, { useState } from 'react';
import { Table, Card, Button, Space, Modal, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface ContentItem {
  id: number;
  type: 'post' | 'comment';
  content: string;
  author: string;
  createdAt: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

const ContentModeration: React.FC = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);

  const handleApprove = async (id: number) => {
    try {
      // await approveContent(id);
      message.success('审核通过');
      // 刷新列表
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleReject = async (id: number, reason: string) => {
    try {
      // await rejectContent(id, reason);
      message.success('已拒绝');
      // 刷新列表
    } catch (error) {
      message.error('操作失败');
    }
  };

  const colors: Record<ContentItem['status'], string> = {
    pending: 'gold',
    approved: 'green',
    rejected: 'red',
  };

  const texts: Record<ContentItem['status'], string> = {
    pending: '待审核',
    approved: '已通过',
    rejected: '已拒绝',
  };

  const columns: ColumnsType<ContentItem> = [
    {
      title: '类型',
      dataIndex: 'type',
      render: (type) => (
        <Tag color={type === 'post' ? 'blue' : 'green'}>
          {type === 'post' ? '帖子' : '评论'}
        </Tag>
      ),
    },
    {
      title: '内容',
      dataIndex: 'content',
      width: '40%',
      ellipsis: true,
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '提交时间',
      dataIndex: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: ContentItem['status']) => (
        <Tag color={colors[status]}>{texts[status]}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            onClick={() => handleApprove(record.id)}
            disabled={record.status !== 'pending'}
          >
            通过
          </Button>
          <Button 
            type="link" 
            danger
            onClick={() => {
              Modal.confirm({
                title: '拒绝原因',
                content: '请输入拒绝原因',
                onOk: (close) => {
                  handleReject(record.id, '违规内容');
                  close();
                },
              });
            }}
            disabled={record.status !== 'pending'}
          >
            拒绝
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="内容审核">
      <Table
        columns={columns}
        dataSource={contents}
        rowKey="id"
        loading={loading}
      />
    </Card>
  );
};

export default ContentModeration; 