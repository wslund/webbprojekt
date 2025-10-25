import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Stack, Heading, Text } from "@chakra-ui/react";
import { AuthContext } from "../../AuthContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  // test

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/PHP_Backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error(`HTTP-fel: ${response.status}`);
      }
      const data = await response.json();
      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        login(data.token);

        navigate("/OpenSesame/admin");
      } else {
        setError(data.message || "Inloggning misslyckades");
      }
    } catch (err) {
      const error = err as Error;
      console.error("Fel vid inloggning:", error.message);
      setError("Något gick fel: " + error.message);
    }
  };

  return (
    <Box p={{ base: 4, md: 8 }} maxW="400px" mx="auto" bg="background">
      <Heading mb={6} color="textColor">
        Logga in
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={4}
          bg="secondary"
          p={{ base: 4, md: 6 }}
          borderRadius="md"
          boxShadow="sm"
        >
          <Input
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            bg="background"
            borderColor="primary"
            color="textColor"
            _hover={{ borderColor: "secondary" }}
            _focus={{ borderColor: "primary", boxShadow: "0 0 0 1px #2E4A2E" }}
          />
          <Input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg="background"
            borderColor="primary"
            color="textColor"
            _hover={{ borderColor: "secondary" }}
            _focus={{ borderColor: "primary", boxShadow: "0 0 0 1px #2E4A2E" }}
          />
          <Button type="submit" variant="solid">
            Logga in
          </Button>
          {error && <Text color="#9B2C2C">{error}</Text>}
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
