import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getPosts, getPostDetail, createPost, delay, getLocalPosts, likePost as likePostApi } from '../api/posts';
import { Post, CreatePostData } from '../types/post';

interface PostState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: PostState = {
  posts: [],  // 改回空数组，让数据通过 getPosts 获取
  currentPost: null,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (params: { page: number; size: number; boardId?: number; userId?: number; keyword?: string }) => {
    console.log('Fetching posts with params:', params);
    const response = await getPosts(params);
    console.log('Fetched posts:', response);
    return response;
  }
);

export const fetchPostDetail = createAsyncThunk(
  'posts/fetchPostDetail',
  async (postId: number, { rejectWithValue }) => {
    try {
      console.log('=== fetchPostDetail Thunk ===');
      console.log('Fetching post with ID:', postId, typeof postId);
      
      const response = await getPostDetail(postId);
      console.log('API response:', response);
      
      if (!response) {
        console.log('No post found, throwing error');
        throw new Error('帖子不存在');
      }
      
      return response;
    } catch (error) {
      console.error('Error in fetchPostDetail:', error);
      return rejectWithValue(error instanceof Error ? error.message : '加载失败');
    }
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (postId: number) => {
    const response = await likePostApi(postId);
    return response;
  }
);

export const collectPost = createAsyncThunk(
  'posts/collectPost',
  async (postId: number) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return postId;
  }
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (data: CreatePostData) => {
    const response = await createPost(data);
    return response;
  }
);

export const searchPosts = createAsyncThunk(
  'posts/searchPosts',
  async (params: { keyword: string; type: string }) => {
    await delay(500); // 添加延迟模拟网络请求
    
    const allPosts = getLocalPosts();
    const { keyword, type } = params;
    const searchTerm = keyword.toLowerCase();
    
    const filteredPosts = allPosts.filter((post: Post) => {
      switch (type) {
        case 'title':
          return post.title.toLowerCase().includes(searchTerm);
        case 'content':
          return post.content.toLowerCase().includes(searchTerm);
        case 'author':
          return post.author.username.toLowerCase().includes(searchTerm);
        default:
          return false;
      }
    });
    
    return {
      posts: filteredPosts,
      totalPages: 1,
      currentPage: 1
    };
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCurrentPost: (state, action: PayloadAction<Post>) => {
      state.currentPost = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '加载失败';
      })
      .addCase(searchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '搜索失败';
      })
      .addCase(likePost.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log('Like post pending');
      })
      .addCase(likePost.fulfilled, (state, action) => {
        console.log('Like post fulfilled:', action.payload);
        state.loading = false;
        
        // 更新帖子列表中的点赞数
        const updatedPost = action.payload;
        const postIndex = state.posts.findIndex(post => post.postId === updatedPost.postId);
        console.log('Updating post in list at index:', postIndex);
        
        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost;
          console.log('Updated post in list:', state.posts[postIndex]);
        }
        
        // 如果当前正在查看的帖子就是被点赞的帖子，也更新它的点赞数
        if (state.currentPost?.postId === updatedPost.postId) {
          state.currentPost = updatedPost;
          console.log('Updated current post:', state.currentPost);
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '点赞失败';
        console.log('Like post rejected:', action.error);
      });
  }
});

export const { setCurrentPost } = postSlice.actions;
export default postSlice.reducer; 