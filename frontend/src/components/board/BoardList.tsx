import React from 'react';
import { Card, List, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Board } from '../../types/post';

const { Text } = Typography;

const BoardContainer = styled.div`
  margin-bottom: 24px;
`;

const BoardItem = styled(List.Item)`
  padding: 16px !important;
`;

const BoardTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const BoardDescription = styled(Text)`
  color: #8c8c8c;
`;

interface BoardListProps {
  boards: Board[];
  loading?: boolean;
}

const BoardList: React.FC<BoardListProps> = ({ boards, loading }) => {
  return (
    <BoardContainer>
      <Card title="版块列表">
        <List
          loading={loading}
          dataSource={boards}
          renderItem={(board) => (
            <BoardItem>
              <Link to={`/boards/${board.boardId}`}>
                <BoardTitle>{board.name}</BoardTitle>
                <BoardDescription>{board.description}</BoardDescription>
                <div>帖子数: {board.postCount}</div>
              </Link>
            </BoardItem>
          )}
        />
      </Card>
    </BoardContainer>
  );
};

export default BoardList; 