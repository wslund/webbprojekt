import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
<<<<<<< HEAD
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./admin/AuthContext";
import App from "./App";
import theme from "./theme";
import "./styles/global.css";
=======
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { theme } from "./theme";
import { AuthProvider } from "./providers/AuthProvider";
>>>>>>> 4cb1f7897da9269ffd330b607274bcd2f83dec90

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
<<<<<<< HEAD
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
=======
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
>>>>>>> 4cb1f7897da9269ffd330b607274bcd2f83dec90
    </ChakraProvider>
  </React.StrictMode>
);
