import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, message, Divider } from 'antd';
import PostContent from '../components/post/PostContent';
import PostActions from '../components/post/PostActions';
import CommentList from '../components/comment/CommentList';
import { Post } from '../types/post';
import { Comment } from '../types/comment';

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const viewCountUpdated = useRef(false);

  // 增加浏览次数
  const incrementViewCount = (targetPost: Post) => {
    if (viewCountUpdated.current) return;

    try {
      const postsJson = localStorage.getItem('local_posts');
      if (!postsJson) return;

      const posts: Post[] = JSON.parse(postsJson);
      const postToUpdate = posts.find(p => p.postId === targetPost.postId);
      
      if (postToUpdate) {
        postToUpdate.viewCount += 0.5;
        localStorage.setItem('local_posts', JSON.stringify(posts));
        
        setPost({
          ...targetPost,
          viewCount: postToUpdate.viewCount
        });

        viewCountUpdated.current = true;
      }
    } catch (error) {
      console.error('Error updating view count:', error);
    }
  };

  // 加载帖子和评论
  useEffect(() => {
    viewCountUpdated.current = false;
    
    const loadPost = async () => {
      if (!postId) {
        message.error('帖子ID不存在');
        navigate('/', { replace: true });
        return;
      }

      try {
        const postsJson = localStorage.getItem('local_posts');
        if (!postsJson) {
          throw new Error('没有找到帖子数据');
        }

        const posts: Post[] = JSON.parse(postsJson);
        const numericPostId = Number(postId);

        if (isNaN(numericPostId)) {
          throw new Error('无效的帖子ID');
        }

        const targetPost = posts.find(p => p.postId === numericPostId);

        if (!targetPost) {
          throw new Error('帖子不存在');
        }

        setPost(targetPost);
        incrementViewCount(targetPost);
        
        // 加载评论
        const commentsJson = localStorage.getItem('local_comments');
        if (commentsJson) {
          const allComments: Comment[] = JSON.parse(commentsJson);
          const postComments = allComments.filter(c => c.postId === numericPostId);
          setComments(postComments);
        }
      } catch (error) {
        console.error('Error:', error);
        message.error(error instanceof Error ? error.message : '加载失败');
        navigate('/', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId, navigate]);

  const handlePostUpdate = (updatedPost: Post) => {
    setPost(updatedPost);
  };

  const handleCommentAdded = (newComment: Comment) => {
    setComments(prev => [newComment, ...prev]);
    
    // 更新帖子评论数
    if (post) {
      const postsJson = localStorage.getItem('local_posts');
      if (postsJson) {
        const posts: Post[] = JSON.parse(postsJson);
        const targetPost = posts.find(p => p.postId === post.postId);
        if (targetPost) {
          targetPost.commentCount += 1;
          localStorage.setItem('local_posts', JSON.stringify(posts));
          setPost({
            ...post,
            commentCount: targetPost.commentCount
          });
        }
      }
    }
  };

  const handleCommentsUpdate = (updatedComments: Comment[]) => {
    setComments(updatedComments);
  };

  const handlePostDelete = () => {
    navigate('/', { replace: true });
  };

  if (loading) return <Spin />;
  if (!post) return null;

  return (
    <div>
      <Card>
        <PostContent post={post} />
        <PostActions 
          post={post} 
          onPostUpdate={handlePostUpdate}
          onPostDelete={handlePostDelete}
        />
      </Card>
      <Card style={{ marginTop: 16 }}>
        <CommentList 
          postId={Number(postId)}
          boardId={post.boardId}
          comments={comments}
          onCommentAdded={handleCommentAdded}
          onCommentsUpdate={handleCommentsUpdate}
        />
      </Card>
    </div>
  );
};

export default PostDetail; 