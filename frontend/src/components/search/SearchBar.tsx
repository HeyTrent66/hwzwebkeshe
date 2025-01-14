import React, { useState } from 'react';
import { Input, Select, Button, Space, Card, List, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Search } = Input;
const { Option } = Select;

const SearchContainer = styled.div`
  margin-bottom: 24px;
`;

const FilterBar = styled.div`
  margin-top: 16px;
`;

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
  loading: boolean;
}

interface SearchParams {
  keyword: string;
  type: 'post' | 'user' | 'tag';
  timeRange?: string;
  boardId?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [searchType, setSearchType] = useState<'post' | 'user' | 'tag'>('post');
  const [timeRange, setTimeRange] = useState<string>('all');

  const handleSearch = (value: string) => {
    onSearch({
      keyword: value,
      type: searchType,
      timeRange,
    });
  };

  return (
    <SearchContainer>
      <Space.Compact style={{ width: '100%' }}>
        <Select 
          value={searchType} 
          onChange={setSearchType}
          style={{ width: 100 }}
        >
          <Option value="post">帖子</Option>
          <Option value="user">用户</Option>
          <Option value="tag">标签</Option>
        </Select>
        <Search
          placeholder="输入关键词搜索..."
          enterButton={<SearchOutlined />}
          size="large"
          loading={loading}
          onSearch={handleSearch}
        />
      </Space.Compact>
      
      <FilterBar>
        <Space wrap>
          <span>时间范围：</span>
          <Select value={timeRange} onChange={setTimeRange}>
            <Option value="all">全部</Option>
            <Option value="day">24小时内</Option>
            <Option value="week">一周内</Option>
            <Option value="month">一个月内</Option>
          </Select>
        </Space>
      </FilterBar>
    </SearchContainer>
  );
};

export default SearchBar; 