import React, { useContext } from "react";
import { Box, Heading, Button, Stack } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const Admin: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Om");
  };

  return (
    <Box p={{ base: 4, md: 8 }} maxW="800px" mx="auto" bg="background">
      <Heading mb={6} color="textColor">
        Adminpanel
      </Heading>
      <Stack
        spacing={4}
        bg="secondary"
        p={{ base: 4, md: 6 }}
        borderRadius="md"
        boxShadow="sm"
      >
        <Button as={RouterLink} to="/OpenSesame/admin/news" variant="solid">
          Hantera nyheter
        </Button>
        <Button as={RouterLink} to="/OpenSesame/admin/horses" variant="solid">
          Hantera hästar i stallet
        </Button>
        <Button
          as={RouterLink}
          to="/OpenSesame/change-password"
          variant="solid"
        >
          Ändra lösenord
        </Button>
        <Button as={RouterLink} to="/OpenSesame/admin/add-user" variant="solid">
          Lägg till användare
        </Button>
        <Button
          onClick={handleLogout}
          bg="#9B2C2C"
          color="menyText"
          _hover={{ bg: "#7D2323", color: "menyText" }}
        >
          Logga ut
        </Button>
      </Stack>
    </Box>
  );
};

export default Admin;
