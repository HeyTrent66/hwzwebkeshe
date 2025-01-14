import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Select } from 'antd';
import { RootState } from '../store';
import { fetchPosts, searchPosts } from '../store/postSlice';
import PostList from '../components/post/PostList';
import SearchInput from '../components/search/SearchInput';
import { useAppDispatch } from '../hooks/useAppDispatch';

const { Option } = Select;

const PostListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loading } = useSelector((state: RootState) => state.posts);
  const { boards } = useSelector((state: RootState) => state.boards);
  const [currentBoardId, setCurrentBoardId] = useState<number>(-1);

  useEffect(() => {
    // 获取所有帖子
    dispatch(fetchPosts({ page: 1, size: 100 }));
  }, [dispatch]);

  const handleBoardChange = (value: number) => {
    setCurrentBoardId(value);
    dispatch(fetchPosts({ 
      page: 1, 
      size: 100, 
      boardId: value === -1 ? undefined : value
    }));
  };

  const handleSearch = (keyword: string, type: string) => {
    if (!keyword.trim()) {
      // 如果搜索关键词为空，显示所有帖子（保持当前版块筛选）
      dispatch(fetchPosts({
        page: 1,
        size: 100,
        boardId: currentBoardId === -1 ? undefined : currentBoardId
      }));
      return;
    }

    // 使用 searchPosts action 进行搜索
    dispatch(searchPosts({ 
      keyword: keyword.trim(),
      type
    }));
  };

  return (
    <Card
      title="帖子列表"
      extra={
        <Select
          placeholder="选择版块"
          defaultValue={-1}
          style={{ width: 200 }}
          onChange={handleBoardChange}
        >
          <Option value={-1}>全部</Option>
          {boards.map(board => (
            <Option key={board.boardId} value={board.boardId}>
              {board.name}
            </Option>
          ))}
        </Select>
      }
    >
      <SearchInput onSearch={handleSearch} loading={loading} />
      <PostList 
        posts={posts} 
        loading={loading}
        pagination={false}
      />
    </Card>
  );
};

export default PostListPage; 