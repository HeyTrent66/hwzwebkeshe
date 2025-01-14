import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, Input, DatePicker, Select, Tag, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Activity {
  id: number;
  title: string;
  description: string;
  type: 'academic' | 'cultural' | 'sports' | 'other';
  location: string;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'upcoming' | 'ongoing' | 'ended';
}

const ActivityManagement: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns: ColumnsType<Activity> = [
    {
      title: '活动名称',
      dataIndex: 'title',
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (type: Activity['type']) => {
        const colors: Record<Activity['type'], string> = {
          academic: 'blue',
          cultural: 'purple',
          sports: 'green',
          other: 'default',
        };
        return <Tag color={colors[type]}>{type}</Tag>;
      },
    },
    {
      title: '地点',
      dataIndex: 'location',
    },
    {
      title: '时间',
      render: (_, record) => (
        <span>
          {new Date(record.startTime).toLocaleString()} - 
          {new Date(record.endTime).toLocaleString()}
        </span>
      ),
    },
    {
      title: '参与人数',
      render: (_, record) => (
        <span>{record.currentParticipants}/{record.maxParticipants}</span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: Activity['status']) => {
        const colors: Record<Activity['status'], string> = {
          upcoming: 'processing',
          ongoing: 'success',
          ended: 'default',
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link">编辑</Button>
          <Button type="link">参与者</Button>
          <Button type="link" danger>取消</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="活动管理"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          发布活动
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={activities}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="发布活动"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="活动名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="活动类型"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="academic">学术活动</Select.Option>
              <Select.Option value="cultural">文化活动</Select.Option>
              <Select.Option value="sports">体育活动</Select.Option>
              <Select.Option value="other">其他</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="location"
            label="活动地点"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="time"
            label="活动时间"
            rules={[{ required: true }]}
          >
            <DatePicker.RangePicker showTime />
          </Form.Item>
          <Form.Item
            name="maxParticipants"
            label="最大参与人数"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="description"
            label="活动描述"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ActivityManagement; 