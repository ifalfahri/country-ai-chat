import styled from 'styled-components';
import { CountryDetailsModalProps } from '../types';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 2rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

const DetailSection = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: #f8fafc;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Flag = styled.h1`
    font-size: 4rem;
    text-align: center;
`;

const Name = styled.h2`
    text-align: center;
`
const Label = styled.span`
  font-weight: 500;
`

export const CountryDetailsModal = ({ country, onClose }: CountryDetailsModalProps) => (
  <ModalOverlay onClick={onClose}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
        <Flag>{country.emoji}</Flag>
      <Name>{country.name}</Name>
      
      <DetailSection>
        <h3>Basic Info</h3>
        <p><Label>Capital: </Label>{country.capital || 'N/A'}</p>
        <p><Label>Currency: </Label>{country.currency || 'N/A'}</p>
        <p><Label>Continent: </Label>{country.continent?.name}</p>
      </DetailSection>

      <DetailSection>
        <h3>Languages</h3>
        <ul>
          {country.languages?.map((lang) => (
            <p key={lang.code}>{lang.name}</p>
          )) || 'No languages available'}
        </ul>
      </DetailSection>

      <DetailSection>
        <h3>Additional Info</h3>
        <p><Label>Country Code: </Label>{country.code}</p>
        <p><Label>Phone Code: </Label>+{country.phone}</p>
      </DetailSection>
    </ModalContent>
  </ModalOverlay>
);