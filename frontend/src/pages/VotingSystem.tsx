import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, Radio, Checkbox, Progress, Space, List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface VoteOption {
  id: number;
  text: string;
  count: number;
}

interface Vote {
  id: number;
  title: string;
  description: string;
  type: 'single' | 'multiple';
  options: VoteOption[];
  totalVotes: number;
  endTime: string;
  isActive: boolean;
}

const VotingSystem: React.FC = () => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCreateVote = async (values: any) => {
    try {
      // 创建投票
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVote = async (voteId: number, optionIds: number[]) => {
    try {
      // 提交投票
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="voting-system">
      <Card
        title="投票调查"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            发起投票
          </Button>
        }
      >
        <List
          dataSource={votes}
          renderItem={(vote) => (
            <Card
              key={vote.id}
              title={vote.title}
              style={{ marginBottom: 16 }}
            >
              <p>{vote.description}</p>
              <Space direction="vertical" style={{ width: '100%' }}>
                {vote.options.map(option => (
                  <div key={option.id}>
                    {vote.type === 'single' ? (
                      <Radio>{option.text}</Radio>
                    ) : (
                      <Checkbox>{option.text}</Checkbox>
                    )}
                    <Progress
                      percent={Math.round((option.count / vote.totalVotes) * 100)}
                      size="small"
                    />
                  </div>
                ))}
              </Space>
              {vote.isActive && (
                <Button type="primary" style={{ marginTop: 16 }}>
                  提交投票
                </Button>
              )}
            </Card>
          )}
        />
      </Card>

      <Modal
        title="发起投票"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateVote}>
          <Form.Item
            name="title"
            label="投票标题"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="投票描述"
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="type"
            label="投票类型"
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Radio value="single">单选</Radio>
              <Radio value="multiple">多选</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.List
            name="options"
            rules={[{ validator: async (_, value) => {
              if (value && value.length < 2) {
                return Promise.reject(new Error('至少需要两个选项'));
              }
              return Promise.resolve();
            }}]}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    required={false}
                    key={field.key}
                    label={index === 0 ? '选项列表' : ''}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[{ required: true, message: '请输入选项内容' }]}
                      noStyle
                    >
                      <Input style={{ width: '90%' }} placeholder="选项内容" />
                    </Form.Item>
                    {fields.length > 2 && (
                      <Button type="link" onClick={() => remove(field.name)}>
                        删除
                      </Button>
                    )}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    添加选项
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};

export default VotingSystem; 