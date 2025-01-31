export interface Country {
  code: string;
  name: string;
  emoji: string;
  capital?: string;
  currency?: string;
  continent: {
    code: string;
    name: string;
  };
  languages: {
    code: string;
    name: string;
  }[];
}
