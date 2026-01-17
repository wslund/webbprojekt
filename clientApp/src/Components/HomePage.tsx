// src/pages/HomePage.tsx
import React from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { HeroCarousel } from "../Components/HeroCarousel";

export const HomePage = () => {
  return (
    <Box bg="white">
      <HeroCarousel />
      <Box py={16} bg="white">
        <Container maxW="6xl">
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl" }}
            mb={4}
            fontWeight="500"
          >
            Välkommen till Stall Exempelgården
          </Heading>
          <Text fontSize="md" color="gray.700">
            Vi är ett stall som kombinerar uppfödning, travsport och en stark
            tro på att hästar mår bäst när de får vara just hästar. På gården
            arbetar vi långsiktigt – från föl till färdig tävlingshäst – med
            fokus på hållbarhet, temperament och prestation.
          </Text>
        </Container>
      </Box>
    </Box>
  );
};
