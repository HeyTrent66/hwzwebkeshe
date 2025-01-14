import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const UserMenu: React.FC = () => {
  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: '个人中心',
      icon: <UserOutlined />
    },
    {
      key: '2',
      label: '退出登录'
    }
  ];

  return (
    <Dropdown menu={{ items: menuItems }}>
      <span>用户名</span>
    </Dropdown>
  );
};

export default UserMenu; 