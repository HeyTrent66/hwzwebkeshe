import React from 'react';
import { Card, Typography, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
`;

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <StyledCard>
        <Title level={2}>欢迎来到大学校园论坛</Title>
        <Paragraph>
          这里是同学们交流学习、分享生活的平台。
        </Paragraph>
        <Space>
          <Button type="primary" size="large">
            <Link to="/posts">浏览帖子</Link>
          </Button>
          <Button size="large">
            <Link to="/create-post">发布帖子</Link>
          </Button>
        </Space>
      </StyledCard>

      <StyledCard title="热门版块">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button type="link" block>
            <Link to="/posts?board=1">学习交流</Link>
          </Button>
          <Button type="link" block>
            <Link to="/posts?board=2">校园生活</Link>
          </Button>
          <Button type="link" block>
            <Link to="/posts?board=3">求职就业</Link>
          </Button>
        </Space>
      </StyledCard>
    </HomeContainer>
  );
};

export default Home; 