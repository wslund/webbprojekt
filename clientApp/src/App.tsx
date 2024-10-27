import React from "react"; // Importera React
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainNavbar from "./Components/Meny/HeaderNavbar";
import PaginationNavbar from "./Components/Meny/PaginationNavbar";
import RoutingObject from "./Components/RoutingObject";
import Footer from "./Components/Meny/Footer";
import theme from "./Components/Theme/Theme";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <MainNavbar />
        <PaginationNavbar />
        <Routes>
          <Route path="/" element={<Navigate to="/Om" />} />
          {RoutingObject.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
};

export default App;
