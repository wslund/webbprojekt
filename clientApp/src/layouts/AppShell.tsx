import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const AppShell: React.FC = () => {
  return (
    <Box bg="white" minH="100vh">
      <Navbar />
      <Outlet />
    </Box>
  );
};
