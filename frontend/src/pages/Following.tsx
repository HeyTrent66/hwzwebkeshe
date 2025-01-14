import React, { useState, useEffect } from 'react';
import { List, Card, Avatar, Button, Tabs, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { getFollowers, getFollowing, unfollowUser } from '../api/user';

const FollowContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const Following: React.FC = () => {
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFollowData = async () => {
    setLoading(true);
    try {
      const [followersData, followingData] = await Promise.all([
        getFollowers(1), // 当前用户ID
        getFollowing(1),
      ]);
      setFollowers(followersData);
      setFollowing(followingData);
    } catch (error) {
      message.error('获取关注数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowData();
  }, []);

  const handleUnfollow = async (userId: number) => {
    try {
      await unfollowUser(userId);
      message.success('取消关注成功');
      fetchFollowData();
    } catch (error) {
      message.error('操作失败');
    }
  };

  const renderUserList = (users: User[], showUnfollow = false) => (
    <List
      loading={loading}
      dataSource={users}
      renderItem={(user) => (
        <List.Item
          actions={showUnfollow ? [
            <Button 
              type="link" 
              onClick={() => handleUnfollow(user.userId)}
            >
              取消关注
            </Button>
          ] : []}
        >
          <List.Item.Meta
            avatar={
              <Avatar src={user.avatarUrl} icon={<UserOutlined />} />
            }
            title={<Link to={`/user/${user.userId}`}>{user.username}</Link>}
            description={user.bio || '这个用户很懒，什么都没写~'}
          />
        </List.Item>
      )}
    />
  );

  const items = [
    {
      key: 'following',
      label: `关注 ${following.length}`,
      children: renderUserList(following, true),
    },
    {
      key: 'followers',
      label: `粉丝 ${followers.length}`,
      children: renderUserList(followers),
    },
  ];

  return (
    <FollowContainer>
      <Card>
        <Tabs items={items} />
      </Card>
    </FollowContainer>
  );
};

export default Following; 