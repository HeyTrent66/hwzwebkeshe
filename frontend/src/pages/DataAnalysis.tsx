import React, { useState, useEffect, ReactElement } from 'react';
import { Card, Row, Col, Statistic, DatePicker, Table, Space } from 'antd';
import EChartsReact from 'echarts-for-react';
import styled from 'styled-components';

const { RangePicker } = DatePicker;

const AnalysisContainer = styled.div`
  padding: 24px;
`;

const ChartCard = styled(Card)`
  margin-bottom: 24px;
`;

interface DataPoint {
  date: string;
  value: number;
  type: string;
}

const ReactECharts = EChartsReact as any;

const DataAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<[string, string]>(['', '']);

  const userActivityOption = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['发帖数', '评论数', '活跃用户']
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '发帖数',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '评论数',
        type: 'line',
        smooth: true,
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '活跃用户',
        type: 'line',
        smooth: true,
        data: [150, 232, 201, 154, 190, 330, 410]
      }
    ]
  };

  const contentDistributionOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '内容分布',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '学习交流' },
          { value: 735, name: '校园生活' },
          { value: 580, name: '活动公告' },
          { value: 484, name: '求助问答' },
          { value: 300, name: '其他' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '新增用户',
      dataIndex: 'newUsers',
      key: 'newUsers',
    },
    {
      title: '发帖数',
      dataIndex: 'posts',
      key: 'posts',
    },
    {
      title: '评论数',
      dataIndex: 'comments',
      key: 'comments',
    },
    {
      title: '活跃用户',
      dataIndex: 'activeUsers',
      key: 'activeUsers',
    }
  ];

  return (
    <AnalysisContainer>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card 
          title="数据概览" 
          extra={
            <RangePicker 
              onChange={(dates) => {
                if (dates) {
                  setDateRange([dates[0]?.toISOString() || '', dates[1]?.toISOString() || '']);
                }
              }}
            />
          }
        >
          <Row gutter={16}>
            <Col span={6}>
              <Statistic title="总用户数" value={1234} />
            </Col>
            <Col span={6}>
              <Statistic title="今日发帖" value={89} />
            </Col>
            <Col span={6}>
              <Statistic title="活跃用户" value={328} />
            </Col>
            <Col span={6}>
              <Statistic title="互动总数" value={2947} />
            </Col>
          </Row>
        </Card>

        <ChartCard title="用户活跃度趋势">
          <ReactECharts 
            option={userActivityOption}
            style={{ height: 400 }}
          />
        </ChartCard>

        <ChartCard title="内容分布">
          <ReactECharts
            option={contentDistributionOption}
            style={{ height: 400 }}
          />
        </ChartCard>

        <Card title="详细数据">
          <Table
            columns={columns}
            // dataSource={tableData}
            loading={loading}
            pagination={{
              total: 100,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
          />
        </Card>
      </Space>
    </AnalysisContainer>
  );
};

export default DataAnalysis; 