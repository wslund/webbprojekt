import React from "react";
import {
  Box, Button, Flex, Heading, HStack, Link as ChakraLink, Text, VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { FiHome, FiLogOut } from "react-icons/fi";

const navItems = [
  { to: "/admin", label: "Översikt", exact: true },
  { to: "/admin/hastar", label: "Hästar" },
  { to: "/admin/nyheter", label: "Nyheter" },
  { to: "/admin/meddelanden", label: "Meddelanden" },
];

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box
        w={{ base: "full", md: "250px" }}
        bg="brand.dark"
        color="white"
        p={6}
        display={{ base: "none", md: "flex" }}
        flexDirection="column"
        position="fixed"
        top={0}
        left={0}
        bottom={0}
      >
        <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: "none" }} mb={2}>
          <Heading fontWeight={400} fontSize="lg" mb={1}>Stall Backen</Heading>
        </ChakraLink>
        <Text fontSize="xs" color="whiteAlpha.500" mb={10}>Administration</Text>

        <VStack align="stretch" spacing={1} flex={1}>
          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            return (
              <ChakraLink
                key={item.to}
                as={RouterLink}
                to={item.to}
                px={4}
                py={2.5}
                borderRadius="lg"
                fontSize="sm"
                fontWeight={500}
                bg={isActive ? "whiteAlpha.100" : "transparent"}
                color={isActive ? "white" : "whiteAlpha.600"}
                _hover={{ bg: "whiteAlpha.100", color: "white", textDecoration: "none" }}
                transition="all 0.2s"
              >
                {item.label}
              </ChakraLink>
            );
          })}
        </VStack>

        <Box borderTop="1px solid" borderColor="whiteAlpha.100" pt={4} mt={4}>
          <Text fontSize="xs" color="whiteAlpha.500" mb={2}>Inloggad som {user?.name}</Text>
          <HStack spacing={3}>
            <Button as={RouterLink} to="/" size="xs" variant="ghost" color="whiteAlpha.600"
              _hover={{ color: "white" }} leftIcon={<FiHome />}>
              Hemsida
            </Button>
            <Button size="xs" variant="ghost" color="whiteAlpha.600" _hover={{ color: "white" }}
              leftIcon={<FiLogOut />} onClick={handleLogout}>
              Logga ut
            </Button>
          </HStack>
        </Box>
      </Box>

      {/* Mobile header */}
      <Box
        display={{ base: "flex", md: "none" }}
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg="brand.dark"
        color="white"
        px={4}
        py={3}
        zIndex={50}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack spacing={4} overflowX="auto" flex={1}>
          {navItems.map((item) => {
            const isActive = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
            return (
              <ChakraLink key={item.to} as={RouterLink} to={item.to} fontSize="xs" fontWeight={500}
                color={isActive ? "white" : "whiteAlpha.600"} whiteSpace="nowrap"
                _hover={{ textDecoration: "none", color: "white" }}>
                {item.label}
              </ChakraLink>
            );
          })}
        </HStack>
        <Button size="xs" variant="ghost" color="whiteAlpha.600" onClick={handleLogout}>Logga ut</Button>
      </Box>

      {/* Content */}
      <Box ml={{ base: 0, md: "250px" }} w="full" pt={{ base: "60px", md: 0 }} bg="brand.bg" minH="100vh">
        <Box p={{ base: 4, md: 8 }} maxW="1100px">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};
