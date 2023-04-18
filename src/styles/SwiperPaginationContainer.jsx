import React, { Children } from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  bottom: 50px;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

export default function SwiperPaginationContainer({
  children,
  className,
  justifyContent,
  alignItems,
}) {
  return (
    <PaginationContainer
      className={className}
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      {children}
    </PaginationContainer>
  );
}

SwiperPaginationContainer.defaultProps = {
  justifyContent: 'center',
  alignItems: 'center',
};
