import React, { useEffect, useState } from 'react';
import { Badge, Dropdown, List, Avatar, Empty } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BellIcon = styled(BellOutlined)`
  font-size: 20px;
  cursor: pointer;
`;

interface Notification {
  id: number;
  type: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // 获取通知列表
    // fetchNotifications();
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    // 标记通知为已读
    // markAsRead(notification.id);
  };

  const notificationList = (
    <List
      style={{ width: 300, maxHeight: 400, overflow: 'auto' }}
      dataSource={notifications}
      locale={{ emptyText: <Empty description="暂无通知" /> }}
      renderItem={(item) => (
        <List.Item onClick={() => handleNotificationClick(item)}>
          <List.Item.Meta
            avatar={<Avatar icon={<BellOutlined />} />}
            title={item.type}
            description={item.content}
          />
        </List.Item>
      )}
    />
  );

  return (
    <Dropdown overlay={notificationList} trigger={['click']}>
      <Badge count={unreadCount}>
        <BellIcon />
      </Badge>
    </Dropdown>
  );
};

export default NotificationBell; 