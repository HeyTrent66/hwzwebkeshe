import React, { useState } from 'react';
import { Card, Form, Input, Button, Steps, message, Result } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const VerificationContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
`;

const StyledCard = styled(Card)`
  .ant-steps {
    margin-bottom: 24px;
  }
`;

const EmailVerification: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSendCode = async (values: { email: string }) => {
    setLoading(true);
    try {
      // await sendVerificationCode(values.email);
      setEmail(values.email);
      message.success('验证码已发送到您的邮箱');
      setCurrent(1);
    } catch (error) {
      message.error('发送失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (values: { code: string }) => {
    setLoading(true);
    try {
      // await verifyEmailCode(email, values.code);
      message.success('邮箱验证成功');
      setCurrent(2);
    } catch (error) {
      message.error('验证码错误');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: '输入邮箱',
      content: (
        <Form form={form} onFinish={handleSendCode}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入校园邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
              { 
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(edu|edu\.[a-z]{2})$/,
                message: '请使用教育邮箱' 
              }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="请输入您的校园邮箱"
            />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
            >
              发送验证码
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: '验证邮箱',
      content: (
        <Form onFinish={handleVerifyCode}>
          <Form.Item
            name="code"
            rules={[
              { required: true, message: '请输入验证码' },
              { len: 6, message: '验证码为6位数字' }
            ]}
          >
            <Input 
              placeholder="请输入验证码" 
              maxLength={6}
            />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
            >
              验证
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: '完成',
      content: (
        <Result
          status="success"
          title="邮箱验证成功！"
          subTitle="您现在可以使用所有功能了"
        />
      ),
    },
  ];

  return (
    <VerificationContainer>
      <StyledCard>
        <Steps current={current} items={steps} />
        {steps[current].content}
      </StyledCard>
    </VerificationContainer>
  );
};

export default EmailVerification; 