// src/pages/AboutPage.tsx
import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";


import aboutImg from "../../public/assets/foal.jpg"; 

export const AboutPage = () => {
  return (
    <Box bg="white">

      <Box
        position="relative"
        minH={{ base: "60vh", md: "65vh" }}
        backgroundImage={`url(${aboutImg})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >

        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, blackAlpha.700, blackAlpha.400)"
        />


        <Container maxW="6xl" position="relative" h="100%">
          <Box

            pt={{ base: "96px", md: "110px" }}
            pb={{ base: 10, md: 16 }}
            color="white"
            maxW="2xl"
          >
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="0.18em"
              opacity={0.9}
              mb={2}
            >
              Om oss
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="500"
              mb={3}
            >
              Stall Exempelgården
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }} opacity={0.9}>
              Familjeägt stall med fokus på hållbar uppfödning och travsport –
              där hästens välmående alltid kommer först.
            </Text>
          </Box>
        </Container>
      </Box>
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
                  Hästens välmående först – då kommer resultaten som en naturlig
                  följd.
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
