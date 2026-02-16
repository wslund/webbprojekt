import React, { useState } from "react";
import {
  Box, Button, Container, FormControl, FormLabel, Heading, Input,
  Text, useToast, VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { api } from "../api";

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.login(username, password);
      login(res.token, res.user);
      navigate("/admin");
    } catch (err: any) {
      toast({ title: "Inloggning misslyckades", description: err.message, status: "error", duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="brand.bg" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="400px">
        <Box bg="white" border="1px solid" borderColor="gray.200" borderRadius="2xl" p={10}>
          <Heading fontWeight={400} fontSize="2xl" mb={2} textAlign="center">Admin</Heading>
          <Text fontSize="sm" color="brand.muted" mb={8} textAlign="center">
            Logga in för att hantera innehåll
          </Text>

          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl isRequired>
                <FormLabel fontSize="xs" fontWeight={600} letterSpacing="0.12em" textTransform="uppercase" color="brand.muted">
                  Användarnamn
                </FormLabel>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin"
                  bg="brand.bg" border="1.5px solid" borderColor="gray.200" borderRadius="lg" fontSize="sm"
                  _focus={{ borderColor: "brand.olive", boxShadow: "0 0 0 3px rgba(61,74,46,0.08)" }} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize="xs" fontWeight={600} letterSpacing="0.12em" textTransform="uppercase" color="brand.muted">
                  Lösenord
                </FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  bg="brand.bg" border="1.5px solid" borderColor="gray.200" borderRadius="lg" fontSize="sm"
                  _focus={{ borderColor: "brand.olive", boxShadow: "0 0 0 3px rgba(61,74,46,0.08)" }} />
              </FormControl>

              <Button type="submit" variant="brandDark" w="100%" isLoading={loading} loadingText="Loggar in...">
                Logga in
              </Button>
            </VStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
