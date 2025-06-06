import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Heading,
  Text,
  Link,
  Image,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Stack,
} from "@chakra-ui/react";
import horse from "../../assets/häst.jpg";

const CardContact = () => {
  useEffect(() => {
    document.title = "Stall Backen | Kontakt";
  }, []);

  return (
    <Box
      p={{ base: 4, md: 8 }}
      display="flex"
      justifyContent="center"
      bg="background"
    >
      <Box maxW="1200px" w="100%">
        <Stack spacing={10}>
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={8}
            alignItems="start"
            justifyContent="center"
            margin="0 auto"
            bg="secondary"
            borderRadius="md"
            boxShadow="sm"
            p={{ base: 4, lg: 6 }}
          >
            <Box maxWidth="570px" w="100%" px={{ base: 2, lg: 4 }} mx="auto">
              <Heading size="lg" mb={2} color="textColor">
                Vill du veta mer om Stall Backen?
              </Heading>
              <Text fontWeight="bold" mb={3} color="textColor">
                Kontakta oss så hjälper vi dig!
              </Text>
              <Link
                href="mailto:test@test.test"
                display="block"
                color="textColor"
                _hover={{ color: "primary" }}
              >
                test@test.test
              </Link>
              <Text mb={3} color="textColor">
                Mobil: +46 000 10 10 10
              </Text>
              <Text mt={2} fontWeight="bold" color="textColor">
                Adress:
              </Text>
              <Text mt={1} color="textColor">
                Vägen 1
              </Text>
              <Text color="textColor">Test Postnummer</Text>
              <Text color="textColor">Test Land</Text>
            </Box>
            <Box maxWidth="570px" w="100%" px={{ base: 2, lg: 4 }} mx="auto">
              <Image
                src={horse}
                alt="Bild av Stall Backen"
                borderRadius="md"
                w="100%"
                h="auto"
                objectFit="cover"
                border="1px solid"
                borderColor="primary"
              />
              <Box mt={4} textAlign="center">
                <Text fontWeight="bold" fontSize="lg" color="textColor">
                  Lucky Luke
                </Text>
                <Text fontSize="sm" color="textColor" opacity={0.7}>
                  Ägare och ryttare
                </Text>
              </Box>
            </Box>
          </Grid>
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={8}
            rowGap={10}
            margin="0 auto"
            justifyContent="center"
            bg="secondary"
            borderRadius="md"
            boxShadow="sm"
            p={{ base: 4, lg: 6 }}
          >
            <Box
              maxWidth="570px"
              w="100%"
              px={{ base: 2, lg: 4 }}
              mx="auto"
              marginTop={{ base: 8, lg: 16 }}
            >
              <Heading size="md" mb={4} color="textColor">
                Kontakta oss via formuläret
              </Heading>
              <form>
                <FormControl id="name" isRequired mb={4}>
                  <FormLabel color="textColor">Namn</FormLabel>
                  <Input
                    placeholder="Ditt namn"
                    bg="background"
                    borderColor="primary"
                    color="textColor"
                    _hover={{ borderColor: "secondary" }}
                    _focus={{
                      borderColor: "primary",
                      boxShadow: "0 0 0 1px #2E4A2E",
                    }}
                  />
                </FormControl>
                <FormControl id="email" isRequired mb={4}>
                  <FormLabel color="textColor">E-post</FormLabel>
                  <Input
                    type="email"
                    placeholder="Din e-postadress"
                    bg="background"
                    borderColor="primary"
                    color="textColor"
                    _hover={{ borderColor: "secondary" }}
                    _focus={{
                      borderColor: "primary",
                      boxShadow: "0 0 0 1px #2E4A2E",
                    }}
                  />
                </FormControl>
                <FormControl id="message" isRequired mb={4}>
                  <FormLabel color="textColor">Meddelande</FormLabel>
                  <Textarea
                    placeholder="Ditt meddelande"
                    bg="background"
                    borderColor="primary"
                    color="textColor"
                    _hover={{ borderColor: "secondary" }}
                    _focus={{
                      borderColor: "primary",
                      boxShadow: "0 0 0 1px #2E4A2E",
                    }}
                  />
                </FormControl>
                <Button type="submit" variant="solid" mt={4}>
                  Skicka
                </Button>
              </form>
            </Box>
            <Box
              maxWidth="570px"
              w="100%"
              h={{ base: "300px", lg: "450px" }}
              px={{ base: 2, lg: 4 }}
              mx="auto"
              marginTop={{ base: 8, lg: 16 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1256.8706540184032!2d12.77803742998315!3d58.229513703608696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTjCsDEzJzQ2LjIiNiAxMsKwNDYnNDMuOCJF!5e1!3m2!1ssv!2sse!4v1731021139340!5m2!1ssv!2sse"
                style={{ width: "100%", height: "100%", border: 0 }}
                loading="lazy"
              ></iframe>
            </Box>
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
};

export default CardContact;
