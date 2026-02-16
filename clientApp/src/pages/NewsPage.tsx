<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Box, Container, SimpleGrid, Spinner } from "@chakra-ui/react";
import { PageHero } from "../components/PageHero";
import { NewsCard } from "../components/NewsCard";
import { Reveal } from "../components/Reveal";
import { api } from "../api";
import type { NewsItem } from "../api";

export const NewsPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getNews().then((data) => { setNews(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHero
        tag="Senaste nytt" title="Nyheter"
        subtitle="Uppdateringar från gården — nya föl, tävlingsresultat och träningsinsikter."
        imageUrl="https://images.pexels.com/photos/979952/pexels-photo-979952.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <Box as="section" py={{ base: 16, md: 24 }} bg="brand.cream">
        <Container maxW="6xl">
          {loading ? (
            <Box textAlign="center" py={10}><Spinner size="lg" color="brand.olive" /></Box>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              {news.map((item, i) => (
                <Reveal key={item.id} delay={(i % 3) * 0.1}><NewsCard item={item} /></Reveal>
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Box>
    </>
=======
// src/pages/NewsPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Link,
  List,
  ListItem,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";

type NewsListItem = {
  id: number | string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  category?: string;
};

type ArchiveItem = {
  key: string; // YYYY-MM
  label: string;
  count: number;
};

function monthLabelSv(keyYYYYMM: string) {
  const [y, m] = keyYYYYMM.split("-").map((x) => parseInt(x, 10));
  const d = new Date(y, (m || 1) - 1, 1);
  return d.toLocaleDateString("sv-SE", { month: "long", year: "numeric" });
}

export const NewsPage = () => {
  const [params] = useSearchParams();
  const monthFilter = (params.get("month") || "").trim(); // "YYYY-MM"

  const API_BASE = useMemo(() => {
    const v = import.meta.env.VITE_API_BASE_URL as string | undefined;
    return (v || "").trim().replace(/\/+$/, "");
  }, []);

  const [allNews, setAllNews] = useState<NewsListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [archives, setArchives] = useState<ArchiveItem[]>([]);

  useEffect(() => {
    if (!API_BASE) {
      setError("Ingen API-konfiguration hittades (VITE_API_BASE_URL saknas).");
      setLoading(false);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`${API_BASE}/news`, { signal: controller.signal });
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
        const json = (await res.json()) as unknown;

        const arr = Array.isArray(json) ? (json as NewsListItem[]) : [];
        if (!cancelled) {
          setAllNews(arr);

          // Arkiv
          const map = new Map<string, number>();
          for (const n of arr) {
            const key = String(n.date || "").slice(0, 7);
            if (!/^\d{4}-\d{2}$/.test(key)) continue;
            map.set(key, (map.get(key) || 0) + 1);
          }
          const archiveItems: ArchiveItem[] = Array.from(map.entries())
            .sort((a, b) => (a[0] < b[0] ? 1 : -1))
            .map(([key, count]) => ({ key, label: monthLabelSv(key), count }));
          setArchives(archiveItems);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || "Kunde inte hämta nyheter.");
          setAllNews([]);
          setArchives([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [API_BASE]);

  const filteredNews = useMemo(() => {
    if (!monthFilter) return allNews;
    if (!/^\d{4}-\d{2}$/.test(monthFilter)) return allNews;
    return allNews.filter((n) => String(n.date).startsWith(monthFilter));
  }, [allNews, monthFilter]);

  return (
    <Box bg="white" py={{ base: 8, md: 14 }}>
      <Container maxW="6xl">
        <Breadcrumb fontSize="sm" color="gray.600" mb={6}>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">
              Hem
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Nyheter</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="600" mb={6}>
          Nyheter
        </Heading>

        {loading && (
          <Stack align="center" py={16}>
            <Spinner size="lg" />
            <Text color="gray.600">Hämtar nyheter...</Text>
          </Stack>
        )}

        {!loading && error && (
          <Box>
            <Heading size="md">Något gick fel</Heading>
            <Text mt={2} color="gray.600">
              {error}
            </Text>
          </Box>
        )}

        {!loading && !error && (
          <Box
            display="grid"
            gridTemplateColumns={{ base: "1fr", lg: "320px minmax(0, 1fr)" }}
            gap={{ base: 10, lg: 12 }}
            alignItems="start"
          >
            {/* LEFT sidebar: Arkiv */}
            <Box>
              <Box
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="xl"
                p={6}
                position={{ lg: "sticky" }}
                top={{ lg: 24 }}
                bg="white"
              >
                <Heading as="h3" fontSize="lg" mb={4}>
                  Arkiv
                </Heading>

                {archives.length === 0 ? (
                  <Text color="gray.600" fontSize="sm">
                    Inget arkiv ännu.
                  </Text>
                ) : (
                  <List spacing={2}>
                    {archives.map((a) => {
                      const active = a.key === monthFilter;
                      return (
                        <ListItem key={a.key}>
                          <Link
                            as={RouterLink}
                            to={`/nyheter?month=${encodeURIComponent(a.key)}`}
                            color={active ? "#00887C" : "gray.800"}
                            fontWeight="700"
                          >
                            {a.label}{" "}
                            <Text as="span" color="gray.500" fontWeight="500">
                              ({a.count})
                            </Text>
                          </Link>
                        </ListItem>
                      );
                    })}
                  </List>
                )}

                {monthFilter && (
                  <>
                    <Divider my={5} />
                    <Button
                      as={RouterLink}
                      to="/nyheter"
                      size="sm"
                      variant="outline"
                      borderColor="gray.300"
                    >
                      Rensa filter
                    </Button>
                  </>
                )}
              </Box>
            </Box>

            {/* List */}
            <Box>
              {monthFilter && (
                <Text color="gray.600" mb={4}>
                  Visar nyheter från <strong>{monthLabelSv(monthFilter)}</strong>
                </Text>
              )}

              {filteredNews.length === 0 ? (
                <Text color="gray.600">Inga nyheter att visa.</Text>
              ) : (
                <Stack spacing={6}>
                  {filteredNews.map((n) => (
                    <Box key={n.id}>
                      <Text fontSize="sm" color="gray.600" mb={1}>
                        {new Date(n.date).toLocaleDateString("sv-SE")}
                      </Text>

                      <Link
                        as={RouterLink}
                        to={`/nyheter/${n.id}`}
                        fontSize="xl"
                        fontWeight="700"
                        color="gray.900"
                      >
                        {n.title}
                      </Link>

                      <Text mt={2} color="gray.700" lineHeight="1.7">
                        {n.excerpt}
                      </Text>

                      <HStack mt={3}>
                        <Link
                          as={RouterLink}
                          to={`/nyheter/${n.id}`}
                          color="#00887C"
                          fontWeight="700"
                        >
                          Läs mer →
                        </Link>
                      </HStack>

                      <Divider mt={6} />
                    </Box>
                  ))}
                </Stack>
              )}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
>>>>>>> 4cb1f7897da9269ffd330b607274bcd2f83dec90
  );
};
