import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from './graphql/queries';

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h1>Countries</h1>
      <div className="country-grid">
        {data.countries.map((country: any) => (
          <div key={country.code} className="country-card">
            <span>{country.emoji}</span>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Currency: {country.currency}</p>
            <p>Continent: {country.continent.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;