import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  line-height: 1;
  background: ${({ theme }) => theme.colors.primary};
`;

const LoginCard = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 24rem;
  width: 90%;
`;

const Logo = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Welcome = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.6;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <FaGlobe />
        </Logo>
        <Title>Country AI</Title>
        <Welcome>Welcome!</Welcome>
        <Description>
          Explore countries around the world with AI-powered insights and
          analysis.
        </Description>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            setError("");
            login(credentialResponse);
            navigate("/");
          }}
          onError={() => {
            setError("Login failed. Please try again.");
          }}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginCard>
    </LoginContainer>
  );
};
