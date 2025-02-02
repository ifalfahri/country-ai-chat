import { useState } from "react";
import styled from "styled-components";
import { ChatInterface } from "../components/ChatInterface";
import { CountryDetailsModal } from "../components/CountryDetailsModal";
import { CountryList } from "../components/CountryList";
import { Navbar } from "../components/Navbar";
import { Country } from "../types";

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
  const [searchTerm, setSearchTerm] = useState("");

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
