import styled, { keyframes } from "styled-components";

const dotAnimation = keyframes`
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
  display: inline-block;
  animation: ${dotAnimation} 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
  &:nth-child(3) {
    animation-delay: 0s;
  }
`;

export const LoadingDots = () => (
  <DotsContainer>
    <Dot />
    <Dot />
    <Dot />
  </DotsContainer>
);
