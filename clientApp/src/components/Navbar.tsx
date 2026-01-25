// src/components/Navbar.tsx
import React from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  Link as ChakraLink,
  IconButton,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

type NavItemProps = {
  to: string;
  label: string;
};

const NavItem: React.FC<NavItemProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <ChakraLink
      as={RouterLink}
      to={to}
      fontSize="sm"
      textTransform="uppercase"
      letterSpacing="0.16em"
      color="white"
      opacity={isActive ? 1 : 0.8}
      borderBottom={isActive ? "2px solid white" : "2px solid transparent"}
      pb="2px"
      _hover={{ opacity: 1, textDecoration: "none" }}
      textShadow="0 1px 10px rgba(0,0,0,0.35)"
    >
      {label}
    </ChakraLink>
  );
};

export const Navbar = () => {
  const instagramUrl = "https://www.instagram.com/dittkonto/";

  return (
    <Box position="fixed" top={0} left={0} right={0} zIndex="modal" bg="transparent">
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-b, blackAlpha.700, transparent)"
        backdropFilter="blur(6px)"
        pointerEvents="none"
      />

      <ChakraLink
        href={instagramUrl}
        isExternal
        aria-label="Instagram"
        position="absolute"
        right={{ base: 3, md: 6 }}
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        opacity={0.95}
        _hover={{ opacity: 1 }}
      >
        <IconButton
          aria-label="Instagram"
          icon={<FaInstagram />}
          variant="ghost"
          color="white"
          fontSize="20px"
          _hover={{ bg: "whiteAlpha.200" }}
          _active={{ bg: "whiteAlpha.300" }}
        />
      </ChakraLink>

      <Container maxW="6xl" position="relative">
        <Flex h="64px" align="center" position="relative">
          <Text
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="0.18em"
            color="white"
            textShadow="0 1px 10px rgba(0,0,0,0.35)"
            whiteSpace="nowrap"
          >
            STALL EXEMPELGÅRDEN
          </Text>

          <HStack
            spacing={8}
            display={{ base: "none", md: "flex" }}
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
          >
            <NavItem to="/" label="Hem" />
            <NavItem to="/om-oss" label="Om oss" />
            <NavItem to="/hastar" label="Hästar i stallet" />
            <NavItem to="/kontakt" label="Kontakt" />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
