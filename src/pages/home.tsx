import { useState } from 'react';
import styled from 'styled-components';
import { CountryList } from '../components/CountryList';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  flex: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const HomePage = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <Container>
      <CountryList onSelect={setSelectedCountry} />
    </Container>
  );
};