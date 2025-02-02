import styled from 'styled-components';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const LoginCard = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.lg} 5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadow};
  text-align: center;
`;

const Welcome = styled.p`
    margin-bottom: -0.5rem;
    `;

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <LoginContainer>
      <LoginCard>
        <Welcome>Welcome to</Welcome>
        <h1>Country AI</h1>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            login(credentialResponse);
            navigate('/');
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </LoginCard>
    </LoginContainer>
  );
};