import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Twemoji Country Flags', 'Poppins', serif;
  }

  body {
    background: #83B2E2;
    color: #1a1a1a;
    line-height: 1.6;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
`;
