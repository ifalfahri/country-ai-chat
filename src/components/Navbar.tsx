import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  onSearch: (term: string) => void;
}

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

  @media (max-width: 768px) {
    display: none;
  }
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
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
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

const Logout = styled.p`
  color: ${({ theme }) => theme.colors.error};
`;

const SearchContainer = styled.div`
  margin: 0 auto;
  width: 300px;

  @media (max-width: 768px) {
    width: 250px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const SearchInput = styled.input`
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    &:last-child {
      flex: 1;
      justify-content: flex-end;
    }
  }
`;

export const Navbar = ({ onSearch }: NavbarProps) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <Wrapper>
        <FaGlobe size={24} color="83B2E2" />
        <Title>Country AI</Title>
      </Wrapper>
      <Wrapper>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </SearchContainer>
        <UserSection>
          <UserButton onClick={() => setIsOpen(!isOpen)}>
            <UserImage src={user?.picture} alt={user?.name} />
          </UserButton>
          <Dropdown $isOpen={isOpen}>
            <DropdownButton>{user?.name}</DropdownButton>
            <DropdownButton onClick={logout}>
              <Logout>Log out</Logout>
            </DropdownButton>
          </Dropdown>
        </UserSection>
      </Wrapper>
    </Nav>
  );
};
