import { useState, useEffect } from 'react';
import { Board } from '../types/post';

const mockBoards: Board[] = [
  {
    boardId: 1,
    name: "校园生活",
    description: "分享校园生活趣事",
    postCount: 156,
    order: 1,
    parentId: null
  },
  {
    boardId: 2,
    name: "学习交流",
    description: "课程学习与考试交流",
    postCount: 234,
    order: 2,
    parentId: null
  }
];

export const useBoards = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setBoards(mockBoards);
      setLoading(false);
    }, 500);
  }, []);

  return { boards, loading };
}; 