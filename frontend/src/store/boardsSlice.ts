import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Board } from '../types/post';

interface BoardsState {
  boards: Board[];
  loading: boolean;
  error: string | null;
}

const initialState: BoardsState = {
  boards: [
    {
      boardId: 1,
      name: "学习交流",
      description: "课程学习与考试交流",
      postCount: 234,
      order: 1,
      parentId: null
    },
    {
      boardId: 2,
      name: "校园生活",
      description: "分享校园生活趣事",
      postCount: 156,
      order: 2,
      parentId: null
    },
    {
      boardId: 3,
      name: "求职就业",
      description: "实习与就业信息",
      postCount: 89,
      order: 3,
      parentId: null
    }
  ],
  loading: false,
  error: null
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {}
});

export default boardsSlice.reducer; 