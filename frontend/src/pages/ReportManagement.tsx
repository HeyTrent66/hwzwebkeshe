import React, { useState } from 'react';
import { Table, Card, Button, Modal, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Report {
  id: number;
  type: 'post' | 'comment' | 'user';
  targetId: number;
  reporter: string;
  reason: string;
  evidence: string;
  status: 'pending' | 'processing' | 'resolved' | 'rejected';
  createdAt: string;
}

const ReportManagement: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

  const handleProcess = async (id: number) => {
    try {
      // await processReport(id);
      message.success('已受理');
      // 刷新列表
    } catch (error) {
      message.error('操作失败');
    }
  };

  const handleResolve = async (id: number, action: string) => {
    try {
      // await resolveReport(id, action);
      message.success('处理成功');
      // 刷新列表
    } catch (error) {
      message.error('处理失败');
    }
  };

  const columns: ColumnsType<Report> = [
    // ... 列定义
  ];

  return (
    <Card title="举报管理">
      <Table
        columns={columns}
        dataSource={reports}
        rowKey="id"
        loading={loading}
      />
    </Card>
  );
};

export default ReportManagement; 