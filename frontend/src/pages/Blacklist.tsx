import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Avatar, Popconfirm, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import type { ColumnsType } from 'antd/es/table';
import { User } from '../types';

const BlacklistContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
`;

interface BlacklistUser extends User {
  blockReason: string;
  blockedAt: string;
}

const Blacklist: React.FC = () => {
  const [blockedUsers, setBlockedUsers] = useState<BlacklistUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  const fetchBlockedUsers = async () => {
    setLoading(true);
    try {
      // const response = await getBlockedUsers();
      // setBlockedUsers(response.data);
    } catch (error) {
      message.error('获取黑名单失败');
    } finally {
      setLoading(false);
    }
  };

  const handleUnblock = async (userId: number) => {
    try {
      // await unblockUser(userId);
      message.success('已移出黑名单');
      fetchBlockedUsers();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const columns: ColumnsType<BlacklistUser> = [
    {
      title: '用户',
      dataIndex: 'username',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar src={record.avatarUrl} icon={<UserOutlined />} />
          {record.username}
        </div>
      ),
    },
    {
      title: '拉黑原因',
      dataIndex: 'blockReason',
    },
    {
      title: '拉黑时间',
      dataIndex: 'blockedAt',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="确定将该用户移出黑名单吗？"
          onConfirm={() => handleUnblock(record.userId)}
        >
          <Button type="link">移出黑名单</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <BlacklistContainer>
      <Card title="黑名单管理">
        <Table
          columns={columns}
          dataSource={blockedUsers}
          rowKey="userId"
          loading={loading}
        />
      </Card>
    </BlacklistContainer>
  );
};

export default Blacklist; 