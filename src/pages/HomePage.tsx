import { useState } from 'react';
import styled from 'styled-components';
import { CountryList } from '../components/CountryList';
import { CountryDetailsModal } from '../components/CountryDetailsModal';
import { Country } from '../types';
import { ChatInterface } from '../components/ChatInterface';
import { Navbar } from '../components/Navbar';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
`;

export const HomePage = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <PageWrapper>
      <Navbar onSearch={setSearchTerm} />
    <Container>
    <CountryList 
        onSelect={(country: Country) => setSelectedCountry(country)}
        searchTerm={searchTerm}
      />
      <ChatInterface />
      {selectedCountry && (
        <CountryDetailsModal 
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </Container>
    </PageWrapper>
  );
};