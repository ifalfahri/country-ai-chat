import styled, { keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  font-size: 2rem;
  color: white;

  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;

export const Loading = () => (
  <LoadingContainer>
    <FaSpinner />
  </LoadingContainer>
);