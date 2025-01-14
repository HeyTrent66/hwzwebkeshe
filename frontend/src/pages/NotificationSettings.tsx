import React, { useState } from 'react';
import { Card, List, Switch, Form, Radio, Button, message } from 'antd';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

interface NotificationSetting {
  key: string;
  title: string;
  description: string;
  type: 'switch' | 'radio';
  options?: { label: string; value: string }[];
}

const NotificationSettings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const notificationSettings: NotificationSetting[] = [
    {
      key: 'postComment',
      title: '帖子评论通知',
      description: '当有人评论你的帖子时通知你',
      type: 'switch',
    },
    {
      key: 'replyComment',
      title: '评论回复通知',
      description: '当有人回复你的评论时通知你',
      type: 'switch',
    },
    {
      key: 'newFollower',
      title: '新粉丝通知',
      description: '当有人关注你时通知你',
      type: 'switch',
    },
    {
      key: 'likePost',
      title: '点赞通知',
      description: '当有人点赞你的帖子或评论时通知你',
      type: 'radio',
      options: [
        { label: '所有点赞', value: 'all' },
        { label: '仅关注的人', value: 'following' },
        { label: '关闭', value: 'none' },
      ],
    },
    {
      key: 'systemMessage',
      title: '系统消息',
      description: '接收系统公告和重要通知',
      type: 'switch',
    },
  ];

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      // await updateNotificationSettings(values);
      message.success('设置已保存');
    } catch (error) {
      message.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsContainer>
      <Card title="通知设置">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            postComment: true,
            replyComment: true,
            newFollower: true,
            likePost: 'all',
            systemMessage: true,
          }}
        >
          <List
            dataSource={notificationSettings}
            renderItem={(setting) => (
              <List.Item>
                <List.Item.Meta
                  title={setting.title}
                  description={setting.description}
                />
                <Form.Item name={setting.key} noStyle>
                  {setting.type === 'switch' ? (
                    <Switch />
                  ) : (
                    <Radio.Group options={setting.options} />
                  )}
                </Form.Item>
              </List.Item>
            )}
          />
          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              保存设置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </SettingsContainer>
  );
};

export default NotificationSettings; 