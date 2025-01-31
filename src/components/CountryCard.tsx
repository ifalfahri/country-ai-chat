import styled from 'styled-components';
import { CountryCardProps } from '../types';

const Card = styled.article`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Flag = styled.span`
  font-size: 2rem;
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.span`
  font-weight: 500;
`

export const CountryCard = ({ country, onClick }: CountryCardProps) => (
  <Card onClick={() => onClick(country)}>
    <Details>
      <Flag>{country.emoji}</Flag>
      <div>
        <h3>{country.name}</h3>
        <p><Label>Capital: </Label>{country.capital || 'N/A'}</p>
        <p><Label>Currency: </Label>{country.currency || 'N/A'}</p>
      </div>
    </Details>
  </Card>
);