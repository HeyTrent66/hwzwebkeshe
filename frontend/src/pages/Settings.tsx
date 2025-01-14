import React from 'react';
import { Form, Input, Button, Upload, Card, message, Tabs } from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const Settings: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [form] = Form.useForm();

  const handleUpdateProfile = async (values: any) => {
    try {
      // await updateProfile(values);
      message.success('个人信息更新成功');
    } catch (error) {
      message.error('更新失败');
    }
  };

  const handleChangePassword = async (values: any) => {
    try {
      // await changePassword(values);
      message.success('密码修改成功');
      form.resetFields();
    } catch (error) {
      message.error('密码修改失败');
    }
  };

  const items = [
    {
      key: 'profile',
      label: '个人资料',
      children: (
        <Form layout="vertical" onFinish={handleUpdateProfile} initialValues={user || undefined}>
          <Form.Item label="用户名" name="username">
            <Input disabled />
          </Form.Item>
          <Form.Item label="昵称" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item label="个人简介" name="bio">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="头像">
            <Upload>
              <Button icon={<UploadOutlined />}>更换头像</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存修改
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'security',
      label: '安全设置',
      children: (
        <Form layout="vertical" form={form} onFinish={handleChangePassword}>
          <Form.Item
            name="oldPassword"
            label="当前密码"
            rules={[{ required: true, message: '请输入当前密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码至少6个字符' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="确认新密码"
            rules={[
              { required: true, message: '请确认新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              修改密码
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <SettingsContainer>
      <Card>
        <Tabs items={items} />
      </Card>
    </SettingsContainer>
  );
};

export default Settings; 