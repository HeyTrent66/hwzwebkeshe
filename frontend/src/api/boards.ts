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
  },
  {
    boardId: 3,
    name: "校园活动",
    description: "各类校园活动信息",
    postCount: 89,
    order: 3,
    parentId: null
  }
];

export const getBoards = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockBoards;
}; 