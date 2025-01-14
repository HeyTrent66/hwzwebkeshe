import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Input, Button, List, Avatar, message } from 'antd';
import { getMessages, sendMessage, markAsRead, getConversations } from '../../api/message';
import { Message, Conversation } from '../../types/message';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';
import type { ListProps } from 'antd/lib/list';
import { RootState, store } from '../../store';

const ChatContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const StyledList = styled(List<Message>)`
  margin-bottom: 24px;
  height: 400px;
  overflow-y: auto;
`;

const MessageInput = styled(Input.TextArea)`
  margin-bottom: 16px;
`;

const Chat: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (userId) {
      fetchMessages();
      markConversationAsRead();
    }
  }, [userId]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await getMessages(parseInt(userId!));
      setMessages(data);
    } catch (error) {
      message.error('获取消息失败');
    } finally {
      setLoading(false);
    }
  };

  const markConversationAsRead = async () => {
    try {
      const currentUser = (store.getState() as RootState).auth.user;
      const conversations = await getConversations();
      const conversation = conversations.find(
        (conv: Conversation) => conv.otherUser.userId === parseInt(userId!)
      );
      
      if (conversation) {
        const response = await markAsRead(conversation.conversationId);
        if (response.success) {
          window.dispatchEvent(new Event('updateConversations'));
        }
      }
    } catch (error) {
      console.error('标记已读失败:', error);
    }
  };

  const handleSend = async () => {
    if (!content.trim()) {
      return;
    }

    try {
      const newMessage = await sendMessage({
        receiverId: parseInt(userId!),
        content: content.trim()
      });
      setMessages(prev => [...prev, newMessage]);
      setContent('');
    } catch (error) {
      message.error('发送失败');
    }
  };

  return (
    <ChatContainer>
      <Card>
        <StyledList
          loading={loading}
          dataSource={messages}
          renderItem={(msg) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={msg.senderId === 1 ? '我' : '对方'}
                description={msg.content}
              />
            </List.Item>
          )}
        />
        <MessageInput
          rows={4}
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="输入消息..."
        />
        <Button type="primary" onClick={handleSend}>
          发送
        </Button>
      </Card>
    </ChatContainer>
  );
};

export default Chat; 