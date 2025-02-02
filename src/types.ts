import { CredentialResponse } from "@react-oauth/google";

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

export interface GoogleJwtPayload {
  name?: string;
  email?: string;
  picture?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: GoogleUser | null;
  login: (credentialResponse: CredentialResponse) => void;
  logout: () => void;
}

export interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

export interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
};

export interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

export interface NavbarProps {
  onSearch: (term: string) => void;
}