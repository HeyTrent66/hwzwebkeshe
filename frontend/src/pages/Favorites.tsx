import React, { useState, useEffect } from 'react';
import { List, Card, Button, Space, Dropdown, Menu, message } from 'antd';
import { FolderOutlined, MoreOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import type { MenuProps } from 'antd';

const FavoritesContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
`;

interface FavoriteFolder {
  id: number;
  name: string;
  count: number;
  posts: Post[];
}

const Favorites: React.FC = () => {
  const [folders, setFolders] = useState<FavoriteFolder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    setLoading(true);
    try {
      // const response = await getFavoriteFolders();
      // setFolders(response.data);
    } catch (error) {
      message.error('获取收藏夹失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = () => {
    // 实现创建收藏夹的逻辑
  };

  const handleDeleteFolder = (folderId: number) => {
    // 实现删除收藏夹的逻辑
  };

  const handleRenameFolder = (folderId: number) => {
    // 实现重命名收藏夹的逻辑
  };

  const folderMenu = (folderId: number): MenuProps => ({
    items: [
      {
        key: 'rename',
        label: '重命名',
        onClick: () => handleRenameFolder(folderId),
      },
      {
        key: 'delete',
        label: '删除',
        danger: true,
        onClick: () => handleDeleteFolder(folderId),
      },
    ],
  });

  return (
    <FavoritesContainer>
      <Card
        title="我的收藏"
        extra={
          <Button type="primary" onClick={handleCreateFolder}>
            新建收藏夹
          </Button>
        }
      >
        <List
          loading={loading}
          dataSource={folders}
          renderItem={(folder) => (
            <List.Item
              actions={[
                <Dropdown menu={folderMenu(folder.id)} trigger={['click']}>
                  <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>,
              ]}
            >
              <List.Item.Meta
                avatar={<FolderOutlined style={{ fontSize: 24 }} />}
                title={<Link to={`/favorites/${folder.id}`}>{folder.name}</Link>}
                description={`${folder.count} 个收藏`}
              />
            </List.Item>
          )}
        />
      </Card>
    </FavoritesContainer>
  );
};

export default Favorites; 