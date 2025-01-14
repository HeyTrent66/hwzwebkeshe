import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

const { Footer: AntFooter } = Layout;

const StyledFooter = styled(AntFooter)`
  text-align: center;
  background: #f0f2f5;
`;

const Footer: React.FC = () => {
  return (
    <StyledFooter>
      大学校园论坛系统 ©{new Date().getFullYear()}
    </StyledFooter>
  );
};

export default Footer; 