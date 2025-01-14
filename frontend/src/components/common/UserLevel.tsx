import React from 'react';
import { Tag, Tooltip } from 'antd';
import styled from 'styled-components';

const LevelTag = styled(Tag)<{ $level: number }>`
  background: ${props => getLevelColor(props.$level)};
  color: white;
  border: none;
`;

interface UserLevelProps {
  level: number;
  experience: number;
  nextLevelExp: number;
}

const getLevelColor = (level: number): string => {
  if (level < 5) return '#8c8c8c';
  if (level < 10) return '#52c41a';
  if (level < 20) return '#1890ff';
  if (level < 30) return '#722ed1';
  return '#f5222d';
};

const getLevelTitle = (level: number): string => {
  if (level < 5) return '新手';
  if (level < 10) return '活跃';
  if (level < 20) return '达人';
  if (level < 30) return '专家';
  return '大师';
};

const UserLevel: React.FC<UserLevelProps> = ({ level, experience, nextLevelExp }) => {
  return (
    <Tooltip title={`经验值：${experience}/${nextLevelExp}`}>
      <LevelTag $level={level}>
        Lv.{level} {getLevelTitle(level)}
      </LevelTag>
    </Tooltip>
  );
};

export default UserLevel; 