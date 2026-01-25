// src/pages/NewsDetailPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Divider,
  Heading,
  HStack,
  Image,
  Link,
  List,
  ListItem,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";

type NewsDetail = {
  id: number | string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  body: string;
  category?: string;
  image_url?: string | null;
};

type NewsListItem = {
  id: number | string;
  title: string;
  date: string; // YYYY-MM-DD
  category?: string;
};

type ArchiveItem = {
  key: string; // "YYYY-MM"
  label: string; // "januari 2026"
  count: number;
};

function monthLabelSv(keyYYYYMM: string) {
  const [y, m] = keyYYYYMM.split("-").map((x) => parseInt(x, 10));
  const d = new Date(y, (m || 1) - 1, 1);
  return d.toLocaleDateString("sv-SE", { month: "long", year: "numeric" });
}

export const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const API_BASE = useMemo(() => {
    const v = import.meta.env.VITE_API_BASE_URL as string | undefined;
    return (v || "").trim().replace(/\/+$/, "");
  }, []);

  const [data, setData] = useState<NewsDetail | null>(null);
  const [latest, setLatest] = useState<NewsListItem[]>([]);
  const [archives, setArchives] = useState<ArchiveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const endpoints = useMemo(() => {
    const safeId = encodeURIComponent(id ?? "");
    return {
      detail: API_BASE ? `${API_BASE}/news/${safeId}` : "",
      list: API_BASE ? `${API_BASE}/news` : "",
    };
  }, [API_BASE, id]);

  useEffect(() => {
    if (!id) return;

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
        // 1) Detail
        const res = await fetch(endpoints.detail, { signal: controller.signal });
        if (res.status === 404) {
          if (!cancelled) setData(null);
          return;
        }
        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }

        const json = (await res.json()) as NewsDetail;
        if (!cancelled) setData(json);

        // 2) List (för senaste + arkiv)
        const listRes = await fetch(endpoints.list, { signal: controller.signal });
        if (listRes.ok) {
          const listJson = (await listRes.json()) as NewsListItem[];
          const arr = Array.isArray(listJson) ? listJson : [];

          // Senaste (max 6, exkludera aktuell)
          const latestItems = arr
            .filter((n) => String(n.id) !== String(id))
            .slice(0, 6);

          // Arkiv per månad
          const map = new Map<string, number>();
          for (const n of arr) {
            const key = String(n.date || "").slice(0, 7); // YYYY-MM
            if (!/^\d{4}-\d{2}$/.test(key)) continue;
            map.set(key, (map.get(key) || 0) + 1);
          }

          const archiveItems: ArchiveItem[] = Array.from(map.entries())
            .sort((a, b) => (a[0] < b[0] ? 1 : -1))
            .map(([key, count]) => ({
              key,
              label: monthLabelSv(key),
              count,
            }));

          if (!cancelled) {
            setLatest(latestItems);
            setArchives(archiveItems);
          }
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || "Kunde inte hämta nyheten.");
          setData(null);
          setLatest([]);
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
  }, [API_BASE, endpoints.detail, endpoints.list, id]);

  if (loading) {
    return (
      <Box bg="white" py={{ base: 10, md: 16 }}>
        <Container maxW="6xl">
          <Stack align="center" py={20}>
            <Spinner size="lg" />
            <Text color="gray.600">Hämtar nyhet...</Text>
          </Stack>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box bg="white" py={{ base: 10, md: 16 }}>
        <Container maxW="6xl">
          <Heading size="lg">Något gick fel</Heading>
          <Text mt={2} color="gray.600">
            {error}
          </Text>
          <Text mt={6}>
            <Link as={RouterLink} to="/nyheter" color="#00887C" fontWeight="600">
              ← Tillbaka till nyheter
            </Link>
          </Text>
        </Container>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box bg="white" py={{ base: 10, md: 16 }}>
        <Container maxW="6xl">
          <Heading size="lg">Nyheten hittades inte</Heading>
          <Text mt={2} color="gray.600">
            Kontrollera att länken är korrekt.
          </Text>
          <Text mt={6}>
            <Link as={RouterLink} to="/nyheter" color="#00887C" fontWeight="600">
              ← Tillbaka till nyheter
            </Link>
          </Text>
        </Container>
      </Box>
    );
  }

  const categoryLabel = data.category || "Nyheter";

  return (
    <Box bg="white" py={{ base: 8, md: 14 }}>
      <Container maxW="6xl">
        <Breadcrumb fontSize="sm" color="gray.600" mb={6}>
          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/">
              Hem
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={RouterLink} to="/nyheter">
              {categoryLabel}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{data.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Layout: LEFT sidebar + article (Grevlunda-ish) */}
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", lg: "320px minmax(0, 1fr)" }}
          gap={{ base: 10, lg: 12 }}
          alignItems="start"
        >
          {/* LEFT sidebar */}
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
                <List spacing={2} mb={8}>
                  {archives.map((a) => (
                    <ListItem key={a.key}>
                      <Link
                        as={RouterLink}
                        to={`/nyheter?month=${encodeURIComponent(a.key)}`}
                        color="gray.800"
                        fontWeight="600"
                      >
                        {a.label}{" "}
                        <Text as="span" color="gray.500" fontWeight="500">
                          ({a.count})
                        </Text>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              )}

              <Divider my={6} />

              <Heading as="h3" fontSize="lg" mb={4}>
                Senaste inläggen
              </Heading>

              {latest.length === 0 ? (
                <Text color="gray.600" fontSize="sm">
                  Inga inlägg att visa ännu.
                </Text>
              ) : (
                <List spacing={3}>
                  {latest.map((n) => (
                    <ListItem key={n.id}>
                      <Link
                        as={RouterLink}
                        to={`/nyheter/${n.id}`}
                        fontWeight="600"
                        color="gray.800"
                      >
                        {n.title}
                      </Link>
                      <Text fontSize="sm" color="gray.600">
                        {new Date(n.date).toLocaleDateString("sv-SE")}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Box>

          {/* Article */}
          <Box>
            <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontWeight="600" mb={3}>
              {data.title}
            </Heading>

            <HStack spacing={3} color="gray.600" fontSize="sm" mb={6}>
              <Text>{new Date(data.date).toLocaleDateString("sv-SE")}</Text>
              <Text>•</Text>
              <Text>{categoryLabel}</Text>
            </HStack>

            {data.excerpt && (
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.800"
                lineHeight="1.8"
                fontWeight="600"
                mb={6}
              >
                {data.excerpt}
              </Text>
            )}

            <Divider mb={8} />

            <Text
              color="gray.700"
              fontSize={{ base: "md", md: "lg" }}
              lineHeight="1.9"
              whiteSpace="pre-line"
            >
              {data.body}
            </Text>

            {data.image_url && (
              <Box mt={10}>
                <Image
                  src={data.image_url}
                  alt={data.title}
                  borderRadius="xl"
                  w="100%"
                  maxH={{ base: "280px", md: "420px" }}
                  objectFit="cover"
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
