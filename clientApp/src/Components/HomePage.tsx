// src/pages/HomePage.tsx
import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HeroCarousel } from "../Components/HeroCarousel";

// Mock tills backend finns
const news = [
  {
    id: "1",
    title: "Nya föl på gården",
    date: "2026-01-10",
    excerpt:
      "Vi har välkomnat årets första föl. Läs mer om stamtavla och hur vi jobbar med de första veckorna.",
  },
  {
    id: "2",
    title: "Träningsuppdatering inför säsongen",
    date: "2025-12-20",
    excerpt:
      "Vi finslipar vinterträningen med fokus på styrka, återhämtning och glädje i arbetet.",
  },
  {
    id: "3",
    title: "Resultat från senaste tävlingen",
    date: "2025-11-30",
    excerpt:
      "Starka prestationer i helgens lopp. Vi sammanfattar dagen och vad som väntar härnäst.",
  },
];

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

          {/* NYHETER – grön box direkt under texten */}
          <Box
            mt={12}
            bg="green.900"
            color="white"
            borderRadius={{ base: "xl", md: "2xl" }}
            px={{ base: 5, md: 10 }}
            py={{ base: 6, md: 10 }}
          >
            <HStack
              justify="space-between"
              align="flex-end"
              mb={{ base: 6, md: 8 }}
            >
              <Box>
                <Heading
                  as="h3"
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="500"
                >
                  Nyheter
                </Heading>
                <Text mt={2} color="whiteAlpha.800">
                  Senaste uppdateringarna från gården
                </Text>
              </Box>

              {/* valfri sida senare */}
              <Button
                as={RouterLink}
                to="/nyheter"
                size="sm"
                variant="outline"
                color="white"
                borderColor="whiteAlpha.600"
                _hover={{ bg: "whiteAlpha.200" }}
              >
                Se fler nyheter →
              </Button>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
              {news.map((item) => (
                <LinkBox
                  key={item.id}
                  as="article"
                  bg="whiteAlpha.100"
                  borderWidth="1px"
                  borderColor="whiteAlpha.200"
                  borderRadius="xl"
                  p={5}
                  transition="transform 0.15s ease"
                  _hover={{ transform: "translateY(-2px)", bg: "whiteAlpha.200" }}
                >
                  <Stack spacing={3}>
                    <Text fontSize="sm" color="whiteAlpha.700">
                      {new Date(item.date).toLocaleDateString("sv-SE")}
                    </Text>

                    <Heading
                      as="h4"
                      fontSize="lg"
                      fontWeight="600"
                      lineHeight="1.2"
                    >
                      <LinkOverlay as={RouterLink} to={`/nyheter/${item.id}`}>
                        {item.title}
                      </LinkOverlay>
                    </Heading>

                    <Text color="whiteAlpha.900">{item.excerpt}</Text>

                    <Text fontWeight="600" color="whiteAlpha.900">
                      Läs mer →
                    </Text>
                  </Stack>
                </LinkBox>
              ))}
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
