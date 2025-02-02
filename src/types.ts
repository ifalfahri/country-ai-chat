export interface Country {
  code: string;
  name: string;
  emoji: string;
  capital?: string;
  currencies?: [string];
  phone?: string;
  continent: {
    code: string;
    name: string;
  };
  languages: {
    code: string;
    name: string;
  }[];
}

export interface CountryListProps {
  onSelect: (country: Country) => void;
  searchTerm: string;
}

export interface CountryCardProps {
  country: Country;
  onClick: (country: Country) => void;
}

export interface CountryDetailsModalProps {
  country: Country;
  onClose: () => void;
}
