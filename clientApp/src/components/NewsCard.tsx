import React from "react";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import type { NewsItem } from "../api";

interface Props {
  item: NewsItem;
}

export const NewsCard: React.FC<Props> = ({ item }) => (
  <Box
    as={Link}
    to={`/nyheter/${item.slug}`}
    display="block"
    bg="white"
    borderRadius="xl"
    overflow="hidden"
    transition="all 0.5s cubic-bezier(0.16,1,0.3,1)"
    _hover={{ transform: "translateY(-6px)", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}
    role="group"
  >
    {/* Image */}
    <Box overflow="hidden" sx={{ aspectRatio: "16/10" }}>
      <Image
        src={item.image_url || ""}
        alt={item.title}
        w="100%"
        h="100%"
        objectFit="cover"
        transition="transform 0.7s cubic-bezier(0.16,1,0.3,1)"
        _groupHover={{ transform: "scale(1.05)" }}
      />
    </Box>

    {/* Body */}
    <Box p={7}>
      <Text
        fontSize="0.7rem"
        fontWeight={600}
        letterSpacing="0.14em"
        textTransform="uppercase"
        color="brand.muted"
        mb={3}
      >
        {new Date(item.published_at).toLocaleDateString("sv-SE", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Text>

      <Heading
        as="h3"
        fontWeight={400}
        fontSize="xl"
        lineHeight={1.3}
        color="brand.dark"
        mb={3}
      >
        {item.title}
      </Heading>

      <Text fontSize="sm" color="brand.muted" lineHeight={1.65}>
        {item.excerpt}
      </Text>

      <Text
        mt={5}
        fontSize="0.8rem"
        fontWeight={600}
        letterSpacing="0.08em"
        textTransform="uppercase"
        color="brand.olive"
        transition="letter-spacing 0.3s"
        _groupHover={{ letterSpacing: "0.14em" }}
      >
        Läs mer →
      </Text>
    </Box>
  </Box>
);
