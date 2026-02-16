<<<<<<< HEAD
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

      {/* Scroll indicator */}
      <Flex
        display={{ base: "none", md: "flex" }}
        position="absolute"
        bottom={10}
        left="50%"
        transform="translateX(-50%)"
        direction="column"
        align="center"
        gap={2}
        color="whiteAlpha.600"
        animation="scrollBounce 2s infinite"
      >
        <Text fontSize="0.65rem" letterSpacing="0.15em" textTransform="uppercase">
          Scrolla
        </Text>
        <Box w="1px" h="40px" bgGradient="linear(to-b, whiteAlpha.600, transparent)" />
      </Flex>
=======
// src/components/HeroCarousel.tsx
import React, { useEffect, useState } from "react";
import { Box, Container, Flex, Heading, Text, HStack, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import foalImg from "../../public/assets/foal.jpg";

type Slide = {
  title: string;
  subtitle: string;
  ctaPrimary?: { label: string; to: string };
  ctaSecondary?: { label: string; to: string };
  imageUrl: string;
};

const slides: Slide[] = [
  {
    title: "Uppfödning med fokus på hållbarhet.",
    subtitle:
      "Vi föder upp hästar i lugn miljö med fokus på temperament, hälsa och långsiktig kapacitet.",
    ctaPrimary: { label: "Läs mer om oss", to: "/om-oss" },
    ctaSecondary: { label: "Se hästar i stallet", to: "/hastar" },
    imageUrl: foalImg,
  },
  {
    title: "Travsport med hästen i centrum.",
    subtitle:
      "Strukturerad träning, tydliga mål och stor respekt för individen – från första jobb till tävlingsdag.",
    ctaPrimary: { label: "Kontakta oss om samarbeten", to: "/kontakt" },
    imageUrl:
      "https://images.pexels.com/photos/979952/pexels-photo-979952.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "En gård att trivas på.",
    subtitle:
      "Kuperade hagar, närhet till banor och en vardag där hästar och människor får utrymme att må bra.",
    ctaPrimary: { label: "Boka ett besök", to: "/kontakt" },
    imageUrl:
      "https://images.pexels.com/photos/1996336/pexels-photo-1996336.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 6500);
    return () => clearInterval(id);
  }, []);

  const slide = slides[current];

  return (
    <Box id="hero" as="section" bg="white">
      <Box
        position="relative"
        minH={{ base: "60vh", md: "65vh" }}
        backgroundImage={`url(${slide.imageUrl})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        transition="background-image 0.8s ease-out"
      >
        <Box position="absolute" inset={0} bgGradient="linear(to-b, blackAlpha.700, blackAlpha.400)" />

        <Container maxW="6xl" position="relative" h="100%">
          <Flex
            direction="column"
            justify="flex-end"
            align={{ base: "flex-start", md: "center" }}
            h="100%"
            pt="72px"
            pb={{ base: 10, md: 20 }}
            color="white"
          >
            <Box maxW="2xl" textAlign={{ base: "left", md: "center" }} mx={{ base: 0, md: "auto" }}>
              <Heading
                as="h1"
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="500"
                mb={4}
              >
                {slide.title}
              </Heading>
              <Text fontSize={{ base: "sm", md: "md" }} mb={6} opacity={0.9}>
                {slide.subtitle}
              </Text>

              <HStack spacing={4} justify={{ base: "flex-start", md: "center" }} flexWrap="wrap">
                {slide.ctaPrimary && (
                  <Button
                    as={RouterLink}
                    to={slide.ctaPrimary.to}
                    size="md"
                    bg="white"
                    color="gray.900"
                    _hover={{ bg: "gray.100" }}
                  >
                    {slide.ctaPrimary.label}
                  </Button>
                )}

                {slide.ctaSecondary && (
                  <Button
                    as={RouterLink}
                    to={slide.ctaSecondary.to}
                    size="md"
                    variant="outline"
                    borderColor="whiteAlpha.900"
                    color="white"
                    _hover={{ bg: "whiteAlpha.200" }}
                  >
                    {slide.ctaSecondary.label}
                  </Button>
                )}
              </HStack>
            </Box>
          </Flex>
        </Container>
      </Box>

      <HStack spacing={2} justify="center" py={4}>
        {slides.map((_, i) => (
          <Box
            key={i}
            w={i === current ? 5 : 2}
            h={2}
            borderRadius="full"
            bg={i === current ? "gray.900" : "gray.400"}
            cursor="pointer"
            transition="all 0.3s ease"
            onClick={() => setCurrent(i)}
          />
        ))}
      </HStack>
>>>>>>> 4cb1f7897da9269ffd330b607274bcd2f83dec90
    </Box>
  );
};
