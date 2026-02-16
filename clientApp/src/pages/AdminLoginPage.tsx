import React, { useState } from "react";
import { Box, Button, Container, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { paths } from "../routes/paths";

export const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const nav = useNavigate();
  const location = useLocation() as any;

  const from = location?.state?.from || paths.admin;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(password);
    if (ok) nav(from, { replace: true });
  };

  return (
    <Box bg="white" py={{ base: 10, md: 16 }}>
      <Container maxW="md">
        <Heading size="lg" mb={2}>
          Admin login
        </Heading>
        <Text color="gray.600" mb={6}>
          Logga in för att komma åt adminpanelen.
        </Text>

        <Box as="form" onSubmit={onSubmit}>
          <Stack spacing={4}>
            <Input
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="white"
            />

            {error && (
              <Text color="red.500" fontSize="sm">
                {error}
              </Text>
            )}

            <Button type="submit" bg="#00887C" color="white" _hover={{ opacity: 0.9 }} isLoading={loading}>
              Logga in
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
