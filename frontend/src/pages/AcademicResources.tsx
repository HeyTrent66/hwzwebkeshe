import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, Input, Upload, Tag, Space, Select } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'document' | 'video' | 'link' | 'other';
  category: string;
  uploader: string;
  downloadCount: number;
  size: number;
  uploadTime: string;
  tags: string[];
}

const AcademicResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const columns: ColumnsType<Resource> = [
    {
      title: '资源名称',
      dataIndex: 'title',
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (type: Resource['type']) => {
        const colors: Record<Resource['type'], string> = {
          document: 'blue',
          video: 'green',
          link: 'purple',
          other: 'default',
        };
        return <Tag color={colors[type]}>{type}</Tag>;
      },
    },
    {
      title: '分类',
      dataIndex: 'category',
    },
    {
      title: '上传者',
      dataIndex: 'uploader',
    },
    {
      title: '下载次数',
      dataIndex: 'downloadCount',
    },
    {
      title: '大小',
      dataIndex: 'size',
      render: (size) => `${(size / 1024 / 1024).toFixed(2)} MB`,
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="link">下载</Button>
          <Button type="link">编辑</Button>
          <Button type="link" danger>删除</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="学术资源共享"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          上传资源
        </Button>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Select defaultValue="all" style={{ width: 120 }}>
            <Select.Option value="all">全部类型</Select.Option>
            <Select.Option value="document">文档</Select.Option>
            <Select.Option value="video">视频</Select.Option>
            <Select.Option value="link">链接</Select.Option>
          </Select>
          <Input.Search
            placeholder="搜索资源"
            style={{ width: 200 }}
          />
        </Space>

        <Table
          columns={columns}
          dataSource={resources}
          rowKey="id"
          loading={loading}
        />
      </Space>

      <Modal
        title="上传资源"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="资源名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label="资源类型"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="document">文档</Select.Option>
              <Select.Option value="video">视频</Select.Option>
              <Select.Option value="link">链接</Select.Option>
              <Select.Option value="other">其他</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            label="资源分类"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="lecture">课程讲义</Select.Option>
              <Select.Option value="paper">学术论文</Select.Option>
              <Select.Option value="book">电子书籍</Select.Option>
              <Select.Option value="other">其他资料</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="资源描述"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="file"
            label="上传文件"
            rules={[{ required: true }]}
          >
            <Upload>
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="tags"
            label="标签"
          >
            <Select mode="tags" placeholder="添加标签" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default AcademicResources; 