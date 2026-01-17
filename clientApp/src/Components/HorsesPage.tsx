
import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  HStack,
  VStack,
  Badge,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import horsesImg from "../../public/assets/foal.jpg";

type Horse = {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  stats: {
    age?: number;
    sex?: "Sto" | "Hingst" | "Valack";
    pedigree?: string;
    trainer?: string;
    starts?: number;
    wins?: number;
    placings?: number;
    record?: string;
  };
};

const horses: Horse[] = [
  {
    id: "exempel-star",
    name: "Exempel Star",
    category: "Tävlingshäst",
    description: "Startar regelbundet och har flera pallplaceringar.",
    imageUrl:
      "https://images.pexels.com/photos/1996336/pexels-photo-1996336.jpeg?auto=compress&cs=tinysrgb&w=1200",
    stats: {
      age: 6,
      sex: "Valack",
      starts: 28,
      wins: 5,
      placings: 12,
      record: "1.12,8",
      trainer: "Exempel Tränare",
      pedigree: "e. Exempelhingst u. Exempelsto",
    },
  },
  {
    id: "exempel-nova",
    name: "Exempel Nova",
    category: "Avelssto",
    description: "Meriterad på banan, nu en del av vår avelssatsning.",
    imageUrl:
      "https://images.pexels.com/photos/979952/pexels-photo-979952.jpeg?auto=compress&cs=tinysrgb&w=1200",
    stats: {
      age: 9,
      sex: "Sto",
      starts: 34,
      wins: 7,
      placings: 18,
      record: "1.13,4",
      trainer: "Exempel Tränare",
      pedigree: "e. Exempelhingst u. Exempelsto",
    },
  },
  {
    id: "exempel-rocket",
    name: "Exempel Rocket",
    category: "Unghäst",
    description: "Lovande unghäst i uppträning med fin inställning.",
    imageUrl:
      "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1200",
    stats: {
      age: 2,
      sex: "Hingst",
      starts: 0,
      wins: 0,
      placings: 0,
      trainer: "Exempel Tränare",
      pedigree: "e. Exempelhingst u. Exempelsto",
    },
  },
];

const StatLine: React.FC<{ label: string; value?: React.ReactNode }> = ({
  label,
  value,
}) => (
  <HStack justify="space-between" fontSize="sm" color="gray.700">
    <Text fontWeight="500">{label}</Text>
    <Text>{value ?? "—"}</Text>
  </HStack>
);

export const HorsesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedHorse = useMemo(
    () => horses.find((h) => h.id === selectedId) ?? null,
    [selectedId]
  );

  const openHorse = (id: string) => {
    setSelectedId(id);
    onOpen();
  };

  const closeHorse = () => {
    onClose();
    setSelectedId(null);
  };

  return (
    <Box bg="white">
      <Box
        position="relative"
        minH={{ base: "60vh", md: "65vh" }}
        backgroundImage={`url(${horsesImg})`}
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
              Hästar i stallet
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="500"
              mb={3}
            >
              Våra hästar
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }} opacity={0.9}>
              Klicka på en häst för att se mer information och statistik.
            </Text>
          </Box>
        </Container>
      </Box>
      <Box bg="gray.50" pt={12} pb={16}>
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {horses.map((horse) => (
              <Box
                key={horse.id}
                role="button"
                tabIndex={0}
                onClick={() => openHorse(horse.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openHorse(horse.id);
                }}
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                overflow="hidden"
                cursor="pointer"
                transition="transform 0.15s ease, box-shadow 0.15s ease"
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                _focusVisible={{
                  outline: "3px solid",
                  outlineColor: "blue.300",
                  outlineOffset: "2px",
                }}
              >
                <Box h="160px" position="relative">
                  <Image
                    src={horse.imageUrl}
                    alt={horse.name}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                  <Badge
                    position="absolute"
                    top={3}
                    left={3}
                    bg="blackAlpha.700"
                    color="white"
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="xs"
                    letterSpacing="0.08em"
                  >
                    {horse.category}
                  </Badge>
                </Box>
                <Box p={5}>
                  <Heading as="h3" fontSize="lg" mb={2}>
                    {horse.name}
                  </Heading>
                  <Text fontSize="sm" color="gray.700" noOfLines={3}>
                    {horse.description}
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Modal isOpen={isOpen} onClose={closeHorse} size="xl" isCentered>
        <ModalOverlay bg="blackAlpha.600" />
        <ModalContent borderRadius="2xl" overflow="hidden">
          <ModalCloseButton />

          {selectedHorse && (
            <>
              <ModalHeader>
                <HStack justify="space-between" align="start">
                  <Box>
                    <Text
                      fontSize="xs"
                      textTransform="uppercase"
                      letterSpacing="0.16em"
                      color="gray.500"
                      mb={1}
                    >
                      {selectedHorse.category}
                    </Text>
                    <Heading as="h2" fontSize="xl" fontWeight="600">
                      {selectedHorse.name}
                    </Heading>
                  </Box>

                  {selectedHorse.stats.record && (
                    <Badge borderRadius="full" px={3} py={1}>
                      Rekord: {selectedHorse.stats.record}
                    </Badge>
                  )}
                </HStack>
              </ModalHeader>

              <ModalBody>
                <Box borderRadius="xl" overflow="hidden" mb={4}>
                  <Image
                    src={selectedHorse.imageUrl}
                    alt={selectedHorse.name}
                    w="100%"
                    h={{ base: "220px", md: "260px" }}
                    objectFit="cover"
                  />
                </Box>
                <Text color="gray.700" mb={4}>
                  {selectedHorse.description}
                </Text>
                <Divider mb={4} />
                <VStack align="stretch" spacing={2}>
                  <Heading
                    as="h3"
                    fontSize="sm"
                    textTransform="uppercase"
                    letterSpacing="0.14em"
                  >
                    Statistik
                  </Heading>
                  <StatLine
                    label="Ålder"
                    value={
                      selectedHorse.stats.age
                        ? `${selectedHorse.stats.age} år`
                        : undefined
                    }
                  />
                  <StatLine label="Kön" value={selectedHorse.stats.sex} />
                  <StatLine label="Starter" value={selectedHorse.stats.starts} />
                  <StatLine label="Segrar" value={selectedHorse.stats.wins} />
                  <StatLine
                    label="Placeringar"
                    value={selectedHorse.stats.placings}
                  />
                  <StatLine label="Tränare" value={selectedHorse.stats.trainer} />

                  {selectedHorse.stats.pedigree && (
                    <Box pt={2}>
                      <Text fontSize="sm" fontWeight="500" color="gray.700" mb={1}>
                        Stamtavla
                      </Text>
                      <Text fontSize="sm" color="gray.700">
                        {selectedHorse.stats.pedigree}
                      </Text>
                    </Box>
                  )}
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Button onClick={closeHorse} rounded="full">
                  Stäng
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};
