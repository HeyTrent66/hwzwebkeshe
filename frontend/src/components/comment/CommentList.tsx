import React, { useState } from 'react';
import { Avatar, Form, Button, List, Input, message, Space, Tooltip } from 'antd';
import { Comment } from '@ant-design/compatible';
import { LikeOutlined, LikeFilled, DeleteOutlined, MessageOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Comment as CommentType } from '../../types/comment';
import { formatDate } from '../../utils';
import { addComment } from '../../api/comments';

const { TextArea } = Input;

interface CommentListProps {
  postId: number;
  boardId: number;
  comments: CommentType[];
  onCommentAdded: (comment: CommentType) => void;
  onCommentsUpdate: (comments: CommentType[]) => void;
}

const CommentList: React.FC<CommentListProps> = ({ postId, boardId, comments, onCommentAdded, onCommentsUpdate }) => {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [replyTo, setReplyTo] = useState<{ commentId: number; username: string } | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSubmit = async (value: string) => {
    if (!value.trim() || !user) return;
    
    setSubmitting(true);
    try {
      let finalContent = value.trim();
      
      // 如果是回复其他评论，添加 @用户名 前缀
      if (replyTo) {
        finalContent = `@${replyTo.username} ${finalContent}`;
      }

      const newComment = await addComment(
        postId, 
        finalContent,
        user.userId,
        replyTo ? replyTo.commentId : undefined // 添加回复的评论ID
      );
      
      // 获取并更新评论列表
      const commentsJson = localStorage.getItem('local_comments');
      const allComments: CommentType[] = commentsJson ? JSON.parse(commentsJson) : [];
      const postComments = allComments.filter((c: CommentType) => c.postId === postId);
      
      onCommentAdded(newComment);
      onCommentsUpdate(postComments);
      setValue('');
      setReplyTo(null); // 清除回复状态
      message.success('评论成功');
    } catch (error) {
      console.error('Error submitting comment:', error);
      message.error('评论失败');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = (commentId: number, username: string) => {
    if (!user) {
      message.error('请先登录');
      return;
    }
    setReplyTo({ commentId, username });
  };

  const handleLike = async (comment: CommentType) => {
    if (!user) {
      message.error('请先登录');
      return;
    }

    try {
      const commentsJson = localStorage.getItem('local_comments');
      if (!commentsJson) return;

      const allComments: CommentType[] = JSON.parse(commentsJson);
      const targetComment = allComments.find(c => c.commentId === comment.commentId);
      
      if (targetComment) {
        const likeKey = `comment_like_${user.userId}_${comment.commentId}`;
        const isLiked = localStorage.getItem(likeKey);

        if (isLiked) {
          targetComment.likes = Math.max(0, targetComment.likes - 1);
          targetComment.isLiked = false;
          localStorage.removeItem(likeKey);
        } else {
          targetComment.likes += 1;
          targetComment.isLiked = true;
          localStorage.setItem(likeKey, 'true');
        }

        localStorage.setItem('local_comments', JSON.stringify(allComments));
        onCommentsUpdate(allComments.filter(c => c.postId === postId));
      }
    } catch (error) {
      console.error('Error handling like:', error);
      message.error('操作失败');
    }
  };

  const canDeleteComment = (comment: CommentType) => {
    if (!user) return false;

    if (user.role === 'ADMIN') return true;

    if (user.role === 'BOARD_ADMIN' && user.managedBoards?.includes(boardId)) {
      return true;
    }

    return user.userId === comment.author.userId;
  };

  const handleDelete = async (commentId: number) => {
    if (!user) {
      message.error('请先登录');
      return;
    }

    try {
      const commentsJson = localStorage.getItem('local_comments');
      if (!commentsJson) return;

      const allComments: CommentType[] = JSON.parse(commentsJson);
      const targetComment = allComments.find(c => c.commentId === commentId);

      if (!targetComment) {
        message.error('评论不存在');
        return;
      }

      if (!canDeleteComment(targetComment)) {
        message.error('没有权限删除此评论');
        return;
      }

      const updatedComments = allComments.filter(c => c.commentId !== commentId);
      localStorage.setItem('local_comments', JSON.stringify(updatedComments));
      message.success('删除成功');
      onCommentsUpdate(updatedComments.filter(c => c.postId === postId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      message.error('删除失败');
    }
  };

  const sortedComments = [...comments].sort((a, b) => b.likes - a.likes);

  // 添加一个函数来获取原评论
  const getOriginalComment = (commentId: number) => {
    return comments.find(c => c.commentId === commentId);
  };

  return (
    <div>
      {user && (
        <Comment
          avatar={<Avatar src={user.avatarUrl}>{user.username[0]}</Avatar>}
          content={
            <Form.Item>
              <TextArea 
                rows={4} 
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={replyTo ? `回复 @${replyTo.username}：` : "写下你的评论..."}
                maxLength={500}
              />
              <Space style={{ marginTop: 16 }}>
                <Button 
                  htmlType="submit" 
                  loading={submitting} 
                  onClick={() => handleSubmit(value)}
                  type="primary"
                >
                  {replyTo ? '回复' : '发表评论'}
                </Button>
                {replyTo && (
                  <Button onClick={() => setReplyTo(null)}>
                    取消回复
                  </Button>
                )}
              </Space>
            </Form.Item>
          }
        />
      )}

      <List
        dataSource={sortedComments}
        header={`${comments.length} 条评论`}
        itemLayout="horizontal"
        renderItem={comment => {
          // 获取被回复的原评论
          const originalComment = comment.replyTo 
            ? getOriginalComment(comment.replyTo.commentId)
            : null;

          return (
            <Comment
              author={comment.author.username}
              avatar={<Avatar src={comment.author.avatarUrl}>{comment.author.username[0]}</Avatar>}
              content={
                <div>
                  {comment.replyTo && originalComment && (
                    <div style={{ 
                      background: '#f5f5f5', 
                      padding: '8px', 
                      borderRadius: '4px',
                      marginBottom: '8px'
                    }}>
                      <span style={{ color: '#1890ff' }}>
                        回复 @{comment.replyTo.username}：
                      </span>
                      <div style={{ 
                        color: '#666', 
                        marginTop: '4px',
                        borderLeft: '3px solid #1890ff',
                        paddingLeft: '8px'
                      }}>
                        {originalComment.content}
                      </div>
                    </div>
                  )}
                  <div>{comment.content}</div>
                </div>
              }
              datetime={formatDate(comment.createdAt)}
              actions={[
                <Tooltip key="like" title={comment.isLiked ? "取消点赞" : "点赞"}>
                  <Space onClick={() => handleLike(comment)}>
                    {comment.isLiked ? <LikeFilled /> : <LikeOutlined />}
                    <span>{comment.likes}</span>
                  </Space>
                </Tooltip>,
                <Space key="reply" onClick={() => handleReply(comment.commentId, comment.author.username)}>
                  <MessageOutlined />
                  <span>回复</span>
                </Space>,
                canDeleteComment(comment) && (
                  <Space key="delete" onClick={() => handleDelete(comment.commentId)}>
                    <DeleteOutlined />
                    <span>删除</span>
                  </Space>
                )
              ].filter(Boolean)}
            />
          );
        }}
      />
    </div>
  );
};

export default CommentList; 