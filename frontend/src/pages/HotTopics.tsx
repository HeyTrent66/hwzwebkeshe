import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, Input, InputNumber, Switch, Tag, Space } from 'antd';
import { PlusOutlined, FireOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Topic {
  id: number;
  title: string;
  description: string;
  postCount: number;
  participantCount: number;
  isSticky: boolean;
  isHot: boolean;
  startTime: string;
  endTime: string;
}

const HotTopics: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns: ColumnsType<Topic> = [
    {
      title: '话题',
      dataIndex: 'title',
      render: (text, record) => (
        <Space>
          {text}
          {record.isHot && <FireOutlined style={{ color: '#ff4d4f' }} />}
          {record.isSticky && <Tag color="blue">置顶</Tag>}
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
    },
    {
      title: '参与帖子数',
      dataIndex: 'postCount',
    },
    {
      title: '参与人数',
      dataIndex: 'participantCount',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link">编辑</Button>
          <Button type="link" danger>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="热门话题管理"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          新建话题
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={topics}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="新建话题"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="话题标题"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="话题描述"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="isSticky"
            valuePropName="checked"
            label="置顶话题"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="isHot"
            valuePropName="checked"
            label="标记为热门"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="weight"
            label="排序权重"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default HotTopics; 