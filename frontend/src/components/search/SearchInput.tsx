import React from 'react';
import { Input, Select, Space } from 'antd';
import styled from 'styled-components';

const { Search } = Input;
const { Option } = Select;

const SearchContainer = styled.div`
  margin-bottom: 16px;
`;

interface SearchInputProps {
  onSearch: (keyword: string, type: string) => void;
  loading?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, loading }) => {
  const [searchType, setSearchType] = React.useState('title');

  const handleSearch = (value: string) => {
    onSearch(value, searchType);
  };

  return (
    <SearchContainer>
      <Space.Compact style={{ width: '100%' }}>
        <Select 
          defaultValue="title" 
          style={{ width: 120 }}
          onChange={setSearchType}
        >
          <Option value="title">标题</Option>
          <Option value="content">内容</Option>
          <Option value="author">作者</Option>
        </Select>
        <Search
          placeholder="请输入搜索关键词"
          allowClear
          enterButton="搜索"
          size="large"
          loading={loading}
          onSearch={handleSearch}
        />
      </Space.Compact>
    </SearchContainer>
  );
};

export default SearchInput; 