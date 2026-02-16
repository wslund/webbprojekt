import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Box, Container, Spinner, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "../providers/AuthProvider";
import { paths } from "./paths";

export const ProtectedRoute: React.FC = () => {
  const { authed, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box bg="white" py={{ base: 10, md: 16 }}>
        <Container maxW="6xl">
          <Stack align="center" py={20}>
            <Spinner size="lg" />
            <Text color="gray.600">Kontrollerar behörighet...</Text>
          </Stack>
        </Container>
      </Box>
    );
  }

  if (!authed) {
    return <Navigate to={paths.adminLogin} replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};
