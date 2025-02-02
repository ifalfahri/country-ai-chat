import { useState } from 'react';
import styled from 'styled-components';
import { CountryList } from '../components/CountryList';
import { CountryDetailsModal } from '../components/CountryDetailsModal';
import { Country } from '../types';
import { ChatInterface } from '../components/ChatInterface';

const Container = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
`;

export const HomePage = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  return (
    <Container>
      <CountryList onSelect={(country: Country) => setSelectedCountry(country)} />
      <ChatInterface />
      {selectedCountry && (
        <CountryDetailsModal 
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </Container>
  );
};