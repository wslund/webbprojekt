import React, { useState, useContext } from "react";
import { Box, Button, Input, Stack, Heading, Text } from "@chakra-ui/react";
import { AuthContext } from "../../AuthContext";

const AddUser: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Du måste vara inloggad för att lägga till en användare.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }

    if (password.length < 8) {
      setError("Lösenordet måste vara minst 8 tecken.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/php_backend/add_user.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message || "Misslyckades med att lägga till användare.");
      }
    } catch (err) {
      const error = err as Error;
      console.error("Fel vid användarskapande:", error.message);
      setError("Något gick fel: " + error.message);
    }
  };

  return (
    <Box p={{ base: 4, md: 8 }} maxW="400px" mx="auto" bg="background">
      <Heading mb={6} color="textColor">
        Lägg till användare
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
          <Input
            type="password"
            placeholder="Bekräfta lösenord"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            bg="background"
            borderColor="primary"
            color="textColor"
            _hover={{ borderColor: "secondary" }}
            _focus={{ borderColor: "primary", boxShadow: "0 0 0 1px #2E4A2E" }}
          />
          <Button type="submit" variant="solid">
            Skapa användare
          </Button>
          {error && <Text color="red.500">{error}</Text>}
          {success && <Text color="green.500">{success}</Text>}
        </Stack>
      </form>
    </Box>
  );
};

export default AddUser;
