
import React from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
};

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  imageUrl,
}) => {
  return (
    <Box
      position="relative"
      minH={{ base: "60vh", md: "65vh" }}
      backgroundImage={`url(${imageUrl})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(to-b, blackAlpha.700, blackAlpha.400)"
      />

      <Container maxW="6xl" position="relative" h="100%">
        <Box
          pt={{ base: "96px", md: "110px" }}
          pb={{ base: 10, md: 16 }}
          color="white"
          maxW="2xl"
        >
          <Text
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="0.18em"
            opacity={0.9}
            mb={2}
          >
            {eyebrow}
          </Text>

          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="500"
            mb={3}
          >
            {title}
          </Heading>

          {subtitle && (
            <Text fontSize={{ base: "sm", md: "md" }} opacity={0.9}>
              {subtitle}
            </Text>
          )}
        </Box>
      </Container>
    </Box>
  );
};
