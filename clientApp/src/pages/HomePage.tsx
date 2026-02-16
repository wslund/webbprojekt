import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Heading, Image, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HeroCarousel } from "../components/HeroCarousel";
import { SectionHeader } from "../components/SectionHeader";
import { NewsCard } from "../components/NewsCard";
import { Reveal } from "../components/Reveal";
import { api } from "../api";
import type { NewsItem } from "../api";

export const HomePage: React.FC = () => {
  const parallaxRef = useRef<HTMLImageElement>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getNews().then((data) => { setNews(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const img = parallaxRef.current;
      if (!img) return;
      const rect = img.parentElement!.getBoundingClientRect();
      img.style.transform = `translateY(${rect.top * 0.15}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <HeroCarousel />

      {/* ── INTRO ── */}
      <Box as="section" py={{ base: 16, md: 24 }} bg="brand.bg">
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 10, md: 16 }} alignItems="center">
            <Reveal direction="left">
              <Text fontSize="0.7rem" fontWeight={600} letterSpacing="0.2em" textTransform="uppercase" color="brand.olive" mb={5}>
                Om Stall Backen
              </Text>
              <Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} fontWeight={300} lineHeight={1.15} mb={6}>
                Där hästens välmående alltid kommer först.
              </Heading>
              <Text fontSize="md" lineHeight={1.85} color="brand.muted" mb={6}>
                Stall Backen är ett familjeägt företag med djup passion för hästar
                och travsport. Vi arbetar med uppfödning och tävlingsverksamhet
                där varje individ får en genomtänkt plan — från de första stegen i
                hagen till start på banan.
              </Text>
              <Text fontSize="md" lineHeight={1.85} color="brand.muted" mb={8}>
                För oss handlar det om att kombinera kunskap, tålamod och hjärta.
                Vi tror att hästar som mår bra också presterar bra.
              </Text>
              <Button as={RouterLink} to="/om-oss" variant="brandDark">Läs mer om oss</Button>
            </Reveal>

            <Reveal direction="right">
              <Box borderRadius="xl" overflow="hidden" sx={{ aspectRatio: "4/5" }} role="group">
                <Image src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=900&q=80" alt="Föl på gården"
                  w="100%" h="100%" objectFit="cover" transition="transform 0.8s cubic-bezier(0.16,1,0.3,1)" _groupHover={{ transform: "scale(1.03)" }} />
              </Box>
            </Reveal>
          </SimpleGrid>
        </Container>
      </Box>

      {/* ── PARALLAX STRIP ── */}
      <Box 
        position="relative" 
        h={{ base: "300px", md: "45vh" }} 
        maxH="500px" 
        overflow="hidden" 
        bg="brand.bg"
      >
        <Box 
          as="img" 
          ref={parallaxRef} 
          src="https://images.pexels.com/photos/1996336/pexels-photo-1996336.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="" 
          w="100%" 
          h="250%" 
          objectFit="cover" 
          position="absolute" 
          top="-75%" 
          willChange="transform" 
        />
        <Box position="absolute" inset={0} bg="blackAlpha.300" display="flex" alignItems="center" justifyContent="center">
          <Reveal direction="scale">
            <Text fontFamily="heading" fontSize={{ base: "xl", md: "3xl", lg: "4xl" }} fontWeight={300} color="white" textAlign="center" maxW="700px" px={8} lineHeight={1.3}>
              "Hästar som får vara{" "}<Text as="em" color="brand.warm" fontStyle="italic">hästar</Text>{" "}— det är vår filosofi, och den syns i allt vi gör."
            </Text>
          </Reveal>
        </Box>
      </Box>

      {/* ── NEWS PREVIEW ── */}
      <Box as="section" py={{ base: 16, md: 24 }} bg="brand.cream">
        <Container maxW="6xl">
          <Reveal><SectionHeader tag="Senaste nytt" title="Nyheter från gården" /></Reveal>
          {loading ? (
            <Box textAlign="center" py={10}><Spinner size="lg" color="brand.olive" /></Box>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {news.slice(0, 3).map((item, i) => (
                <Reveal key={item.id} delay={i * 0.1}><NewsCard item={item} /></Reveal>
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>
    </>
  );
};