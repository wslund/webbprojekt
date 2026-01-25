// src/pages/AboutPage.tsx
import React from "react";
import { Box, Container, Heading, Text, SimpleGrid, Stack } from "@chakra-ui/react";
import { PageHero } from "../components/PageHero";
import aboutImg from "../../public/assets/foal.jpg";

export const AboutPage = () => {
  return (
    <Box bg="white">
      <PageHero
        eyebrow="Om oss"
        title="Stall Exempelgården"
        subtitle="Familjeägt stall med fokus på hållbar uppfödning och travsport – där hästens välmående alltid kommer först."
        imageUrl={aboutImg}
      />

      <Box pt={12} pb={16}>
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
            <Box>
              <Text fontSize="md" color="gray.700" mb={4}>
                Stall Exempelgården är ett familjeägt företag med passion för
                hästar och travsport. Vi arbetar med både uppfödning och
                tävlingsverksamhet, där varje individ får en genomtänkt plan.
              </Text>
              <Text fontSize="md" color="gray.700">
                För oss är det viktigt att kombinera struktur, kunskap och hjärta –
                både i stallet och på banan.
              </Text>
            </Box>

            <Stack spacing={4} fontSize="sm" color="gray.700">
              <Box>
                <Heading as="h3" fontSize="sm" textTransform="uppercase" mb={1}>
                  Inriktning
                </Heading>
                <Text>Uppfödning, unghästträning och tävling inom trav.</Text>
              </Box>
              <Box>
                <Heading as="h3" fontSize="sm" textTransform="uppercase" mb={1}>
                  Filosofi
                </Heading>
                <Text>
                  Hästens välmående först – då kommer resultaten som en naturlig följd.
                </Text>
              </Box>
              <Box>
                <Heading as="h3" fontSize="sm" textTransform="uppercase" mb={1}>
                  Plats
                </Heading>
                <Text>
                  Exempelgården, vackert belägen med natur och träningsmöjligheter.
                </Text>
              </Box>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};
