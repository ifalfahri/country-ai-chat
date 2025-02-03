import styled from 'styled-components';
import logo from '/CountryAI.png';

const LogoImage = styled.img`
  height: 40px;
  margin-left: -10px;
  margin-bottom: -4px;
`;

export const Logo = () => {
  return <LogoImage src={logo} alt="CountryAI Logo" />;
};
