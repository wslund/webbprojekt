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
  const servicesImageOrder = useBreakpointValue({ base: 1, md: 1 });
  const servicesTextOrder = useBreakpointValue({ base: 2, md: 2 });

  return (
    <Stack
      spacing={4}
      margin="0"
      padding="0"
      position="relative"
      bg="secondary"
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
          <Heading as="h1" size="xl" marginBottom="1rem" color="textColor">
            Om Oss
          </Heading>
          <Text fontSize="md" lineHeight="1.5" color="textColor">
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

      <Flex
        align="center"
        justify="center"
        padding="2rem"
        direction={direction}
        marginLeft={{ base: "0", md: "2rem" }}
      >
        <Box
          maxWidth="600px"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginBottom={{ base: "2rem", md: "0" }}
          order={servicesImageOrder}
        >
          <Image
            src={myHorseImage}
            alt="Våra Tjänster"
            width="100%"
            maxWidth="600px"
            objectFit="cover"
            borderRadius="2px"
            marginBottom="1rem"
          />
        </Box>
        <Box
          width={{ base: "100%", md: "50%" }}
          maxWidth="800px"
          textAlign={{ base: "center", md: "left" }}
          paddingX={{ base: "1rem", md: "4rem" }}
          order={servicesTextOrder}
        >
          <Heading as="h2" size="lg" marginBottom="1rem" color="textColor">
            Våra Tjänster
          </Heading>
          <Text fontSize="md" lineHeight="1.5" color="textColor">
            Vi erbjuder en rad tjänster inom hästuppfödning, inklusive:
            <ul>
              <li>Professionell träning</li>
              <li>Rådgivning kring hästhållning</li>
              <li>Uppfödning av kvalitetsstammar</li>
              <li>Föreställningar och evenemang</li>
            </ul>
            Kontakta oss för att lära dig mer om hur vi kan hjälpa dig!
          </Text>
        </Box>
      </Flex>
    </Stack>
  );
};

export default About;
