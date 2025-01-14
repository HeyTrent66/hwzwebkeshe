import React, { useState, useEffect } from 'react';
import { Table, Card, Tabs, Avatar, Tag } from 'antd';
import { UserOutlined, TrophyOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserLevel from '../components/common/UserLevel';

const LeaderboardContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
`;

interface RankingUser {
  userId: number;
  username: string;
  avatarUrl: string;
  level: number;
  experience: number;
  nextLevelExp: number;
  posts: number;
  likes: number;
  rank: number;
}

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRankingData();
  }, []);

  const fetchRankingData = async () => {
    setLoading(true);
    try {
      // const response = await getRankingList();
      // setUsers(response.data);
    } catch (error) {
      console.error('获取排行榜数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: '排名',
      dataIndex: 'rank',
      width: 80,
      render: (rank: number) => (
        <Tag color={rank <= 3 ? 'gold' : undefined}>
          {rank <= 3 ? <TrophyOutlined /> : null} {rank}
        </Tag>
      ),
    },
    {
      title: '用户',
      dataIndex: 'username',
      render: (_: string, record: RankingUser) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar src={record.avatarUrl} icon={<UserOutlined />} />
          <Link to={`/user/${record.userId}`}>{record.username}</Link>
          <UserLevel
            level={record.level}
            experience={record.experience}
            nextLevelExp={record.nextLevelExp}
          />
        </div>
      ),
    },
    {
      title: '发帖数',
      dataIndex: 'posts',
      sorter: (a: RankingUser, b: RankingUser) => a.posts - b.posts,
    },
    {
      title: '获赞数',
      dataIndex: 'likes',
      sorter: (a: RankingUser, b: RankingUser) => a.likes - b.likes,
    },
  ];

  const items = [
    {
      key: 'weekly',
      label: '周榜',
      children: (
        <Table
          columns={columns}
          dataSource={users}
          rowKey="userId"
          loading={loading}
          pagination={false}
        />
      ),
    },
    {
      key: 'monthly',
      label: '月榜',
      children: '月榜数据',
    },
    {
      key: 'total',
      label: '总榜',
      children: '总榜数据',
    },
  ];

  return (
    <LeaderboardContainer>
      <Card title="用户排行榜">
        <Tabs items={items} />
      </Card>
    </LeaderboardContainer>
  );
};

export default Leaderboard; 