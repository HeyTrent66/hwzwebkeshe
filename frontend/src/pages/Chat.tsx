import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Card, Avatar, message } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Message } from '../types/message';
import { getMessages, sendMessage, markAsRead } from '../api/message';

const CURRENT_USER_ID = 1; // 固定的当前用户ID，需要与 message.ts 中的保持一致

const ChatContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const MessageList = styled.div`
  height: 400px;
  overflow-y: auto;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const MessageItem = styled.div<{ $isSelf: boolean }>`
  display: flex;
  flex-direction: ${props => props.$isSelf ? 'row-reverse' : 'row'};
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 8px;
`;

const MessageBubble = styled.div<{ $isSelf: boolean }>`
  max-width: 70%;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${props => props.$isSelf ? '#1890ff' : '#fff'};
  color: ${props => props.$isSelf ? '#fff' : '#000'};
  word-wrap: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const MessageTime = styled.div`
  font-size: 12px;
  color: #999;
  text-align: center;
  margin: 8px 0;
`;

const Chat: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    if (userId) {
      markAsRead(Number(userId));
    }
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    if (!userId) return;
    try {
      const data = await getMessages(Number(userId));
      setMessages(data);
    } catch (err) {
      message.error('获取消息失败');
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !userId) return;

    try {
      setLoading(true);
      const newMessage = await sendMessage({
        receiverId: Number(userId),
        content: inputValue
      });
      setMessages(prev => [...prev, newMessage]);
      setInputValue('');
      
      // 设置一个定时器来检查和获取新消息（模拟自动回复）
      setTimeout(async () => {
        const updatedMessages = await getMessages(Number(userId));
        setMessages(updatedMessages);
      }, 1200);
    } catch (err) {
      message.error('发送失败');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ChatContainer>
      <Card>
        <MessageList>
          {messages.map((msg, index) => {
            // 使用固定的用户ID来判断消息是否是自己发送的
            const isSelf = msg.senderId === CURRENT_USER_ID;
            const showTime = index === 0 || 
              new Date(msg.createdAt).getTime() - new Date(messages[index - 1].createdAt).getTime() > 5 * 60 * 1000;

            return (
              <React.Fragment key={msg.messageId}>
                {showTime && (
                  <MessageTime>{formatTime(msg.createdAt)}</MessageTime>
                )}
                <MessageItem $isSelf={isSelf}>
                  <Avatar 
                    icon={<UserOutlined />} 
                    src={isSelf ? undefined : "https://api.dicebear.com/7.x/avataaars/svg?seed=zhang"}
                  />
                  <MessageBubble $isSelf={isSelf}>
                    {msg.content}
                  </MessageBubble>
                </MessageItem>
              </React.Fragment>
            );
          })}
          <div ref={messageEndRef} />
        </MessageList>
        <div style={{ display: 'flex', gap: 8 }}>
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
        </div>
      </Card>
    </ChatContainer>
  );
};

export default Chat; 