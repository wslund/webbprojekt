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
    </Box>
  );
};
