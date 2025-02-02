import { gql } from "@apollo/client";

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
      capital
      currencies
      phone
      languages {
        code
        name
      }
      continent {
        code
        name
      }
    }
  }
`;
