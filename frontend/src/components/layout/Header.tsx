import React from 'react';
import { Layout, Menu, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { logout } from '../../store/authSlice';
import { RootState } from '../../store';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AntHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" onClick={() => navigate('/')}>首页</Menu.Item>
        {user && <Menu.Item key="2" onClick={() => navigate('/create-post')}>发帖</Menu.Item>}
      </Menu>
      <Space>
        {user ? (
          <>
            <Button type="link" onClick={() => navigate('/profile')}>
              {user.username}
            </Button>
            <Button onClick={handleLogout}>退出</Button>
          </>
        ) : (
          <>
            <Button onClick={() => navigate('/login')}>登录</Button>
            <Button onClick={() => navigate('/register')}>注册</Button>
          </>
        )}
      </Space>
    </AntHeader>
  );
};

export default Header; 