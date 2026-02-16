<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
// src/components/Navbar.tsx
import React from "react";
>>>>>>> 4cb1f7897da9269ffd330b607274bcd2f83dec90
import {
  Box,
  Container,
  Flex,
  HStack,
<<<<<<< HEAD
  IconButton,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const navItems = [
  { to: "/", label: "Hem" },
  { to: "/om-oss", label: "Om oss" },
  { to: "/hastar", label: "Hästar" },
  { to: "/nyheter", label: "Nyheter" },
  { to: "/kontakt", label: "Kontakt" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const linkColor = scrolled ? "brand.text" : "white";
  const logoColor = scrolled ? "brand.dark" : "white";

  return (
    <>
      {/* ── Navbar ── */}
      <Box
        as="nav"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        py={5}
        transition="all 0.5s cubic-bezier(0.16,1,0.3,1)"
        bg={scrolled ? "rgba(250,249,246,0.92)" : "transparent"}
        backdropFilter={scrolled ? "blur(20px)" : "none"}
        boxShadow={scrolled ? "0 1px 0 rgba(0,0,0,0.06)" : "none"}
      >
        <Container maxW="6xl">
          <Flex align="center" justify="space-between">
            {/* Logo */}
            <ChakraLink
              as={RouterLink}
              to="/"
              fontFamily="heading"
              fontSize="xl"
              fontWeight={500}
              letterSpacing="0.04em"
              color={logoColor}
              transition="color 0.5s"
              _hover={{ textDecoration: "none" }}
              zIndex={200}
            >
              Stall Backen
            </ChakraLink>

            {/* Desktop links */}
            <HStack
              spacing={10}
              display={{ base: "none", md: "flex" }}
              position="absolute"
              left="50%"
              transform="translateX(-50%)"
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <ChakraLink
                    key={item.to}
                    as={RouterLink}
                    to={item.to}
                    fontSize="0.8rem"
                    fontWeight={500}
                    letterSpacing="0.14em"
                    textTransform="uppercase"
                    color={linkColor}
                    opacity={isActive ? 1 : 0.8}
                    borderBottom="2px solid"
                    borderColor={isActive ? "currentColor" : "transparent"}
                    pb="2px"
                    transition="all 0.5s"
                    textShadow={scrolled ? "none" : "0 1px 10px rgba(0,0,0,0.35)"}
                    _hover={{ opacity: 1, textDecoration: "none", borderColor: "currentColor" }}
                  >
                    {item.label}
                  </ChakraLink>
                );
              })}
            </HStack>

            {/* Right side */}
            <HStack spacing={2}>
              <ChakraLink
                href="https://www.instagram.com/"
                isExternal
                color={menuOpen ? "white" : linkColor}
                fontSize="xl"
                transition="color 0.5s"
                _hover={{ opacity: 0.7 }}
                zIndex={200}
              >
                <FaInstagram />
              </ChakraLink>

              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Meny"
                icon={menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                variant="ghost"
                color={menuOpen ? "white" : linkColor}
                fontSize="2xl"
                zIndex={200}
                onClick={() => setMenuOpen(!menuOpen)}
                _hover={{ bg: "transparent" }}
              />
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* ── Mobile fullscreen overlay ── */}
      <Box
        position="fixed"
        inset={0}
        bg="brand.dark"
        zIndex={150}
        display="flex"
        alignItems="center"
        justifyContent="center"
        opacity={menuOpen ? 1 : 0}
        pointerEvents={menuOpen ? "all" : "none"}
        transition="opacity 0.5s cubic-bezier(0.16,1,0.3,1)"
      >
        <VStack spacing={3}>
          {navItems.map((item, i) => (
            <ChakraLink
              key={item.to}
              as={RouterLink}
              to={item.to}
              fontFamily="heading"
              fontSize={{ base: "3xl", md: "4xl" }}
              color="white"
              opacity={menuOpen ? 1 : 0}
              transform={menuOpen ? "translateY(0)" : "translateY(20px)"}
              transition={`all 0.5s cubic-bezier(0.16,1,0.3,1) ${menuOpen ? 0.1 + i * 0.05 : 0}s`}
              _hover={{ textDecoration: "none", color: "brand.warm" }}
            >
              {item.label}
            </ChakraLink>
          ))}
        </VStack>
      </Box>
    </>
=======
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
>>>>>>> 4cb1f7897da9269ffd330b607274bcd2f83dec90
  );
};
