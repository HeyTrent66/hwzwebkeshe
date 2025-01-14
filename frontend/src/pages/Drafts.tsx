import React, { useState, useEffect } from 'react';
import { List, Card, Button, Space, Popconfirm, message, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DraftsContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
`;

interface Draft {
  id: number;
  title: string;
  content: string;
  boardId: number;
  updatedAt: string;
  boardName: string;
}

const Drafts: React.FC = () => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    setLoading(true);
    try {
      // const response = await getDrafts();
      // setDrafts(response.data);
    } catch (error) {
      message.error('获取草稿箱失败');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (draft: Draft) => {
    navigate(`/create-post?draft=${draft.id}`);
  };

  const handleDelete = async (draftId: number) => {
    try {
      // await deleteDraft(draftId);
      message.success('删除成功');
      fetchDrafts();
    } catch (error) {
      message.error('删除失败');
    }
  };

  return (
    <DraftsContainer>
      <Card title="草稿箱">
        <List
          loading={loading}
          dataSource={drafts}
          renderItem={(draft) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(draft)}
                >
                  编辑
                </Button>,
                <Popconfirm
                  title="确定要删除这篇草稿吗？"
                  onConfirm={() => handleDelete(draft.id)}
                >
                  <Button type="link" danger icon={<DeleteOutlined />}>
                    删除
                  </Button>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={draft.title || '无标题草稿'}
                description={
                  <Space>
                    <Tag>{draft.boardName}</Tag>
                    <span>最后编辑：{new Date(draft.updatedAt).toLocaleString()}</span>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </DraftsContainer>
  );
};

export default Drafts; 