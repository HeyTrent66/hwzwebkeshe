import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setCredentials } from '../store/authSlice';
import { register as registerApi } from '../api/auth';
import { RegisterValues } from '../types/auth';
import { useAppDispatch } from '../hooks/useAppDispatch';

const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 24px;
`;

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = async (values: RegisterValues) => {
    try {
      setLoading(true);
      const response = await registerApi(values);
      dispatch(setCredentials(response));
      message.success('注册成功');
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error('注册失败');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <Form onFinish={onFinish}>
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
          <Button type="primary" htmlType="submit" loading={loading} block>
            注册
          </Button>
        </Form.Item>
      </Form>
    </RegisterContainer>
  );
};

export default Register; 