import React from 'react';
import { Modal, Space, Button, Input, message } from 'antd';
import { 
  WechatOutlined, 
  QqOutlined, 
  WeiboOutlined, 
  LinkOutlined 
} from '@ant-design/icons';
import styled from 'styled-components';

const ShareButton = styled(Button)`
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  .anticon {
    font-size: 24px;
  }
`;

interface ShareModalProps {
  visible: boolean;
  postId: number;
  postTitle: string;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({
  visible,
  postId,
  postTitle,
  onClose,
}) => {
  const shareUrl = `${window.location.origin}/posts/${postId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    message.success('链接已复制到剪贴板');
  };

  const handleShare = (platform: string) => {
    // 这里可以根据不同平台实现不同的分享逻辑
    message.success(`分享到${platform}功能开发中`);
  };

  return (
    <Modal
      title="分享帖子"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Space wrap size="large" style={{ justifyContent: 'center', width: '100%' }}>
          <ShareButton onClick={() => handleShare('微信')}>
            <WechatOutlined style={{ color: '#07C160' }} />
            微信
          </ShareButton>
          <ShareButton onClick={() => handleShare('QQ')}>
            <QqOutlined style={{ color: '#12B7F5' }} />
            QQ
          </ShareButton>
          <ShareButton onClick={() => handleShare('微博')}>
            <WeiboOutlined style={{ color: '#E6162D' }} />
            微博
          </ShareButton>
        </Space>
        
        <Space.Compact style={{ width: '100%' }}>
          <Input value={shareUrl} readOnly />
          <Button icon={<LinkOutlined />} onClick={handleCopyLink}>
            复制链接
          </Button>
        </Space.Compact>
      </Space>
    </Modal>
  );
};

export default ShareModal; 