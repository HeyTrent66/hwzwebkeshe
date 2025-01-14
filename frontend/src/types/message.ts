export interface Message {
  messageId: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface Conversation {
  conversationId: number;
  otherUser: {
    userId: number;
    username: string;
    avatarUrl: string;
  };
  lastMessage: Message;
  unreadCount: number;
} 