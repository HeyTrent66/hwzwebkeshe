import { useState, useEffect } from 'react';
import { Tag } from '../types/post';

const mockTags: Tag[] = [
  { tagId: 1, name: "学习", postCount: 234 },
  { tagId: 2, name: "生活", postCount: 156 }
];

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTags(mockTags);
      setLoading(false);
    }, 500);
  }, []);

  return { tags, loading };
}; 