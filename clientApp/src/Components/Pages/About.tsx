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
  // Använd useBreakpointValue för att ställa in layouten baserat på skärmstorleken
  const direction = useBreakpointValue({ base: "column", md: "row" }) as
    | "column"
    | "row"; // Typkonvertering
  const imageOrder = useBreakpointValue({ base: 1, md: 2 }); // Bildens ordning
  const textOrder = useBreakpointValue({ base: 2, md: 1 }); // Textens ordning

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
        direction={direction} // Använd den responsiva direction
      >
        {/* Box för texten */}
        <Box
          width={{ base: "100%", md: "50%" }} // Gör texten ta 50% på större skärmar
          textAlign="center"
          paddingX="1rem"
          order={textOrder} // Styr ordningen av texten
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

        {/* Box för bilden */}
        <Box
          maxWidth="600px"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginBottom={{ base: "2rem", md: "0" }} // Margin under på mobil
          order={imageOrder} // Styr ordningen av bilden
        >
          <Image
            src={myHorseImage} // Använd den importerade bilden
            alt="Hästar"
            width="100%" // Sätt bredd till 100%
            maxWidth="600px" // Sätt en maxbredd för att förhindra att bilden blir för stor
            objectFit="cover" // Gör så att bilden täcker hela utrymmet
            borderRadius="2px"
            marginBottom="1rem" // Ge lite utrymme under bilden
          />
        </Box>
      </Flex>
    </Stack>
  );
};

export default About;
