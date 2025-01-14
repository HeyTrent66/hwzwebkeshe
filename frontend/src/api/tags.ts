import { Tag } from '../types/post';

const mockTags: Tag[] = [
  {
    tagId: 1,
    name: "学习",
    postCount: 234
  },
  {
    tagId: 2,
    name: "生活",
    postCount: 156
  },
  {
    tagId: 3,
    name: "活动",
    postCount: 89
  },
  {
    tagId: 4,
    name: "考试",
    postCount: 123
  },
  {
    tagId: 5,
    name: "社团",
    postCount: 67
  }
];

export const getTags = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockTags;
}; 