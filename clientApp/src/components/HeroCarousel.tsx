import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Container, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { heroSlides } from "../data/siteData";

export const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((n: number) => {
    setCurrent(n);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const id = setInterval(() => goTo((current + 1) % heroSlides.length), 6500);
    return () => clearInterval(id);
  }, [current, goTo]);

  const slide = heroSlides[current];

  return (
    <Box as="section" position="relative" h="100vh" minH="600px" overflow="hidden">
      {/* Slides */}
      {heroSlides.map((s, i) => (
        <Box key={i} position="absolute" inset={0} opacity={i === current ? 1 : 0} transition="opacity 1.2s ease">
          <Box
            as="img"
            key={i === current ? animKey : `static-${i}`}
            src={s.imageUrl}
            alt=""
            w="100%"
            h="100%"
            objectFit="cover"
            animation={i === current ? "heroZoom 8s ease forwards" : "none"}
            transform="scale(1.05)"
          />
          <Box position="absolute" inset={0} bgGradient="linear(to-b, blackAlpha.400, blackAlpha.200 40%, blackAlpha.600)" />
        </Box>
      ))}

      {/* Content */}
      <Box position="absolute" bottom={0} left={0} right={0} pb={{ base: 12, md: "8vh" }}>
        <Container maxW="6xl">
          <Text
            fontSize="0.7rem"
            fontWeight={600}
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="brand.warm"
            mb={4}
            opacity={0}
            transform="translateY(15px)"
            animation="fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s forwards"
          >
            Hästuppfödning &amp; Travsport
          </Text>

          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
            fontWeight={300}
            lineHeight={1.05}
            color="white"
            maxW="800px"
            opacity={0}
            transform="translateY(20px)"
            animation="fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.5s forwards"
          >
            {slide.title}
          </Heading>

          <Text
            fontSize={{ base: "sm", md: "md" }}
            fontWeight={300}
            color="whiteAlpha.800"
            maxW="520px"
            mt={6}
            lineHeight={1.7}
            opacity={0}
            transform="translateY(15px)"
            animation="fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s forwards"
          >
            {slide.subtitle}
          </Text>

          <HStack
            spacing={4}
            mt={10}
            flexWrap="wrap"
            opacity={0}
            transform="translateY(15px)"
            animation="fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.9s forwards"
          >
            {slide.ctaPrimary && (
              <Button as={RouterLink} to={slide.ctaPrimary.to} variant="brand">
                {slide.ctaPrimary.label}
              </Button>
            )}
            {slide.ctaSecondary && (
              <Button as={RouterLink} to={slide.ctaSecondary.to} variant="brandOutline">
                {slide.ctaSecondary.label}
              </Button>
            )}
          </HStack>
        </Container>
      </Box>

      {/* Dots */}
      <HStack position="absolute" bottom={{ base: 6, md: 10 }} right={{ base: 5, md: 10 }} spacing={2} zIndex={10}>
        {heroSlides.map((_, i) => (
          <Box
            key={i}
            w={i === current ? "10px" : "8px"}
            h="8px"
            borderRadius="full"
            bg={i === current ? "white" : "whiteAlpha.300"}
            cursor="pointer"
            transition="all 0.4s cubic-bezier(0.16,1,0.3,1)"
            transform={i === current ? "scale(1.3)" : "scale(1)"}
            onClick={() => goTo(i)}
          />
        ))}
      </HStack>  
    </Box>
  );
};
