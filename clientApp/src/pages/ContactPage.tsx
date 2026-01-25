// src/pages/ContactPage.tsx
import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  HStack,
  Divider,
} from "@chakra-ui/react";

import contactImg from "../../public/assets/foal.jpg";

export const ContactPage = () => {
  const CONTACT_EMAIL = "info@stallexempelgarden.se";
  const farmAddress = "Exempelgården, Exempelby, Sverige";

  const mapSrc = useMemo(() => {
    const q = encodeURIComponent(farmAddress);
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }, [farmAddress]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleMailto = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = form.subject?.trim() || "Kontakt via hemsidan";
    const body = [
      `Namn: ${form.name || "-"}`,
      `E-post: ${form.email || "-"}`,
      "",
      form.message || "",
    ].join("\n");

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  return (
    <Box bg="white">
      <Box
        position="relative"
        minH={{ base: "60vh", md: "65vh" }}
        backgroundImage={`url(${contactImg})`}
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
              Kontakt
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="500"
              mb={3}
            >
              Hör av dig
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }} opacity={0.9}>
              Frågor om hästar, samarbeten eller besök? Skicka ett meddelande så
              återkommer vi.
            </Text>
          </Box>
        </Container>
      </Box>


      <Box pt={12} pb={16} bg="gray.50">
        <Container maxW="6xl">

          <Box
            bg="white"
            borderRadius="2xl"
            border="1px solid"
            borderColor="gray.200"
            p={{ base: 5, md: 6 }}
            mb={12}
          >
            <Heading
              as="h3"
              fontSize="sm"
              textTransform="uppercase"
              letterSpacing="0.14em"
              mb={3}
            >
              Kontaktuppgifter
            </Heading>

            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={6}
              fontSize="sm"
              color="gray.700"
            >
              <Box>
                <Text fontWeight="600" mb={1}>
                  E-post
                </Text>
                <Text>{CONTACT_EMAIL}</Text>
              </Box>

              <Box>
                <Text fontWeight="600" mb={1}>
                  Telefon
                </Text>
                <Text>070-000 00 00</Text>
              </Box>

              <Box>
                <Text fontWeight="600" mb={1}>
                  Besök
                </Text>
                <Text>{farmAddress}</Text>
              </Box>
            </SimpleGrid>

            <Text fontSize="xs" color="gray.500" mt={4}>
              Vill du boka besök? Skriv gärna vilka datum som passar, så hittar
              vi en tid.
            </Text>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>

            <Box
              bg="white"
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.200"
              p={{ base: 5, md: 6 }}
            >
              <Heading as="h2" fontSize="xl" fontWeight="600" mb={2}>
                Skicka ett meddelande
              </Heading>
              <Text fontSize="sm" color="gray.600" mb={6}>
                Fyll i formuläret så öppnas ditt e-postprogram med ett färdigt
                meddelande.
              </Text>

              <Box as="form" onSubmit={handleMailto}>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel fontSize="sm">Namn</FormLabel>
                    <Input
                      value={form.name}
                      onChange={onChange("name")}
                      placeholder="Ditt namn"
                      bg="white"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontSize="sm">E-post</FormLabel>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={onChange("email")}
                      placeholder="namn@exempel.se"
                      bg="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontSize="sm">Ämne</FormLabel>
                    <Input
                      value={form.subject}
                      onChange={onChange("subject")}
                      placeholder="Ex. Delägarskap / Besök / Samarbete"
                      bg="white"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize="sm">Meddelande</FormLabel>
                    <Textarea
                      value={form.message}
                      onChange={onChange("message")}
                      placeholder="Skriv ditt meddelande här..."
                      rows={6}
                      bg="white"
                    />
                  </FormControl>

                  <HStack justify="space-between" pt={2}>
                    <Button
                      type="submit"
                      rounded="full"
                      bg="gray.900"
                      color="white"
                      _hover={{ opacity: 0.9 }}
                    >
                      Skicka
                    </Button>
                    <Text fontSize="xs" color="gray.500">
                      E-post: {CONTACT_EMAIL}
                    </Text>
                  </HStack>
                </Stack>
              </Box>
            </Box>


            <Box
              bg="white"
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.200"
              overflow="hidden"
            >
              <Box px={{ base: 5, md: 6 }} pt={{ base: 5, md: 6 }} pb={4}>
                <Heading as="h2" fontSize="xl" fontWeight="600" mb={2}>
                  Hitta hit
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  {farmAddress}
                </Text>
              </Box>
              <Divider />
              <Box w="100%" h={{ base: "280px", md: "360px" }}>
                <Box
                  as="iframe"
                  title="Google Maps"
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  border={0}
                />
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>
    </Box>
  );
};
