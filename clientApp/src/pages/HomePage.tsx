
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
