import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../graphql/queries';
import { CountryCard } from './CountryCard';
import { Country } from '../types';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
`;

export const CountryList = ({ onSelect }: any) => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Grid>
      {data.countries.map((country: Country) => (
        <CountryCard 
          key={country.code} 
          country={country}
          onClick={() => onSelect(country)}
        />
      ))}
    </Grid>
  );
};