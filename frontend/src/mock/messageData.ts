import { Message, Conversation } from '../types/message';

const MESSAGES_STORAGE_KEY = 'local_messages';
const CONVERSATIONS_STORAGE_KEY = 'local_conversations';

// 从 localStorage 获取消息
const getStoredMessages = (): Message[] => {
  const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// 保存消息到 localStorage
const saveMessages = (messages: Message[]) => {
  localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
};

// 从 localStorage 获取会话
const getStoredConversations = (): any[] => {
  const stored = localStorage.getItem(CONVERSATIONS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// 保存会话到 localStorage
const saveConversations = (conversations: any[]) => {
  localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(conversations));
};

// 初始化一些测试消息
const initializeMessages = (currentUser: any) => {
  let messages = getStoredMessages();
  if (messages.length === 0) {
    messages = [
      {
        messageId: 1,
        senderId: 2,
        receiverId: currentUser?.userId,
        content: "你好，在吗？",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        isRead: true
      },
      {
        messageId: 2,
        senderId: currentUser?.userId,
        receiverId: 2,
        content: "在的，什么事？",
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        isRead: true
      },
      {
        messageId: 3,
        senderId: 2,
        receiverId: currentUser?.userId,
        content: "想请教一个问题",
        createdAt: new Date(Date.now() - 900000).toISOString(),
        isRead: false
      }
    ];
    saveMessages(messages);
  }
  return messages;
};

// 获取消息列表
export const getMockMessages = (currentUser: any) => {
  const messages = initializeMessages(currentUser);
  return messages;
};

// 添加新消息
export const addMessage = (message: Message) => {
  const messages = getStoredMessages();
  messages.push(message);
  saveMessages(messages);
  
  // 更新对应的会话最后一条消息
  const conversations = getStoredConversations();
  const conversationIndex = conversations.findIndex(
    conv => conv.otherUser.userId === message.receiverId || conv.otherUser.userId === message.senderId
  );
  
  if (conversationIndex !== -1) {
    conversations[conversationIndex].lastMessage = message;
    if (message.senderId !== conversations[conversationIndex].otherUser.userId) {
      conversations[conversationIndex].unreadCount += 1;
    }
    saveConversations(conversations);
  }
  
  return message;
};

// 初始化会话数据
const initializeConversations = (currentUser: any) => {
  let conversations = getStoredConversations();
  if (conversations.length === 0) {
    conversations = [
      {
        conversationId: 2,
        otherUser: {
          userId: 2,
          username: "张三",
          avatarUrl: ""
        },
        lastMessage: {
          messageId: 1,
          senderId: 2,
          receiverId: currentUser?.userId,
          content: "你好，在吗？",
          createdAt: new Date().toISOString(),
          isRead: false
        },
        unreadCount: 1
      },
      {
        conversationId: 3,
        otherUser: {
          userId: 3,
          username: "李四",
          avatarUrl: ""
        },
        lastMessage: {
          messageId: 2,
          senderId: currentUser?.userId,
          receiverId: 3,
          content: "好的，明天见！",
          createdAt: new Date().toISOString(),
          isRead: true
        },
        unreadCount: 0
      }
    ];
    saveConversations(conversations);
  }
  return conversations;
};

export const getMockConversations = (currentUser: any) => {
  return initializeConversations(currentUser);
};

// 更新会话状态
export const updateConversationState = (conversationId: number) => {
  const conversations = getStoredConversations();
  const updatedConversations = conversations.map(conv => {
    if (conv.conversationId === conversationId) {
      return {
        ...conv,
        unreadCount: 0,
        lastMessage: {
          ...conv.lastMessage,
          isRead: true
        }
      };
    }
    return conv;
  });
  saveConversations(updatedConversations);
  return updatedConversations;
}; 