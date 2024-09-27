import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import MainNavbar from "./Components/Meny/HeaderNavbar";
import PaginationNavbar from "./Components/Meny/PaginationNavbar";

const App = () => {
  return (
    <ChakraProvider>
      <MainNavbar />
      <PaginationNavbar />
      {/* Här kan du lägga till mer innehåll */}
    </ChakraProvider>
  );
};

export default App;
