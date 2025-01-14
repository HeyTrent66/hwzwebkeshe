import React, { useEffect } from 'react';
import { Badge, Dropdown, List } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useWebSocket } from '../../hooks/useWebSocket';

const NotificationCenter: React.FC = () => {
  const { notifications, connect } = useWebSocket();

  useEffect(() => {
    connect();
  }, []);

  return (
    <Dropdown
      menu={{
        items: notifications.map(item => ({
          key: item.id,
          label: item.content
        }))
      }}
    >
      <Badge count={notifications.length}>
        <BellOutlined />
      </Badge>
    </Dropdown>
  );
};

export default NotificationCenter; 