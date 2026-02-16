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
  );
};
