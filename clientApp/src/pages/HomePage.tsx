<<<<<<< HEAD
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
=======

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HeroCarousel } from "../components/HeroCarousel";

type NewsItem = {
  id: number | string;
  title: string;
  date: string;
  excerpt: string;
};

export const HomePage = () => {
  const API_BASE = useMemo(() => {
    const v = import.meta.env.VITE_API_BASE_URL as string | undefined;
    return (v || "").trim().replace(/\/+$/, "");
  }, []);

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!API_BASE) {
      setError("Ingen API-konfiguration hittades (VITE_API_BASE_URL saknas).");
      return;
    }

    let cancelled = false;

    const load = async () => {
      const controller = new AbortController();
      const timeoutMs = 12000;
      const t = setTimeout(() => controller.abort(), timeoutMs);

      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/news`, {
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);

        const data = (await res.json()) as unknown;

        if (!cancelled) {
          if (Array.isArray(data)) setNews(data as NewsItem[]);
          else throw new Error("API returnerade inte en lista.");
        }
      } catch (e: any) {
        if (!cancelled) {
          if (e?.name === "AbortError") {
            setError(
              "Timeout när vi hämtade nyheter (servern kan vara i cold start). Testa ladda om sidan."
            );
          } else {
            setError(e?.message || "Kunde inte hämta nyheter");
          }
          setNews([]);
        }
      } finally {
        clearTimeout(t);
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [API_BASE]);

  return (
    <Box bg="white">
      <HeroCarousel />

      <Box py={16} bg="white">
        <Container maxW="6xl">
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} mb={4} fontWeight="500">
            Välkommen till Stall Exempelgården
          </Heading>

          <Text fontSize="md" color="gray.700">
            Vi är ett stall som kombinerar uppfödning, travsport och en stark
            tro på att hästar mår bäst när de får vara just hästar. På gården
            arbetar vi långsiktigt – från föl till färdig tävlingshäst – med
            fokus på hållbarhet, temperament och prestation.
          </Text>

          <Box
            mt={12}
            bg="#00887C"
            color="white"
            borderRadius={{ base: "xl", md: "2xl" }}
            px={{ base: 5, md: 10 }}
            py={{ base: 6, md: 10 }}
          >
            <HStack justify="space-between" align="flex-end" mb={{ base: 6, md: 8 }}>
              <Box>
                <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} fontWeight="500">
                  Nyheter
                </Heading>
                <Text mt={2} color="whiteAlpha.900">
                  Senaste uppdateringarna från gården
                </Text>

                <HStack mt={3} spacing={3}>
                  {loading && (
                    <>
                      <Spinner size="sm" />
                      <Text fontSize="sm" color="whiteAlpha.900">
                        Laddar nyheter...
                      </Text>
                    </>
                  )}
                  {!loading && error && (
                    <Text fontSize="sm" color="red.200">
                      {error}
                    </Text>
                  )}
                </HStack>
              </Box>

              <Button
                size="sm"
                variant="outline"
                color="white"
                borderColor="whiteAlpha.800"
                _hover={{ bg: "whiteAlpha.200" }}
                as={RouterLink}
                to="/nyheter"
              >
                Se fler nyheter →
              </Button>
            </HStack>

            {!loading && !error && news.length === 0 && (
              <Text color="whiteAlpha.900">Inga nyheter ännu.</Text>
            )}

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
              {news.map((item) => (
                <LinkBox
                  key={item.id}
                  as="article"
                  bg="whiteAlpha.150"
                  borderWidth="1px"
                  borderColor="whiteAlpha.300"
                  borderRadius="xl"
                  p={5}
                  transition="transform 0.15s ease"
                  _hover={{ transform: "translateY(-2px)", bg: "whiteAlpha.250" }}
                >
                  <Stack spacing={3}>
                    <Text fontSize="sm" color="whiteAlpha.900">
                      {new Date(item.date).toLocaleDateString("sv-SE")}
                    </Text>

                    <Heading as="h4" fontSize="lg" fontWeight="600" lineHeight="1.2">
                      <LinkOverlay as={RouterLink} to={`/nyheter/${item.id}`}>
                        {item.title}
                      </LinkOverlay>
                    </Heading>

                    <Text color="whiteAlpha.900">{item.excerpt}</Text>

                    <Text fontWeight="600" color="whiteAlpha.900">
                      Läs mer →
                    </Text>
                  </Stack>
                </LinkBox>
              ))}
            </SimpleGrid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
>>>>>>> 4cb1f7897da9269ffd330b607274bcd2f83dec90
