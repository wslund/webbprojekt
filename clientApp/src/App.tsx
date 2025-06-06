import React from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./AuthContext";
import MainNavbar from "./Components/Meny/MainNavBar";
import getRoutingObject from "./Components/RoutingObject";
import Footer from "./Components/Meny/Footer";
import theme from "./Components/Theme/Theme";

const App = () => {
  const routes = getRoutingObject();

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = React.useContext(AuthContext);
    return isAuthenticated ? (
      children
    ) : (
      <Navigate to="/OpenSesame/login" replace />
    );
  };

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Box
            bg="background"
            minHeight="100vh"
            display="flex"
            flexDirection="column"
          >
            <MainNavbar routes={routes} />
            <Box paddingTop="10px">
              <Routes>
                <Route path="/" element={<Navigate to="/Om" replace />} />
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      route.protected ? (
                        <ProtectedRoute>{route.element}</ProtectedRoute>
                      ) : (
                        route.element
                      )
                    }
                  />
                ))}
              </Routes>
              <Footer mt="auto" />
            </Box>
          </Box>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
