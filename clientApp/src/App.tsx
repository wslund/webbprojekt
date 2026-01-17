// src/App.tsx
import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { HomePage } from "./Components/HomePage";
import { AboutPage } from "./Components/AboutPage";
import { HorsesPage } from "./Components/HorsesPage";
import { ContactPage } from "./Components/ContactPage";



const App: React.FC = () => {
  return (
    <Box bg="white" minH="100vh">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/om-oss" element={<AboutPage />} />
        <Route path="/hastar" element={<HorsesPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
      </Routes>
    </Box>
  );
};

export default App;
