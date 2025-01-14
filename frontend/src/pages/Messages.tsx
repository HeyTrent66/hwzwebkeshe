import React, { useState, useEffect } from 'react';
import { List, Card, Badge, Avatar, Typography, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Conversation } from '../types/message';
import { getConversations } from '../api/message';

const { Text } = Typography;

const MessagesContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const MessageItem = styled(List.Item)`
  padding: 12px !important;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const UserInfo = styled.div`
  flex: 1;
  margin-left: 12px;
`;

const LastMessage = styled(Text)`
  color: #8c8c8c;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 400px;
`;

const Messages: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (error) {
      console.error('获取会话列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MessagesContainer>
      <Card title="我的消息">
        <List
          loading={loading}
          dataSource={conversations}
          locale={{ emptyText: <Empty description="暂无消息" /> }}
          renderItem={(conversation) => (
            <MessageItem>
              <Link to={`/messages/${conversation.otherUser.userId}`} style={{ width: '100%' }}>
                <MessageContent>
                  <Badge count={conversation.unreadCount}>
                    <Avatar 
                      size="large"
                      src={conversation.otherUser.avatarUrl} 
                      icon={<UserOutlined />} 
                    />
                  </Badge>
                  <UserInfo>
                    <Text strong>{conversation.otherUser.username}</Text>
                    <LastMessage>{conversation.lastMessage.content}</LastMessage>
                  </UserInfo>
                </MessageContent>
              </Link>
            </MessageItem>
          )}
        />
      </Card>
    </MessagesContainer>
  );
};

export default Messages; 