import { ThemeProvider } from "styled-components";
import { HomePage } from "./pages/HomePage";
import { GlobalStyle } from "./styles/global";
import { theme } from "./styles/theme";
import { ChatProvider } from "./context/ChatContext";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ChatProvider>
      <GlobalStyle />
      <HomePage />
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;
