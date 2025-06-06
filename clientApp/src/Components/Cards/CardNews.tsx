import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string | null;
  showPicture: boolean;
}

const CardNews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    document.title = "Stall Backen | Nyheter";
  }, []);

  useEffect(() => {
    fetch(`http://localhost/PHP_Backend/get_news.php?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data.news);
        setTotalPages(data.totalPages || 1);
      })
      .catch((error) => console.error("Fel vid hämtning av nyheter:", error));
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Stack
      spacing={8}
      padding={{ base: "1rem", md: "2rem" }}
      bg="background"
      minHeight="100vh"
    >
      <Heading as="h1" size="xl" textAlign="center" color="textColor" mb={8}>
        Nyheter
      </Heading>

      <Flex
        direction="column"
        align="center"
        justify="center"
        width="100%"
        maxWidth="1200px"
        margin="0 auto"
        gap={8}
      >
        {newsData.map((item) => (
          <Stack
            key={item.id}
            spacing={4}
            bg="secondary"
            boxShadow="md"
            border="1px solid"
            borderColor="primary"
            borderRadius="md"
            overflow="hidden"
            padding="1rem"
            width="100%"
            maxWidth="700px"
            textAlign="center"
          >
            {item.showPicture && item.image && (
              <Image
                src={item.image}
                alt={item.title}
                objectFit="cover"
                width="100%"
                height="200px"
                border="1px solid"
                borderColor="primary"
                borderRadius="md"
                mb={4}
                onError={() =>
                  console.error(`Kunde inte ladda bild: ${item.image}`)
                }
              />
            )}

            <Box>
              <Heading
                as="h3"
                size="md"
                marginBottom="0.5rem"
                color="textColor"
              >
                {item.title}
              </Heading>
              <Text
                fontSize="sm"
                color="textColor"
                opacity={0.7}
                marginBottom="0.5rem"
              >
                {new Date(item.date).toLocaleDateString("sv-SE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
              <Text fontSize="sm" color="textColor">
                {item.content}
              </Text>
            </Box>
          </Stack>
        ))}
      </Flex>

      <Flex justify="center" mt={8} gap={4}>
        <Button
          onClick={handlePrevPage}
          isDisabled={currentPage === 1}
          variant="solid"
        >
          Föregående
        </Button>
        <Text alignSelf="center" color="textColor">
          Sida {currentPage} av {totalPages}
        </Text>
        <Button
          onClick={handleNextPage}
          isDisabled={currentPage === totalPages}
          variant="solid"
        >
          Nästa
        </Button>
      </Flex>
    </Stack>
  );
};

export default CardNews;
