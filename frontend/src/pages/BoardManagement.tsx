import React, { useState } from 'react';
import { Table, Card, Button, Form, Input, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Board } from '../types';

const BoardManagement: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = () => {
    form.resetFields();
    setModalVisible(true);
  };

  const handleSubmit = async (values: any) => {
    try {
      // await createBoard(values);
      message.success('创建成功');
      setModalVisible(false);
      // 刷新列表
    } catch (error) {
      message.error('创建失败');
    }
  };

  const columns: ColumnsType<Board> = [
    {
      title: '版块名称',
      dataIndex: 'boardName',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '排序',
      dataIndex: 'sortOrder',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => (
        <span>{status === 1 ? '正常' : '已关闭'}</span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button type="link">编辑</Button>
      ),
    },
  ];

  return (
    <>
      <Card
        title="版块管理"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            新建版块
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={boards}
          rowKey="boardId"
          loading={loading}
        />
      </Card>

      <Modal
        title="新建版块"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="boardName"
            label="版块名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="版块描述"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="sortOrder"
            label="排序"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BoardManagement; 