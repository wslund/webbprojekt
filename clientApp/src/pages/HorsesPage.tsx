import React, { useEffect, useState } from "react";
import { Box, Container, SimpleGrid, Spinner, useDisclosure } from "@chakra-ui/react";
import { PageHero } from "../components/PageHero";
import { HorseCard } from "../components/HorseCard";
import { HorseModal } from "../components/HorseModal";
import { Reveal } from "../components/Reveal";
import { api } from "../api";
import type { Horse } from "../api";

export const HorsesPage: React.FC = () => {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Horse | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    api.getHorses().then((data) => { setHorses(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const openHorse = (horse: Horse) => { setSelected(horse); onOpen(); };
  const closeHorse = () => { onClose(); setSelected(null); };

  return (
    <>
      <PageHero
        tag="Hästar i stallet" title="Våra hästar"
        subtitle="Klicka på en häst för att se statistik, stamtavla och mer information."
        imageUrl="https://images.pexels.com/photos/1996336/pexels-photo-1996336.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <Box py={{ base: 16, md: 24 }} bg="brand.dark" position="relative" overflow="hidden">
        <Box position="absolute" top="-200px" right="-200px" w="500px" h="500px" borderRadius="full"
          bg="radial-gradient(circle, rgba(196,167,125,0.08), transparent 70%)" pointerEvents="none" />
        <Container maxW="6xl">
          {loading ? (
            <Box textAlign="center" py={10}><Spinner size="lg" color="brand.warm" /></Box>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} maxW={{ base: "400px", md: "100%" }} mx="auto">
              {horses.map((horse, i) => (
                <Reveal key={horse.id} delay={i * 0.1}>
                  <HorseCard horse={horse} onClick={() => openHorse(horse)} />
                </Reveal>
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>

      <HorseModal horse={selected} isOpen={isOpen} onClose={closeHorse} />
    </>
  );
};
