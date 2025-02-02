// src/components/Navbar.tsx
import styled from 'styled-components';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Nav = styled.nav`
  background: white;
  padding: ${({ theme }) => theme.spacing.md} 2rem;
  box-shadow: ${({ theme }) => theme.shadow};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const UserSection = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const Dropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadow};
  padding: ${({ theme }) => theme.spacing.sm};
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  min-width: 150px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  border-radius: ${({ theme }) => theme.borderRadius};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <Title>Country AI</Title>
      <UserSection>
        <UserButton onClick={() => setIsOpen(!isOpen)}>
          <UserImage src={user?.picture} alt={user?.name} />
          <span>{user?.name}</span>
        </UserButton>
        <Dropdown $isOpen={isOpen}>
          <DropdownButton onClick={logout}>Log out</DropdownButton>
        </Dropdown>
      </UserSection>
    </Nav>
  );
};