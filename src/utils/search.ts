import { Country } from "../types";

export const Search = (country: Country, searchTerm: string): boolean => {
  const normalizedSearch = searchTerm.toLowerCase().trim();

  if (!normalizedSearch) return true;

  return (
    country.name.toLowerCase().includes(normalizedSearch) ||
    country.capital?.toLowerCase().includes(normalizedSearch) ||
    country.continent.name.toLowerCase().includes(normalizedSearch) ||
    country.code.toLowerCase().includes(normalizedSearch) ||
    country.languages.some((lang) =>
      lang.name.toLowerCase().includes(normalizedSearch)
    )
  );
};
