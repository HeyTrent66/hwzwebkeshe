import React, { useState } from 'react';
import { Form, Input, Button, Card, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { TextArea } = Input;
const { Option } = Select;

const FeedbackContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

interface FeedbackForm {
  type: string;
  title: string;
  content: string;
  contact?: string;
}

const Feedback: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FeedbackForm) => {
    setLoading(true);
    try {
      // await submitFeedback(values);
      message.success('反馈提交成功');
      form.resetFields();
    } catch (error) {
      message.error('提交失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FeedbackContainer>
      <Card title="意见反馈">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="type"
            label="反馈类型"
            rules={[{ required: true, message: '请选择反馈类型' }]}
          >
            <Select placeholder="请选择反馈类型">
              <Option value="bug">功能异常</Option>
              <Option value="suggestion">功能建议</Option>
              <Option value="content">内容问题</Option>
              <Option value="other">其他</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input placeholder="请简要描述问题" />
          </Form.Item>

          <Form.Item
            name="content"
            label="详细说明"
            rules={[{ required: true, message: '请输入详细说明' }]}
          >
            <TextArea
              rows={6}
              placeholder="请详细描述您遇到的问题或建议"
            />
          </Form.Item>

          <Form.Item
            name="contact"
            label="联系方式"
            extra="选填，方便我们联系您了解更多信息"
          >
            <Input placeholder="邮箱或手机号" />
          </Form.Item>

          <Form.Item
            label="上传截图"
            extra="可选，上传问题截图有助于我们更好地理解问题"
          >
            <Upload
              maxCount={3}
              listType="picture"
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>选择图片</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              提交反馈
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </FeedbackContainer>
  );
};

export default Feedback; 