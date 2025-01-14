import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, Input, Tag, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColorPicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface TagItem {
  id: number;
  name: string;
  color: string;
  description: string;
  postCount: number;
  createdAt: string;
}

const TagManagement: React.FC = () => {
  const [tags, setTags] = useState<TagItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = async (values: any) => {
    try {
      // await createTag(values);
      message.success('创建成功');
      setModalVisible(false);
      // 刷新列表
    } catch (error) {
      message.error('创建失败');
    }
  };

  const columns: ColumnsType<TagItem> = [
    {
      title: '标签名称',
      dataIndex: 'name',
      render: (text, record) => (
        <Tag color={record.color}>{text}</Tag>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '使用次数',
      dataIndex: 'postCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
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
      title="标签管理"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          新建标签
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={tags}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="新建标签"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAdd}
        >
          <Form.Item
            name="name"
            label="标签名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="color"
            label="标签颜色"
            rules={[{ required: true }]}
          >
            <ColorPicker />
          </Form.Item>
          <Form.Item
            name="description"
            label="标签描述"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default TagManagement; 