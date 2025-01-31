import styled from 'styled-components';

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

export const CountryCard = ({ country, onClick }: any) => (
  <Card onClick={onClick}>
    <Details>
      <Flag>{country.emoji}</Flag>
      <div>
        <h3>{country.name}</h3>
        <p>Capital: {country.capital || 'N/A'}</p>
        <p>Currency: {country.currency || 'N/A'}</p>
      </div>
    </Details>
  </Card>
);