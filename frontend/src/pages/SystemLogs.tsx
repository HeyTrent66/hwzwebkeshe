import React, { useState } from 'react';
import { Table, Card, DatePicker, Select, Input, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface LogEntry {
  id: number;
  type: 'info' | 'warning' | 'error';
  module: string;
  action: string;
  operator: string;
  ip: string;
  details: string;
  timestamp: string;
}

const SystemLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const columns: ColumnsType<LogEntry> = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      width: 180,
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 100,
      render: (type: LogEntry['type']) => {
        const colors: Record<LogEntry['type'], string> = {
          info: 'blue',
          warning: 'gold',
          error: 'red',
        };
        return <Tag color={colors[type]}>{type.toUpperCase()}</Tag>;
      },
    },
    {
      title: '模块',
      dataIndex: 'module',
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 150,
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      width: 120,
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      width: 130,
    },
    {
      title: '详细信息',
      dataIndex: 'details',
      ellipsis: true,
    },
  ];

  return (
    <Card title="系统日志">
      <Space style={{ marginBottom: 16 }}>
        <RangePicker
          showTime
          onChange={(dates) => {
            // 处理日期范围变化
          }}
        />
        <Select defaultValue="all" style={{ width: 120 }}>
          <Option value="all">全部类型</Option>
          <Option value="info">信息</Option>
          <Option value="warning">警告</Option>
          <Option value="error">错误</Option>
        </Select>
        <Select defaultValue="all" style={{ width: 120 }}>
          <Option value="all">全部模块</Option>
          <Option value="user">用户模块</Option>
          <Option value="post">内容模块</Option>
          <Option value="system">系统模块</Option>
        </Select>
        <Input.Search
          placeholder="搜索关键词"
          style={{ width: 200 }}
          onSearch={(value) => {
            // 处理搜索
          }}
        />
      </Space>

      <Table
        columns={columns}
        dataSource={logs}
        rowKey="id"
        loading={loading}
        pagination={{
          total: 100,
          pageSize: 20,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </Card>
  );
};

export default SystemLogs; 