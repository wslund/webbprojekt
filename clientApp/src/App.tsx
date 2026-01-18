// src/App.tsx
import React from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { HomePage } from "./Components/HomePage";
import { AboutPage } from "./Components/AboutPage";
import { HorsesPage } from "./Components/HorsesPage";
import { ContactPage } from "./Components/ContactPage";
import { NewsDetailPage } from "./Components/NewsDetailPage";

const App: React.FC = () => {
  return (
    <Box bg="white" minH="100vh">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/om-oss" element={<AboutPage />} />
        <Route path="/hastar" element={<HorsesPage />} />
        <Route path="/kontakt" element={<ContactPage />} />

        {/* Nyhetsdetalj */}
        <Route path="/nyheter/:id" element={<NewsDetailPage />} />
      </Routes>
    </Box>
  );
};

export default App;
