import React, { useEffect, useState } from "react";
import {
  Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container,
  Heading, HStack, Image, Link as ChakraLink, List, ListItem,
  SimpleGrid, Spinner, Text, VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Reveal } from "../components/Reveal";
import { api } from "../api";
import type { NewsItem } from "../api";

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(false);

    Promise.all([
      api.getNewsBySlug(slug),
      api.getNews(),
    ])
      .then(([art, all]) => {
        setArticle(art);
        setAllNews(all);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <Box pt="calc(64px + 5rem)" pb={20} textAlign="center">
        <Spinner size="lg" color="brand.olive" />
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Box pt="calc(64px + 5rem)" pb={20} textAlign="center">
        <Container maxW="6xl">
          <Heading fontWeight={400} fontSize="2xl" mb={4}>Nyheten hittades inte</Heading>
          <Text color="brand.muted" mb={8}>Kontrollera att länken är korrekt.</Text>
          <Button as={RouterLink} to="/nyheter" variant="brandDark">Tillbaka till nyheter</Button>
        </Container>
      </Box>
    );
  }

  const otherNews = allNews.filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <Box as="article" pt="calc(64px + 3rem)" pb={{ base: 16, md: 24 }} bg="brand.bg">
      <Container maxW="6xl">
        <Breadcrumb fontSize="sm" color="brand.muted" mb={10} separator="/">
          <BreadcrumbItem><BreadcrumbLink as={RouterLink} to="/" _hover={{ color: "brand.olive" }}>Hem</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbItem><BreadcrumbLink as={RouterLink} to="/nyheter" _hover={{ color: "brand.olive" }}>Nyheter</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbItem isCurrentPage><BreadcrumbLink color="brand.text">{article.title}</BreadcrumbLink></BreadcrumbItem>
        </Breadcrumb>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 10, lg: 16 }} templateColumns={{ lg: "1fr 300px" }} alignItems="start">
          <Reveal>
            <Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} fontWeight={400} lineHeight={1.15} mb={4}>
              {article.title}
            </Heading>
            <HStack spacing={3} fontSize="sm" color="brand.muted" mb={8}>
              <Text>{new Date(article.published_at).toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" })}</Text>
              <Text>•</Text>
              <Text>Nyheter</Text>
            </HStack>

            {article.image_url && (
              <Box borderRadius="xl" overflow="hidden" mb={10}>
                <Image src={article.image_url} alt={article.title} w="100%" sx={{ aspectRatio: "16/9" }} objectFit="cover" />
              </Box>
            )}

            <VStack align="stretch" spacing={6}>
              {article.content.map((p, i) => (
                <Text key={i} fontSize={{ base: "md", md: "lg" }} lineHeight={1.85} color="brand.text">{p}</Text>
              ))}
            </VStack>
          </Reveal>

          <Reveal direction="right">
            <Box border="1px solid" borderColor="gray.200" borderRadius="xl" p={7} position={{ lg: "sticky" }} top={{ lg: "6rem" }}>
              <Heading fontWeight={400} fontSize="lg" mb={5}>Fler nyheter</Heading>
              {otherNews.length === 0 ? (
                <Text fontSize="sm" color="brand.muted">Inga fler nyheter att visa.</Text>
              ) : (
                <List spacing={4}>
                  {otherNews.map((n) => (
                    <ListItem key={n.id}>
                      <ChakraLink as={RouterLink} to={`/nyheter/${n.slug}`} display="block" _hover={{ color: "brand.olive", textDecoration: "none" }} transition="color 0.3s">
                        <Text fontWeight={600} fontSize="sm">{n.title}</Text>
                        <Text fontSize="xs" color="brand.muted">{new Date(n.published_at).toLocaleDateString("sv-SE")}</Text>
                      </ChakraLink>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Reveal>
        </SimpleGrid>
      </Container>
    </Box>
  );
};
