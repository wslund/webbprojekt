import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ChakraProvider } from "@chakra-ui/react";

import { StyledEngineProvider } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const muiTheme = createTheme({
  cssVariables: true,

  colorSchemes: { light: true },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </ChakraProvider>
  </React.StrictMode>
);
