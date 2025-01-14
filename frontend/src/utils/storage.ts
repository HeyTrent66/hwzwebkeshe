export const checkLocalStorage = () => {
  const POSTS_STORAGE_KEY = 'local_posts';
  const posts = localStorage.getItem(POSTS_STORAGE_KEY);
  console.log('Local Storage Posts:', posts ? JSON.parse(posts) : []);
};

export const clearLocalStorage = () => {
  localStorage.clear();  // 清除所有数据
  // 或者只清除特定的数据
  // localStorage.removeItem('local_posts');
}; 