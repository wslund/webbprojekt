import React, { useState, useEffect } from "react";
import { Box, Image, SimpleGrid, Text, Collapse } from "@chakra-ui/react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

interface Horse {
  id: number;
  name: string;
  image: string;
  owner: string;
  info: string;
  sortOrder: number;
}

const CardHorses = () => {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    document.title = "Stall Backen | Hästar i stallet";
  }, []);

  useEffect(() => {
    const fetchHorses = async () => {
      try {
        const response = await fetch(
          "http://localhost/PHP_Backend/get_horses.php"
        );

        if (!response.ok) {
          const text = await response.text();
          console.error("Svarstext:", text);
          throw new Error(
            `HTTP-fel: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        setHorses(data);
      } catch (err) {
        const error = err as Error;
        console.error("Fel vid hämtning av hästar:", error.message);
        setError(`Kunde inte hämta hästar: ${error.message}`);
      }
    };
    fetchHorses();
  }, []);

  const toggleInfo = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box bg="background">
      <Box
        maxWidth="1200px"
        margin="auto"
        padding={{ base: 6, md: 10 }}
        bg="background"
        textAlign="center"
      >
        <Text fontSize="2xl" mb={10} fontWeight="bold" color="textColor">
          Hästar i stallet
        </Text>
        {error && (
          <Text color="#9B2C2C" mb={4}>
            {error}
          </Text>
        )}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {horses.map((horse, index) => (
            <Box
              key={horse.id}
              bg="secondary"
              borderWidth="1px"
              borderColor="primary"
              borderRadius="md"
              overflow="hidden"
              boxShadow="md"
              position="relative"
              height={openIndex === index ? "auto" : "330px"}
              transition="height 0.3s ease-in-out"
            >
              <Image
                src={horse.image || "/assets/placeholder.jpg"}
                alt={horse.name}
                width="100%"
                height="250px"
                objectFit="cover"
                border="1px solid"
                borderColor="primary"
                borderRadius="md"
              />
              <Box
                p={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                _focus={{ outline: "none" }}
              >
                <Text fontSize="lg" fontWeight="semibold" color="textColor">
                  {horse.name}
                </Text>
                <Box
                  as="div"
                  bg="background"
                  p={2}
                  cursor="pointer"
                  onClick={() => toggleInfo(index)}
                  _hover={{ bg: "secondary", color: "primary" }}
                  _active={{ bg: "secondary" }}
                  _focus={{ outline: "none", boxShadow: "none" }}
                >
                  {openIndex === index ? (
                    <ExpandLess style={{ color: "#4A3728" }} />
                  ) : (
                    <ExpandMore style={{ color: "#4A3728" }} />
                  )}
                </Box>
              </Box>
              <Collapse in={openIndex === index} animateOpacity>
                <Box
                  p={4}
                  bg="secondary"
                  borderTopWidth="1px"
                  borderColor="primary"
                  height="auto"
                  overflow="hidden"
                  transition="height 0.3s ease-in-out"
                  textAlign="left"
                >
                  <Text color="textColor">
                    <Text as="span" fontWeight="bold">
                      Ägare:
                    </Text>{" "}
                    {horse.owner}
                  </Text>
                  <Text color="textColor">
                    <Text as="span" fontWeight="bold">
                      Info:
                    </Text>{" "}
                    {horse.info}
                  </Text>
                </Box>
              </Collapse>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default CardHorses;
