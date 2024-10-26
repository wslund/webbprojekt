import React from "react"; // Importera React
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importera Router och Routes
import MainNavbar from "./Components/Meny/HeaderNavbar";
import PaginationNavbar from "./Components/Meny/PaginationNavbar";
import RoutingObject from "./Components/RoutingObject";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        {" "}
        {/* Omge komponenter med Router */}
        <MainNavbar />
        <PaginationNavbar />
        {/* Hantera routing */}
        <Routes>
          {RoutingObject.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
