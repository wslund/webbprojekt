import React from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

interface Props {
  tag: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
}

export const PageHero: React.FC<Props> = ({ tag, title, subtitle, imageUrl }) => (
  <Box
    position="relative"
    minH={{ base: "60vh", md: "65vh" }}
    bgImage={`url(${imageUrl})`}
    bgSize="cover"
    bgPos="center"
    display="flex"
    alignItems="flex-end"
  >
    {/* Overlay */}
    <Box
      position="absolute"
      inset={0}
      bgGradient="linear(to-b, blackAlpha.400, blackAlpha.200 40%, blackAlpha.600)"
    />

    <Container maxW="6xl" position="relative" pb={{ base: 10, md: 14 }} pt="96px">
      <Box maxW="600px">
        <Text
          fontSize="0.7rem"
          fontWeight={600}
          letterSpacing="0.2em"
          textTransform="uppercase"
          color="brand.warm"
          mb={3}
        >
          {tag}
        </Text>
        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight={300}
          lineHeight={1.05}
          color="white"
          mb={4}
        >
          {title}
        </Heading>
        {subtitle && (
          <Text
            fontSize={{ base: "sm", md: "md" }}
            fontWeight={300}
            color="whiteAlpha.800"
            lineHeight={1.7}
          >
            {subtitle}
          </Text>
        )}
      </Box>
    </Container>
  </Box>
);
