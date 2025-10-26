import React, { useEffect } from "react";
import {
  Stack,
  Box,
  Heading,
  Text,
  Flex,
  Image,
  useBreakpointValue,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import myHorseImage from "../../assets/häst.jpg";

const CardAbout = () => {
  const direction = useBreakpointValue({ base: "column", md: "row" }) as
    | "column"
    | "row";
  const imageOrder = useBreakpointValue({ base: 1, md: 2 });
  const textOrder = useBreakpointValue({ base: 2, md: 1 });
  const servicesImageOrder = useBreakpointValue({ base: 1, md: 1 });
  const servicesTextOrder = useBreakpointValue({ base: 2, md: 2 });

  useEffect(() => {
    document.title = "Stall Backen | Om oss";
  }, []);

  return (
    <Stack
      spacing={4}
      m="0"
      p="0"
      position="relative"
      bg="background"
      minH="100vh"
      px={{ base: "1rem", md: "2rem" }}
    >
      {/* Sektion: Om oss */}
      <Flex
        align="center"
        justify="center"
        p={{ base: "1rem", md: "2rem" }}
        direction={direction}
        maxW="1200px"
        w="100%"
        m="0 auto"
        bg="secondary"
        borderRadius="md"
        boxShadow="sm"
      >
        <Box
          w={{ base: "100%", md: "50%" }}
          textAlign="center"
          px={{ base: "1rem", md: "2rem" }}
          order={textOrder}
        >
          <Heading as="h1" size="xl" mb="1rem" color="textColor">
            Om Oss
          </Heading>

          <Text fontSize="md" lineHeight="1.6" color="textColor" mb="0.75rem">
            Välkommen till [Företagsnamn], där vår passion för hästar förenas
            med vår expertis inom hästuppfödning.
          </Text>
          <Text fontSize="md" lineHeight="1.6" color="textColor">
            Vi har över [antal] års erfarenhet av att föda upp hästar av högsta
            kvalitet. Vår verksamhet fokuserar på att skapa en trygg och
            hälsosam miljö för våra hästar, vilket garanterar deras
            välbefinnande och utveckling.
          </Text>
        </Box>

        <Box
          maxW="600px"
          w="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={{ base: "2rem", md: "0" }}
          order={imageOrder}
        >
          <Image
            src={myHorseImage}
            alt="Hästar"
            w="100%"
            maxW="600px"
            objectFit="cover"
            borderRadius="md"
            border="1px solid"
            borderColor="primary"
            mb="1rem"
          />
        </Box>
      </Flex>

      {/* Sektion: Våra tjänster */}
      <Flex
        align="center"
        justify="center"
        p={{ base: "1rem", md: "2rem" }}
        direction={direction}
        maxW="1200px"
        w="100%"
        m="0 auto"
        bg="secondary"
        borderRadius="md"
        boxShadow="sm"
      >
        <Box
          maxW="600px"
          w="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={{ base: "2rem", md: "0" }}
          order={servicesImageOrder}
        >
          <Image
            src={myHorseImage}
            alt="Våra Tjänster"
            w="100%"
            maxW="600px"
            objectFit="cover"
            borderRadius="md"
            border="1px solid"
            borderColor="primary"
            mb="1rem"
          />
        </Box>

        <Box
          w={{ base: "100%", md: "50%" }}
          maxW="800px"
          textAlign={{ base: "center", md: "left" }}
          px={{ base: "1rem", md: "4rem" }}
          order={servicesTextOrder}
        >
          <Heading as="h2" size="lg" mb="1rem" color="textColor">
            Våra Tjänster
          </Heading>

          <Text fontSize="md" lineHeight="1.6" color="textColor" mb="0.5rem">
            Vi erbjuder en rad tjänster inom hästuppfödning, inklusive:
          </Text>

          <UnorderedList pl="1.5rem" mb="0.5rem" textAlign="left">
            <ListItem>Professionell träning</ListItem>
            <ListItem>Rådgivning kring hästhållning</ListItem>
            <ListItem>Uppfödning av kvalitetsstammar</ListItem>
            <ListItem>Föreställningar och evenemang</ListItem>
          </UnorderedList>

          <Text fontSize="md" lineHeight="1.6" color="textColor">
            Kontakta oss för att lära dig mer om hur vi kan hjälpa dig!
          </Text>
        </Box>
      </Flex>
    </Stack>
  );
};

export default CardAbout;
