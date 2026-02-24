import React from "react";
import { Box, Container, Flex, HStack, Link as ChakraLink, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const Footer: React.FC = () => (
  <Box as="footer" bg="brand.dark" color="whiteAlpha.600" pt={16} pb={8}>
    <Container maxW="6xl">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12} mb={12}>
        {/* Brand */}
        <Box>
          <Text fontFamily="heading" fontSize="xl" color="white" mb={4}>
            Stall Backen
          </Text>
          <Text fontSize="sm" lineHeight={1.7} maxW="320px">
            Familjeägt stall med fokus på hållbar uppfödning och travsport —
            där hästens välmående alltid kommer först.
          </Text>
        </Box>

        {/* Pages */}
        <Box>
          <Text fontSize="0.7rem" fontWeight={600} letterSpacing="0.18em" textTransform="uppercase" color="brand.warm" mb={5}>
            Sidor
          </Text>
          <VStack align="start" spacing={2}>
            {[
              { to: "/", label: "Hem" },
              { to: "/om-oss", label: "Om oss" },
              { to: "/hastar", label: "Hästar" },
              { to: "/nyheter", label: "Nyheter" },
              { to: "/kontakt", label: "Kontakt" },
            ].map((l) => (
              <ChakraLink
                key={l.to}
                as={RouterLink}
                to={l.to}
                fontSize="sm"
                _hover={{ color: "white", textDecoration: "none" }}
                transition="color 0.3s"
              >
                {l.label}
              </ChakraLink>
            ))}
          </VStack>
        </Box>

        {/* Social */}
        <Box>
          <Text fontSize="0.7rem" fontWeight={600} letterSpacing="0.18em" textTransform="uppercase" color="brand.warm" mb={5}>
            Sociala medier
          </Text>
          <VStack align="start" spacing={2}>
            <ChakraLink href="https://www.instagram.com/malma_stallbacken/" isExternal fontSize="sm" _hover={{ color: "white" }} transition="color 0.3s">
              Instagram
            </ChakraLink>
          </VStack>
        </Box>
      </SimpleGrid>

      <Flex
        borderTop="1px solid"
        borderColor="whiteAlpha.100"
        pt={6}
        justify="space-between"
        fontSize="xs"
        direction={{ base: "column", md: "row" }}
        gap={2}
      >
        <Text>&copy; {new Date().getFullYear()} Stall Backen. Alla rättigheter förbehållna.</Text>
        <Text>Designad med omtanke.</Text>
      </Flex>
    </Container>
  </Box>
);
