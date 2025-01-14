import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, List, Avatar, Card, Empty } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { User } from '../../types';

const ChatContainer = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

const InputArea = styled.div`
  padding: 16px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  gap: 8px;
`;

const MessageBubble = styled.div<{ isSelf: boolean }>`
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${props => props.isSelf ? '#1890ff' : '#f0f0f0'};
  color: ${props => props.isSelf ? 'white' : 'inherit'};
  align-self: ${props => props.isSelf ? 'flex-end' : 'flex-start'};
  margin: 4px 0;
`;

interface Message {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  createdAt: string;
}

interface ChatWindowProps {
  currentUser: User;
  targetUser: User;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ currentUser, targetUser }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    const timer = setInterval(fetchMessages, 10000); // 每10秒刷新一次
    return () => clearInterval(timer);
  }, []);

  const fetchMessages = async () => {
    try {
      // const response = await getMessages(targetUser.userId);
      // setMessages(response.data);
      scrollToBottom();
    } catch (error) {
      console.error('获取消息失败:', error);
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    setLoading(true);
    try {
      // await sendMessage({
      //   receiverId: targetUser.userId,
      //   content: inputValue
      // });
      setInputValue('');
      fetchMessages();
    } catch (error) {
      console.error('发送消息失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContainer>
      <Card 
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar src={targetUser.avatarUrl} icon={<UserOutlined />} />
            {targetUser.username}
          </div>
        }
        bordered={false}
        style={{ height: '100%' }}
      >
        <MessageList>
          {messages.length === 0 ? (
            <Empty description="暂无消息" />
          ) : (
            messages.map(msg => (
              <MessageBubble
                key={msg.id}
                isSelf={msg.senderId === currentUser.userId}
              >
                {msg.content}
              </MessageBubble>
            ))
          )}
          <div ref={messageEndRef} />
        </MessageList>
        <InputArea>
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onPressEnter={handleSend}
            placeholder="输入消息..."
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            loading={loading}
          >
            发送
          </Button>
        </InputArea>
      </Card>
    </ChatContainer>
  );
};

export default ChatWindow; 