import React, { useState, useMemo } from "react";
import {
  Box, Button, Container, FormControl, FormLabel, Heading, Input,
  SimpleGrid, Text, Textarea, useToast, VStack,
} from "@chakra-ui/react";
import { PageHero } from "../components/PageHero";
import { Reveal } from "../components/Reveal";
import { api } from "../api";

const CONTACT_EMAIL = "info@stallbacken.se";
const FARM_ADDRESS = "Stall Backen"

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const toast = useToast();

  const onChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await api.sendContact(form);
      toast({
        title: "Meddelande skickat!",
        description: "Tack för ditt meddelande. Vi återkommer så snart vi kan.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      toast({
        title: "Något gick fel",
        description: err.message || "Försök igen senare.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSending(false);
    }
  };

  const mapSrc = useMemo(() => "https://www.google.com/maps?q=58.22956527425997,12.778832305293115&z=13&output=embed", []);

  return (
    <>
      <PageHero
        tag="Kontakt" title="Hör av dig"
        subtitle="Frågor om hästar, samarbeten eller besök? Skicka ett meddelande så återkommer vi."
        imageUrl="https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1920&q=80"
      />

      <Box py={{ base: 16, md: 24 }}>
        <Container maxW="6xl">
          <Reveal>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} bg="white" border="1px solid" borderColor="gray.200" borderRadius="2xl" p={{ base: 6, md: 10 }} mb={12}>
              {[
                { label: "E-post", value: CONTACT_EMAIL },
                { label: "Telefon", value: "070-000 00 00" },
                { label: "Besöksadress", value: FARM_ADDRESS },
              ].map((d) => (
                <Box key={d.label}>
                  <Text fontSize="0.7rem" fontWeight={600} letterSpacing="0.18em" textTransform="uppercase" color="brand.olive" mb={1}>{d.label}</Text>
                  <Text fontSize="sm" color="brand.text" lineHeight={1.6}>{d.value}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Reveal>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 8, md: 10 }} alignItems="start">
            <Reveal direction="left">
              <Box bg="white" border="1px solid" borderColor="gray.200" borderRadius="2xl" p={{ base: 6, md: 10 }}>
                <Heading fontWeight={400} fontSize="xl" mb={2}>Skicka ett meddelande</Heading>
                <Text fontSize="sm" color="brand.muted" mb={8} lineHeight={1.6}>
                  Fyll i formuläret nedan så hör vi av oss.
                </Text>

                <Box as="form" onSubmit={handleSubmit}>
                  <VStack spacing={5}>
                    <FormControl isRequired>
                      <FormLabel >Namn</FormLabel>
                      <Input value={form.name} onChange={onChange("name")} placeholder="Ditt namn" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel >E-post</FormLabel>
                      <Input type="email" value={form.email} onChange={onChange("email")} placeholder="namn@exempel.se" />
                    </FormControl>
                    <FormControl>
                      <FormLabel >Ämne</FormLabel>
                      <Input value={form.subject} onChange={onChange("subject")} placeholder="Ex. Samarbete / Besök" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel >Meddelande</FormLabel>
                      <Textarea value={form.message} onChange={onChange("message")} placeholder="Skriv ditt meddelande här..." rows={6} />
                    </FormControl>
                    <Button type="submit" variant="brandDark" w="100%" justifyContent="center" isLoading={sending} loadingText="Skickar...">
                      Skicka meddelande
                    </Button>
                  </VStack>
                </Box>
              </Box>
            </Reveal>

            <Reveal direction="right">
              <Box bg="white" border="1px solid" borderColor="gray.200" borderRadius="2xl" overflow="hidden">
                <Box px={{ base: 6, md: 10 }} pt={{ base: 6, md: 8 }} pb={4}>
                  <Heading fontWeight={400} fontSize="xl" mb={2}>Hitta hit</Heading>
                  <Text fontSize="sm" color="brand.muted">{FARM_ADDRESS}</Text>
                </Box>
                <Box borderTop="1px solid" borderColor="gray.200" h={{ base: "280px", md: "360px" }}>
                  <Box as="iframe" title="Google Maps" src={mapSrc} w="100%" h="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade" border={0} />
                </Box>
              </Box>
            </Reveal>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};
