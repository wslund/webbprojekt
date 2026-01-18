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
  Link,
  List,
  ListItem,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";

type NewsDetail = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category?: string; // t.ex. "Okategoriserad"
  contentHtml?: string; // om du vill skicka HTML från PHP
  contentText?: string; // alternativt plain text
};

type LatestItem = {
  id: string;
  title: string;
  date: string;
};

export const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<NewsDetail | null>(null);
  const [latest, setLatest] = useState<LatestItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Byt dessa när backend finns
  const endpoints = useMemo(() => {
    const encoded = encodeURIComponent(id ?? "");
    return {
      detail: `/api/news.php?id=${encoded}`,
      latest: `/api/news-latest.php`, // valfri endpoint (kan byggas senare)
    };
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const load = async () => {
      setLoading(true);

      try {
        // 1) Hämta nyheten
        const res = await fetch(endpoints.detail, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as NewsDetail;
        setData(json);

        // 2) (Valfritt) Hämta senaste inläggen till sidokolumn
        // Om endpointen inte finns än, ignorerar vi bara felet.
        try {
          const latestRes = await fetch(endpoints.latest, {
            signal: controller.signal,
          });
          if (latestRes.ok) {
            const latestJson = (await latestRes.json()) as LatestItem[];
            setLatest(latestJson);
          }
        } catch {
          // ignore
        }
      } catch {
        // Backend inte klar ännu: visa en snygg fallback så du kan jobba vidare
        setData({
          id,
          title: `Nyhet #${id}`,
          date: "2026-01-10",
          category: "Nyheter",
          contentText:
            "Här kommer nyhetsinnehållet att hämtas från din PHP-backend (t.ex. /api/news.php?id=...). När backend är klar ersätter du fallbacken med riktigt data.",
        });

        setLatest([
          { id: "1", title: "Nya föl på gården", date: "2026-01-10" },
          {
            id: "2",
            title: "Träningsuppdatering inför säsongen",
            date: "2025-12-20",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, [id, endpoints.detail, endpoints.latest]);

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

  if (!data) {
    return (
      <Box bg="white" py={{ base: 10, md: 16 }}>
        <Container maxW="6xl">
          <Heading size="lg">Nyheten hittades inte</Heading>
          <Text mt={2} color="gray.600">
            Kontrollera att länken är korrekt.
          </Text>
        </Container>
      </Box>
    );
  }

  const categoryLabel = data.category ?? "Nyheter";

  return (
    <Box bg="white" py={{ base: 8, md: 14 }}>
      <Container maxW="6xl">
        {/* Brödsmulor (Grevlunda-liknande) */}
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

        {/* Layout: artikel + sidebar */}
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", lg: "minmax(0, 1fr) 320px" }}
          gap={{ base: 10, lg: 12 }}
          alignItems="start"
        >
          {/* Artikel */}
          <Box>
            <Heading as="h1" size="xl" fontWeight="600" mb={3}>
              {data.title}
            </Heading>

            <HStack spacing={3} color="gray.600" fontSize="sm" mb={6}>
              <Text>
                {new Date(data.date).toLocaleDateString("sv-SE")}
              </Text>
              <Text>•</Text>
              <Text>{categoryLabel}</Text>
            </HStack>

            <Divider mb={8} />

            {/* Innehåll: välj HTML eller text */}
            {data.contentHtml ? (
              <Box
                className="news-content"
                color="gray.700"
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="1.8"
                // OBS: Om du kör HTML från backend, se till att sanera på serversidan.
                dangerouslySetInnerHTML={{ __html: data.contentHtml }}
              />
            ) : (
              <Text
                color="gray.700"
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="1.8"
                whiteSpace="pre-line"
              >
                {data.contentText ?? ""}
              </Text>
            )}
          </Box>

          {/* Sidebar: senaste inläggen (som på Grevlunda) */}
          <Box>
            <Box
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="xl"
              p={6}
              position={{ lg: "sticky" }}
              top={{ lg: 24 }}
            >
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
        </Box>
      </Container>
    </Box>
  );
};
