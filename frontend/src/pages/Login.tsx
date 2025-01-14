import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/authSlice';
import { login } from '../api/auth';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 0 16px;
`;

const adminInfo = [
  {
    role: '超级管理员',
    username: 'glypro',
    password: '888888'
  },
  {
    role: '学习交流板块管理员',
    username: 'xxgly',
    password: '666666'
  }
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      setLoading(true);
      
      // 检查是否是管理员登录
      if (values.username === 'glypro' && values.password === '888888') {
        const user = {
          userId: 1,
          username: 'glypro',
          role: 'ADMIN' as const,
          avatarUrl: 'https://example.com/admin-avatar.png'
        };
        dispatch(setUser(user));
        localStorage.setItem('user', JSON.stringify(user));
      } else if (values.username === 'xxgly' && values.password === '666666') {
        const user = {
          userId: 2,
          username: 'xxgly',
          role: 'BOARD_ADMIN' as const,
          managedBoards: [1],
          avatarUrl: 'https://example.com/board-admin-avatar.png'
        };
        dispatch(setUser(user));
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        // 普通用户登录逻辑
        // 从 localStorage 获取已注册用户列表
        const registeredUsers = JSON.parse(localStorage.getItem('local_users') || '[]');
        const user = registeredUsers.find((u: any) => 
          u.username === values.username
        );

        if (!user) {
          throw new Error('用户不存在，请先注册');
        }

        // 这里应该添加密码验证
        // 实际项目中应该在后端进行密码验证
        dispatch(setUser(user));
        localStorage.setItem('user', JSON.stringify(user));
      }

      message.success('登录成功');
      navigate('/');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Alert
        message="管理员账号"
        description={
          <div>
            {adminInfo.map((admin, index) => (
              <div key={index} style={{ marginBottom: 8 }}>
                <p><strong>{admin.role}</strong></p>
                <p>用户名：{admin.username}</p>
                <p>密码：{admin.password}</p>
              </div>
            ))}
          </div>
        }
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Card title="用户登录">
        <Form onFinish={handleLogin}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </LoginContainer>
  );
};

export default Login; 