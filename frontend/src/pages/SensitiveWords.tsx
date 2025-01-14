import React, { useState } from 'react';
import { Table, Card, Button, Input, Space, Modal, message, Upload, Form, Select, Tag } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { UploadProps } from 'antd';

interface SensitiveWord {
  id: number;
  word: string;
  level: 'low' | 'medium' | 'high';
  replacement: string;
  createdAt: string;
}

const SensitiveWords: React.FC = () => {
  const [words, setWords] = useState<SensitiveWord[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = async (values: any) => {
    try {
      // await addSensitiveWord(values);
      message.success('添加成功');
      setModalVisible(false);
      // 刷新列表
    } catch (error) {
      message.error('添加失败');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      // await deleteSensitiveWord(id);
      message.success('删除成功');
      // 刷新列表
    } catch (error) {
      message.error('删除失败');
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.txt,.csv',
    beforeUpload: (file) => {
      // 处理文件上传
      return false;
    },
  };

  const columns: ColumnsType<SensitiveWord> = [
    {
      title: '敏感词',
      dataIndex: 'word',
    },
    {
      title: '级别',
      dataIndex: 'level',
      render: (level: 'low' | 'medium' | 'high') => {
        const colors: Record<string, string> = {
          low: 'green',
          medium: 'orange',
          high: 'red',
        };
        return <Tag color={colors[level]}>{level}</Tag>;
      },
    },
    {
      title: '替换词',
      dataIndex: 'replacement',
    },
    {
      title: '添加时间',
      dataIndex: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="link" 
          danger 
          onClick={() => handleDelete(record.id)}
        >
          删除
        </Button>
      ),
    },
  ];

  return (
    <Card
      title="敏感词管理"
      extra={
        <Space>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>导入敏感词</Button>
          </Upload>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            添加敏感词
          </Button>
        </Space>
      }
    >
      <Table
        columns={columns}
        dataSource={words}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="添加敏感词"
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
            name="word"
            label="敏感词"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="level"
            label="级别"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="low">低</Select.Option>
              <Select.Option value="medium">中</Select.Option>
              <Select.Option value="high">高</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="replacement"
            label="替换词"
          >
            <Input placeholder="留空则替换为 **" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default SensitiveWords; 