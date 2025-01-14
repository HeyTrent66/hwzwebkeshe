import React from 'react';
import { Card, Progress, Typography, Space, Tag } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 16px;
  }
`;

const AchievementIcon = styled.div<{ $unlocked: boolean }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${props => props.$unlocked ? '#52c41a' : '#f0f0f0'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

interface AchievementProps {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  target: number;
  unlocked: boolean;
  category: string;
}

const AchievementCard: React.FC<AchievementProps> = ({
  title,
  description,
  icon,
  progress,
  target,
  unlocked,
  category,
}) => {
  const percent = Math.min((progress / target) * 100, 100);

  return (
    <StyledCard>
      <Space direction="vertical" align="center" style={{ width: '100%' }}>
        <AchievementIcon $unlocked={unlocked}>
          {icon}
        </AchievementIcon>
        <Title level={5}>{title}</Title>
        <Text type="secondary">{description}</Text>
        <Progress
          percent={percent}
          format={() => `${progress}/${target}`}
          status={unlocked ? 'success' : 'active'}
        />
        <Tag color={unlocked ? 'success' : 'default'}>
          {unlocked ? '已解锁' : '未解锁'}
        </Tag>
      </Space>
    </StyledCard>
  );
};

export default AchievementCard; 