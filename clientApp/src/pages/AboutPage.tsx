<<<<<<< HEAD
import React from "react";
import { Box, Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";

const facts = [
  { label: "Inriktning", text: "Uppfödning, unghästträning och tävling inom trav." },
  { label: "Filosofi", text: "Hästens välmående först — då kommer resultaten som en naturlig följd." },
  { label: "Plats", text: "Vackert belägen med natur, hagar och nära till träningsmöjligheter." },
];

export const AboutPage: React.FC = () => (
  <>
    <PageHero
      tag="Om oss"
      title="Stall Backen"
      subtitle="Familjeägt stall med fokus på hållbar uppfödning och travsport – där hästens välmående alltid kommer först."
      imageUrl="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1920&q=80"
    />

    <Box py={{ base: 16, md: 24 }}>
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 10, md: 16 }} alignItems="start">
          <Reveal direction="left">
            <Text fontSize="md" lineHeight={1.85} color="brand.muted" mb={6}>
              Stall Backen är ett familjeägt företag med passion för hästar och
              travsport. Vi arbetar med både uppfödning och tävlingsverksamhet,
              där varje individ får en genomtänkt plan.
            </Text>
            <Text fontSize="md" lineHeight={1.85} color="brand.muted">
              För oss är det viktigt att kombinera struktur, kunskap och hjärta —
              både i stallet och på banan. Vi tror att hästar som mår bra också
              presterar bra, och den filosofin genomsyrar allt vi gör.
            </Text>
          </Reveal>

          <Reveal direction="right">
            <VStack spacing={6} align="stretch">
              {facts.map((f) => (
                <Box key={f.label}>
                  <Heading
                    as="h3"
                    fontSize="0.7rem"
                    fontFamily="body"
                    fontWeight={600}
                    letterSpacing="0.16em"
                    textTransform="uppercase"
                    color="brand.olive"
                    mb={1}
                  >
                    {f.label}
                  </Heading>
                  <Text fontSize="sm" lineHeight={1.7} color="brand.muted">
                    {f.text}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Reveal>
        </SimpleGrid>
      </Container>
    </Box>
  </>
);
=======
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
>>>>>>> 4cb1f7897da9269ffd330b607274bcd2f83dec90
