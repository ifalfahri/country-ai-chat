import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../graphql/queries';
import { CountryCard } from './CountryCard';
import { Country, CountryListProps } from '../types';
import { Loading } from './Loading';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

export const CountryList = ({ onSelect, searchTerm }: CountryListProps) => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <Loading/>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredCountries = data.countries.filter((country: Country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid>
      {filteredCountries.map((country: Country) => (
        <CountryCard 
          key={country.code} 
          country={country}
          onClick={() => onSelect(country)}
        />
      ))}
    </Grid>
  );
};