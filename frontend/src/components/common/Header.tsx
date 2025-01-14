import React from 'react';
import { Layout, Menu, Button, Space } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { RootState } from '../../store';
import styled from 'styled-components';

const { Header: AntHeader } = Layout;

const StyledHeader = styled(AntHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 18px;
  font-weight: bold;
  &:hover {
    color: #1890ff;
  }
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <StyledHeader>
      <Logo to="/">大学校园论坛</Logo>
      <Menu 
        theme="dark" 
        mode="horizontal" 
        defaultSelectedKeys={['1']}
        style={{ flex: 1, minWidth: 0, marginLeft: 24 }}
      >
        <Menu.Item key="1" onClick={() => navigate('/')}>首页</Menu.Item>
        <Menu.Item key="2" onClick={() => navigate('/posts')}>帖子</Menu.Item>
        {user && (
          <>
            <Menu.Item key="3" onClick={() => navigate('/create-post')}>发帖</Menu.Item>
            <Menu.Item key="4" onClick={() => navigate('/messages')}>消息</Menu.Item>
          </>
        )}
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
            <Button type="primary" ghost onClick={() => navigate('/login')}>
              登录
            </Button>
            <Button type="primary" onClick={() => navigate('/register')}>
              注册
            </Button>
          </>
        )}
      </Space>
    </StyledHeader>
  );
};

export default Header; 