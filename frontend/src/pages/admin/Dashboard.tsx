import React from 'react';
import { Card, Statistic, Table } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const AdminDashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user?.role !== 'ADMIN') {
    return <div>无权访问</div>;
  }

  return (
    <div>
      <Card title="系统概览">
        <Statistic title="总用户数" value={1000} />
        <Statistic title="今日发帖" value={100} />
        <Statistic title="待审核内容" value={50} />
      </Card>
      {/* 其他管理功能 */}
    </div>
  );
}; 