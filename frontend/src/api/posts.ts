import { Post, CreatePostData } from '../types/post';
import { Comment, CommentFormData } from '../types/comment';
import { User, UserRole } from '../types/user';
import { store } from '../store';  // 导入 store

// 在文件顶部定义常量
const POSTS_STORAGE_KEY = 'local_posts';
const LIKED_POSTS_KEY = 'liked_posts';

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getLocalPosts = (): Post[] => {
  console.log('=== getLocalPosts start ===');
  try {
    const postsJson = localStorage.getItem(POSTS_STORAGE_KEY);
    console.log('Raw posts from storage:', postsJson);
    
    if (!postsJson) {
      console.log('No posts found in storage, creating initial posts');
      const initialPosts: Post[] = [
        {
          postId: 1,
          title: '欢迎来到校园论坛！',
          content: `欢迎各位同学来到校园论坛！

本论坛分为三大版块：
1. 学习交流：讨论学术问题、分享学习经验、课程资料交流等
2. 校园生活：分享校园趣事、社团活动、美食推荐等
3. 求职就业：发布招聘信息、分享求职经验、讨论职业规划等

请大家遵守论坛规则：
- 文明发言，互相尊重
- 不得发布违法违规内容
- 转载请注明出处
- 珍惜账号，遵守社区规范

祝大家在论坛玩得开心！`,
          author: {
            userId: 0,
            username: '智能助手',
            studentId: '0000000',
            role: 'ADMIN' as UserRole,
            avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=ai'
          },
          createdAt: '2024-03-20 08:00:00',
          updatedAt: '2024-03-20 08:00:00',
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
          status: 1,
          isTop: true,
          isEssence: true,
          isLocked: false,
          boardId: 0,
          tags: ['公告']
        },
        {
          postId: 2,
          title: '如何提高学习效率：来自智能助手的建议',
          content: `作为一名学生，掌握高效的学习方法至关重要。以下是一些实用的学习建议：

1. 制定明确的学习计划
- 设定短期和长期目标
- 合理安排学习时间
- 定期复习和检查进度

2. 使用科学的学习方法
- 番茄工作法：25分钟专注学习，5分钟休息
- 费曼学习法：通过教会别人来加深理解
- 记笔记：使用思维导图等工具整理知识点

3. 营造良好的学习环境
- 选择安静的学习场所
- 准备必要的学习用品
- 避免分心的干扰因素

4. 保持健康的作息
- 保证充足的睡眠
- 适当运动放松
- 均衡饮食提供能量

希望这些建议能帮助大家提高学习效率！`,
          author: {
            userId: 0,
            username: '智能助手',
            studentId: '0000000',
            role: 'ADMIN' as UserRole,
            avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=ai'
          },
          createdAt: '2024-03-20 09:00:00',
          updatedAt: '2024-03-20 09:00:00',
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
          status: 1,
          isTop: false,
          isEssence: true,
          isLocked: false,
          boardId: 1,
          tags: ['学习方法', '效率提升']
        },
        {
          postId: 3,
          title: '校园生活小贴士：让你的大学生活更精彩',
          content: `亲爱的同学们，大学生活不仅仅是学习，更要懂得享受多彩的校园时光：

1. 参与社团活动
- 选择感兴趣的社团
- 认识志同道合的朋友
- 培养兴趣爱好和领导力

2. 校园美食探索
- 推荐食堂必吃美食
- 周边特色小吃攻略
- 健康饮食小建议

3. 校园文化活动
- 参与学校组织的文艺活动
- 关注校园展览和讲座
- 体验不同的文化交流

4. 生活技能提升
- 学会时间管理
- 培养独立生活能力
- 建立良好的人际关系

大学时光转瞬即逝，希望大家能够充分享受这美好的时光！`,
          author: {
            userId: 0,
            username: '智能助手',
            studentId: '0000000',
            role: 'ADMIN' as UserRole,
            avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=ai'
          },
          createdAt: '2024-03-20 10:00:00',
          updatedAt: '2024-03-20 10:00:00',
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
          status: 1,
          isTop: false,
          isEssence: true,
          isLocked: false,
          boardId: 2,
          tags: ['校园生活', '社团活动']
        },
        {
          postId: 4,
          title: '求职准备全攻略：从校园到职场',
          content: `即将步入职场的同学们，这份求职指南请收好：

1. 简历制作
- 突出个人优势和特长
- 清晰的排版和结构
- 针对性的内容调整

2. 面试技巧
- 充分的企业研究
- 常见问题准备
- 专业形象塑造
- 有效沟通技巧

3. 求职渠道
- 校园招聘会
- 专业招聘网站
- 行业交流平台
- 校友资源网络

4. 职业规划
- 明确职业目标
- 制定发展路径
- 持续学习提升
- 建立职业竞争力

祝愿每位同学都能找到理想的工作！`,
          author: {
            userId: 0,
            username: '智能助手',
            studentId: '0000000',
            role: 'ADMIN' as UserRole,
            avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=ai'
          },
          createdAt: '2024-03-20 11:00:00',
          updatedAt: '2024-03-20 11:00:00',
          viewCount: 0,
          likeCount: 0,
          commentCount: 0,
          status: 1,
          isTop: false,
          isEssence: true,
          isLocked: false,
          boardId: 3,
          tags: ['求职', '就业']
        }
      ];
      const validatedInitialPosts = initialPosts.map(validatePost);
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(validatedInitialPosts));
      console.log('Saved initial posts:', validatedInitialPosts);
      return validatedInitialPosts;
    }

    const parsedPosts = JSON.parse(postsJson);
    console.log('Parsed posts:', parsedPosts);
    
    if (!Array.isArray(parsedPosts)) {
      console.error('Invalid posts data - not an array');
      return [];
    }

    // 验证所有帖子
    const validatedPosts = parsedPosts.map(validatePost);
    console.log('Validated posts:', validatedPosts);
    console.log('=== getLocalPosts end ===');
    return validatedPosts;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
};

const saveLocalPosts = (posts: Post[]) => {
  console.log('=== saveLocalPosts start ===');
  try {
    if (!Array.isArray(posts)) {
      throw new Error('Invalid posts data - not an array');
    }
    console.log('Saving posts:', posts);
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
    
    // 验证保存
    const savedData = localStorage.getItem(POSTS_STORAGE_KEY);
    console.log('Saved data in storage:', savedData);
    console.log('=== saveLocalPosts end ===');
  } catch (error) {
    console.error('Error saving posts:', error);
    throw error;
  }
};

// 获取当前登录用户
const getCurrentUser = (): User => {
  const state = store.getState();
  if (!state.auth.user) {
    throw new Error('用户未登录');
  }
  return state.auth.user;
};

export const createPost = async (data: CreatePostData) => {
  console.log('=== createPost start ===');
  await delay(500);

  try {
    const currentUser = getCurrentUser();
    console.log('Current user:', currentUser);

    // 创建新帖子
    const newPost: Post = {
      postId: Date.now(), // 使用时间戳作为ID，确保唯一性
      title: data.title,
      content: data.content,
      author: {
        userId: currentUser.userId,
        username: currentUser.username,
        studentId: currentUser.studentId,
        role: currentUser.role,
        avatarUrl: currentUser.avatarUrl
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      status: 1,
      isTop: false,
      isEssence: false,
      isLocked: false,
      boardId: Number(data.boardId),
      tags: Array.isArray(data.tags) ? data.tags : []
    };

    console.log('New post created:', newPost);

    // 获取现有帖子
    const existingPosts = getLocalPosts();
    console.log('Existing posts count:', existingPosts.length);
    
    // 将新帖子添加到列表开头
    const updatedPosts = [validatePost(newPost), ...existingPosts];
    console.log('Updated posts count:', updatedPosts.length);
    
    // 保存更新后的帖子列表
    saveLocalPosts(updatedPosts);
    
    // 验证保存是否成功
    const savedPosts = getLocalPosts();
    const savedPost = savedPosts.find(p => p.postId === newPost.postId);
    
    if (!savedPost) {
      throw new Error('帖子保存失败');
    }
    
    console.log('Post saved successfully:', savedPost);
    console.log('=== createPost end ===');
    
    return savedPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// 获取点赞状态
const getLikedPosts = (): number[] => {
  try {
    const likedPostsJson = localStorage.getItem(LIKED_POSTS_KEY);
    return likedPostsJson ? JSON.parse(likedPostsJson) : [];
  } catch (error) {
    console.error('Error reading liked posts:', error);
    return [];
  }
};

// 保存点赞状态
const saveLikedPosts = (likedPosts: number[]) => {
  try {
    localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(likedPosts));
  } catch (error) {
    console.error('Error saving liked posts:', error);
  }
};

export const getPostDetail = async (postId: number) => {
  try {
    await delay(500);
    
    console.log('=== getPostDetail ===');
    console.log('Looking for postId:', postId, typeof postId);
    
    const posts = getLocalPosts();
    
    // 查找目标帖子
    const targetId = Number(postId);
    const postIndex = posts.findIndex(p => p.postId === targetId);
    
    if (postIndex === -1) {
      console.log('Post not found');
      throw new Error('帖子不存在');
    }

    // 更新浏览数并保存
    const updatedPost = {
      ...posts[postIndex],
      viewCount: (posts[postIndex].viewCount || 0) + 1
    };
    posts[postIndex] = updatedPost;
    saveLocalPosts(posts);

    // 获取点赞状态
    const likedPosts = getLikedPosts();
    const isLiked = likedPosts.includes(targetId);

    // 验证并返回帖子数据，包含点赞状态
    const validatedPost = validatePost(updatedPost);
    const result = {
      ...validatedPost,
      isLiked
    };

    console.log('Returning post with updated view count:', result);
    return result;
  } catch (error) {
    console.error('Error in getPostDetail:', error);
    throw error;
  }
};

export const getPosts = async (params: { 
  page: number; 
  size: number; 
  boardId?: number; 
  userId?: number;
  keyword?: string;
}) => {
  console.log('=== getPosts start ===');
  console.log('Params:', params);
  await delay(500);
  
  // 获取并验证所有帖子
  let posts = getLocalPosts().map(validatePost);
  console.log('All posts:', posts);
  
  // 获取点赞状态
  const likedPosts = getLikedPosts();
  
  // 添加点赞状态到每个帖子
  posts = posts.map(post => ({
    ...post,
    isLiked: likedPosts.includes(post.postId)
  }));
  
  // 按版块筛选
  if (params.boardId !== undefined && params.boardId !== -1) {
    posts = posts.filter(post => post.boardId === params.boardId);
    console.log('Posts after board filter:', posts);
  }
  
  // 按用户筛选
  if (params.userId !== undefined) {
    console.log('Filtering by userId:', params.userId);
    posts = posts.filter(post => post.author.userId === params.userId);
    console.log('Posts after user filter:', posts);
  }
  
  // 按关键词搜索
  if (params.keyword) {
    const keyword = params.keyword.toLowerCase();
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(keyword) || 
      post.content.toLowerCase().includes(keyword)
    );
    console.log('Posts after keyword filter:', posts);
  }
  
  // 计算分页
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / params.size);
  const start = (params.page - 1) * params.size;
  const end = start + params.size;
  
  const result = {
    posts: posts.slice(start, end),
    totalPages,
    currentPage: params.page
  };
  
  console.log('Final result:', result);
  console.log('=== getPosts end ===');
  return result;
};

export const getPostById = async (id: number) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return null;
};

export const getComments = async (postId: number) => {
  await delay(500);
  
  // 从 localStorage 获取实际的评论数据
  const commentsJson = localStorage.getItem('local_comments');
  const allComments: Comment[] = commentsJson ? JSON.parse(commentsJson) : [];
  
  // 过滤出当前帖子的评论
  const postComments = allComments.filter(comment => comment.postId === postId);

  return {
    comments: postComments
  };
};

export const createComment = async (postId: number, data: CommentFormData) => {
  await delay(500);

  const newComment: Comment = {
    commentId: Math.floor(Math.random() * 10000),
    postId,
    userId: getCurrentUser().userId,
    content: data.content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    parentId: data.parentId,
    likes: 0,
    author: {
      userId: getCurrentUser().userId,
      username: getCurrentUser().username,
      avatarUrl: getCurrentUser().avatarUrl
    }
  };

  // 从 localStorage 获取评论
  const commentsJson = localStorage.getItem('local_comments');
  const comments: Comment[] = commentsJson ? JSON.parse(commentsJson) : [];
  
  // 添加新评论
  comments.unshift(newComment);
  localStorage.setItem('local_comments', JSON.stringify(comments));

  return newComment;
};

export const debugLocalStorage = () => {
  console.log('=== DEBUG LOCAL STORAGE ===');
  const postsJson = localStorage.getItem(POSTS_STORAGE_KEY);
  console.log('Raw storage:', postsJson);
  if (postsJson) {
    try {
      const posts = JSON.parse(postsJson);
      console.log('Parsed posts:', posts);
      console.log('Posts count:', posts.length);
      posts.forEach((post: Post, index: number) => {
        console.log(`Post ${index}:`, {
          id: post.postId,
          type: typeof post.postId,
          title: post.title
        });
      });
    } catch (e) {
      console.error('Parse error:', e);
    }
  }
  console.log('=== END DEBUG ===');
};

const validatePost = (post: any): Post => {
  // 确保数值字段为数字类型
  const viewCount = typeof post.viewCount === 'string' ? parseInt(post.viewCount, 10) : post.viewCount;
  const likeCount = typeof post.likeCount === 'string' ? parseInt(post.likeCount, 10) : post.likeCount;
  const commentCount = typeof post.commentCount === 'string' ? parseInt(post.commentCount, 10) : post.commentCount;
  const postId = typeof post.postId === 'string' ? parseInt(post.postId, 10) : post.postId;
  const boardId = typeof post.boardId === 'string' ? parseInt(post.boardId, 10) : post.boardId;
  const status = typeof post.status === 'string' ? parseInt(post.status, 10) : post.status;

  return {
    ...post,
    postId: Number(postId) || 0,
    tags: Array.isArray(post.tags) ? post.tags : [],
    viewCount: Number(viewCount) || 0,
    likeCount: Number(likeCount) || 0,
    commentCount: Number(commentCount) || 0,
    boardId: Number(boardId) || 0,
    status: Number(status) || 1,
    isTop: Boolean(post.isTop),
    isEssence: Boolean(post.isEssence),
    isLocked: Boolean(post.isLocked)
  };
};

export const likePost = async (postId: number) => {
  console.log('=== likePost start ===');
  console.log('Liking post with ID:', postId);
  
  await delay(500);
  
  try {
    // 获取所有帖子
    const posts = getLocalPosts();
    console.log('Current posts from storage:', posts);
    
    // 查找目标帖子
    const postIndex = posts.findIndex(post => post.postId === postId);
    console.log('Found post index:', postIndex);
    
    if (postIndex === -1) {
      throw new Error('帖子不存在');
    }
    
    // 获取当前点赞状态
    const likedPosts = getLikedPosts();
    const alreadyLiked = likedPosts.includes(postId);
    
    if (alreadyLiked) {
      console.log('Post already liked');
      // 如果已经点赞过，直接返回当前帖子
      const validatedPost = validatePost(posts[postIndex]);
      return {
        ...validatedPost,
        isLiked: true
      };
    }
    
    console.log('Current post before update:', posts[postIndex]);
    
    // 更新点赞数
    const updatedPost = {
      ...posts[postIndex],
      likeCount: (posts[postIndex].likeCount || 0) + 1
    };
    posts[postIndex] = updatedPost;
    
    console.log('Updated post:', updatedPost);
    
    // 保存更新后的帖子列表
    saveLocalPosts(posts);
    
    // 更新点赞状态
    likedPosts.push(postId);
    saveLikedPosts(likedPosts);
    
    // 返回验证后的帖子数据，包含点赞状态
    const validatedPost = validatePost(updatedPost);
    const result = {
      ...validatedPost,
      isLiked: true
    };
    console.log('Validated post to return:', result);
    console.log('=== likePost end ===');
    
    return result;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};
