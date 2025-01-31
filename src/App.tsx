import { ThemeProvider } from "styled-components";
import { HomePage } from "./pages/HomePage";
import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
