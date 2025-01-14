import { useState, useEffect } from 'react';

interface Notification {
  id: number;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export const useWebSocket = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const connect = () => {
    // WebSocket 连接逻辑
  };

  return { notifications, connect };
}; 