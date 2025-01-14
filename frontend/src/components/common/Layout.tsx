import React from 'react';
import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';
import Header from './Header';

const { Content } = AntLayout;

const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  padding: 24px;
  margin: 24px;
  background: #fff;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <Header />
      <StyledContent>{children}</StyledContent>
    </StyledLayout>
  );
};

export default Layout; 