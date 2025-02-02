import styled from "styled-components";
import { CountryCardProps } from "../types";

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

  @media (max-width: 768px) {
    margin: 0;
    text-align: center;
    display: block;
  }
`;

const InfoContainer = styled.div`
  word-wrap: break-word;
  p {
    font-size: 0.9rem;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    width: 100%;
    h3 {
      font-size: 0.9rem;
      margin-bottom: ${({ theme }) => theme.spacing.sm};
    }
    p {
      font-size: 0.8rem;
    }
  }
`;

const CountryName = styled.p`
  font-weight: 700;
`;

const Details = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const Label = styled.span`
  font-weight: 500;
`;

export const CountryCard = ({ country, onClick }: CountryCardProps) => {
  const formatCurrencies = (currencies?: string[]) => {
    if (!currencies) return "N/A";
    if (currencies.length <= 2) return currencies.join(", ");
    return `${currencies.slice(0, 2).join(", ")}...`;
  };

  return (
    <Card onClick={() => onClick(country)}>
      <Details>
        <Flag>{country.emoji}</Flag>
        <InfoContainer>
          <CountryName>{country.name}</CountryName>
          <p>
            <Label>Capital: </Label>
            {country.capital || "N/A"}
          </p>
          <p>
            <Label>Currency: </Label>
            {formatCurrencies(country.currencies) || "N/A"}
          </p>
        </InfoContainer>
      </Details>
    </Card>
  );
};
