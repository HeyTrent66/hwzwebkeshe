import React from 'react';
import { Modal, Form, Input, Radio, message } from 'antd';

interface ReportModalProps {
  visible: boolean;
  postId: number;
  onClose: () => void;
}

const reportReasons = [
  { label: '垃圾广告', value: 'spam' },
  { label: '违规内容', value: 'inappropriate' },
  { label: '侵权内容', value: 'copyright' },
  { label: '其他原因', value: 'other' },
];

const ReportModal: React.FC<ReportModalProps> = ({ visible, postId, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // await reportPost(postId, values);
      message.success('举报已提交');
      form.resetFields();
      onClose();
    } catch (error) {
      message.error('提交失败');
    }
  };

  return (
    <Modal
      title="举报帖子"
      open={visible}
      onOk={handleSubmit}
      onCancel={onClose}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="reason"
          label="举报原因"
          rules={[{ required: true, message: '请选择举报原因' }]}
        >
          <Radio.Group>
            {reportReasons.map(reason => (
              <Radio key={reason.value} value={reason.value}>
                {reason.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="description"
          label="详细说明"
          rules={[{ required: true, message: '请输入详细说明' }]}
        >
          <Input.TextArea rows={4} placeholder="请详细描述问题" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReportModal; 