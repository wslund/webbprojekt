import React, { useState, useContext } from "react";
import { Box, Button, Input, Stack, Heading, Text } from "@chakra-ui/react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

const ChangePassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("Du måste vara inloggad för att ändra lösenord.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Lösenorden matchar inte.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Lösenordet måste vara minst 8 tecken.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/php_backend/change_password.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            new_password: newPassword,
            confirm_password: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        setTimeout(() => {
          logout();
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Misslyckades med att ändra lösenord.");
      }
    } catch (err) {
      const error = err as Error;
      console.error("Fel vid lösenordsändring:", error.message);
      setError("Något gick fel: " + error.message);
    }
  };

  return (
    <Box p={{ base: 4, md: 8 }} maxW="400px" mx="auto" bg="background">
      <Heading mb={6} color="textColor">
        Ändra lösenord
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
            type="password"
            placeholder="Nytt lösenord"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            bg="background"
            borderColor="primary"
            color="textColor"
            _hover={{ borderColor: "secondary" }}
            _focus={{ borderColor: "primary", boxShadow: "0 0 0 1px #2E4A2E" }}
          />
          <Input
            type="password"
            placeholder="Bekräfta nytt lösenord"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            bg="background"
            borderColor="primary"
            color="textColor"
            _hover={{ borderColor: "secondary" }}
            _focus={{ borderColor: "primary", boxShadow: "0 0 0 1px #2E4A2E" }}
          />
          <Button type="submit" variant="solid">
            Ändra lösenord
          </Button>
          {error && <Text color="red.500">{error}</Text>}
          {success && <Text color="green.500">{success}</Text>}
        </Stack>
      </form>
    </Box>
  );
};

export default ChangePassword;
