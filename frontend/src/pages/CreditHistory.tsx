import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';
import { getCreditRecords } from '../api/credit';

const { Title } = Typography;

const CreditContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
`;

interface CreditRecord {
  id: number;
  type: string;
  amount: number;
  description: string;
  createdAt: string;
}

const CreditHistory: React.FC = () => {
  const [records, setRecords] = useState<CreditRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchRecords = async (page: number) => {
    setLoading(true);
    try {
      const response = await getCreditRecords({
        page,
        size: pagination.pageSize,
      });
      setRecords(response.records);
      setPagination({
        ...pagination,
        current: page,
        total: response.totalPages * pagination.pageSize,
      });
    } catch (error) {
      console.error('获取积分记录失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords(1);
  }, []);

  const columns: ColumnsType<CreditRecord> = [
    {
      title: '时间',
      dataIndex: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (type) => (
        <Tag color={type.includes('获得') ? 'green' : 'red'}>
          {type}
        </Tag>
      ),
    },
    {
      title: '积分变动',
      dataIndex: 'amount',
      render: (amount) => (
        <span style={{ color: amount > 0 ? '#52c41a' : '#f5222d' }}>
          {amount > 0 ? `+${amount}` : amount}
        </span>
      ),
    },
    {
      title: '说明',
      dataIndex: 'description',
    },
  ];

  return (
    <CreditContainer>
      <Card>
        <Title level={4}>积分记录</Title>
        <Table
          columns={columns}
          dataSource={records}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={(pagination) => fetchRecords(pagination.current ?? 1)}
        />
      </Card>
    </CreditContainer>
  );
};

export default CreditHistory; 