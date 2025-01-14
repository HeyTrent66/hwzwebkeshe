import React from 'react';
import { Card, Row, Col, Statistic, Table, Typography } from 'antd';
import { 
  UserOutlined, 
  FileTextOutlined, 
  LikeOutlined, 
  StarOutlined 
} from '@ant-design/icons';
import styled from 'styled-components';

const { Title } = Typography;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
`;

interface DailyStats {
  date: string;
  posts: number;
  comments: number;
  likes: number;
  views: number;
}

const UserStats: React.FC = () => {
  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '发帖数',
      dataIndex: 'posts',
      key: 'posts',
    },
    {
      title: '评论数',
      dataIndex: 'comments',
      key: 'comments',
    },
    {
      title: '获赞数',
      dataIndex: 'likes',
      key: 'likes',
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      key: 'views',
    },
  ];

  const dailyStats: DailyStats[] = [
    // 这里添加每日统计数据
  ];

  return (
    <StatsContainer>
      <Title level={4}>数据统计</Title>
      <Row gutter={16}>
        <Col span={6}>
          <StyledCard>
            <Statistic
              title="总发帖数"
              value={93}
              prefix={<FileTextOutlined />}
            />
          </StyledCard>
        </Col>
        <Col span={6}>
          <StyledCard>
            <Statistic
              title="获得点赞"
              value={1128}
              prefix={<LikeOutlined />}
            />
          </StyledCard>
        </Col>
        <Col span={6}>
          <StyledCard>
            <Statistic
              title="收藏数"
              value={256}
              prefix={<StarOutlined />}
            />
          </StyledCard>
        </Col>
        <Col span={6}>
          <StyledCard>
            <Statistic
              title="关注者"
              value={521}
              prefix={<UserOutlined />}
            />
          </StyledCard>
        </Col>
      </Row>

      <StyledCard title="每日数据统计">
        <Table
          columns={columns}
          dataSource={dailyStats}
          rowKey="date"
          pagination={{ pageSize: 7 }}
        />
      </StyledCard>
    </StatsContainer>
  );
};

export default UserStats; 