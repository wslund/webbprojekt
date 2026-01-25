import React from "react";
import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "../providers/AuthProvider";

export const AdminPage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Box bg="white" py={{ base: 10, md: 16 }}>
      <Container maxW="6xl">
        <Stack spacing={4}>
          <Heading size="lg">Admin</Heading>
          <Text color="gray.600">
            Här bygger vi redigeringsläget (t.ex. skapa/uppdatera nyheter).
          </Text>

          <Button onClick={logout} width="fit-content" bg="gray.900" color="white" _hover={{ opacity: 0.9 }}>
            Logga ut
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
