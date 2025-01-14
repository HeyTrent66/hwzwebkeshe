import React from 'react';
import { Form, Input, Button, message } from 'antd';

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      // 处理注册逻辑
      message.success('注册成功');
    } catch (error) {
      message.error('注册失败');
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="用户名" />
      </Form.Item>

      <Form.Item
        name="studentId"
        rules={[
          { required: true, message: '请输入学号' },
          { pattern: /^\d+$/, message: '学号只能包含数字' }
        ]}
      >
        <Input placeholder="学号" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password placeholder="密码" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm; 