import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, Input, Tree, message, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 权限树形结构
  const permissionTree = [
    {
      title: '用户管理',
      key: 'user',
      children: [
        { title: '查看用户', key: 'user:view' },
        { title: '编辑用户', key: 'user:edit' },
        { title: '删除用户', key: 'user:delete' },
      ],
    },
    {
      title: '内容管理',
      key: 'content',
      children: [
        { title: '发布帖子', key: 'post:create' },
        { title: '编辑帖子', key: 'post:edit' },
        { title: '删除帖子', key: 'post:delete' },
        { title: '管理评论', key: 'comment:manage' },
      ],
    },
    // 更多权限...
  ];

  const columns: ColumnsType<Role> = [
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '用户数',
      dataIndex: 'userCount',
    },
    {
      title: '权限',
      dataIndex: 'permissions',
      render: (permissions: string[]) => (
        <span>
          {permissions.map(perm => (
            <Tag key={perm}>{perm}</Tag>
          ))}
        </span>
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
    <Card
      title="角色管理"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          新建角色
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={roles}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="新建角色"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="角色描述"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="permissions"
            label="权限配置"
            rules={[{ required: true }]}
          >
            <Tree
              checkable
              treeData={permissionTree}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default RoleManagement; 