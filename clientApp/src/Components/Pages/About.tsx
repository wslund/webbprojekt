import {
  Stack,
  Box,
  Heading,
  Text,
  Flex,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import myHorseImage from "../../assets/häst.jpg";

const About = () => {
  const direction = useBreakpointValue({ base: "column", md: "row" }) as
    | "column"
    | "row";
  const imageOrder = useBreakpointValue({ base: 1, md: 2 });
  const textOrder = useBreakpointValue({ base: 2, md: 1 });

  return (
    <Stack
      spacing={4}
      margin="0"
      padding="0"
      position="relative"
      bg="#F7F7F7"
      minHeight="100vh"
      paddingX="2rem"
    >
      <Flex
        align="center"
        justify="center"
        padding="2rem"
        direction={direction}
      >
        <Box
          width={{ base: "100%", md: "50%" }}
          textAlign="center"
          paddingX="1rem"
          order={textOrder}
        >
          <Heading as="h1" size="xl" marginBottom="1rem">
            Om Oss - Hästuppfödning Företag
          </Heading>
          <Text fontSize="md" lineHeight="1.5" color="#333">
            Välkommen till [Företagsnamn], där vår passion för hästar förenas
            med vår expertis inom hästuppfödning.
            <br />
            <br />
            Vi har över [antal] års erfarenhet av att föda upp hästar av högsta
            kvalitet. Vår verksamhet fokuserar på att skapa en trygg och
            hälsosam miljö för våra hästar, vilket garanterar deras
            välbefinnande och utveckling.
          </Text>
        </Box>
        <Box
          maxWidth="600px"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginBottom={{ base: "2rem", md: "0" }}
          order={imageOrder}
        >
          <Image
            src={myHorseImage}
            alt="Hästar"
            width="100%"
            maxWidth="600px"
            objectFit="cover"
            borderRadius="2px"
            marginBottom="1rem"
          />
        </Box>
      </Flex>
    </Stack>
  );
};

export default About;
