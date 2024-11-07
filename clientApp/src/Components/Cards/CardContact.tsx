import React from "react";
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
} from "@chakra-ui/react";
import horse from "../../assets/häst.jpg";

const CardContact = () => {
  return (
    <Box p={8} display="flex" justifyContent="center" backgroundColor={"white"}>
      <Box maxW="1200px" w="100%">
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={8}
          alignItems="center"
          margin="0 auto"
        >
          <Box px={{ base: 2, lg: 4 }}>
            <Heading size="lg" mb={2}>
              Vill du veta mer om [Företags namn]?
            </Heading>
            <Text fontWeight="bold" mb={3}>
              Kontakta oss så hjälper vi dig!
            </Text>
            <Link href="test@test.test" display="block">
              test@test.test
            </Link>
            <Text mb={3}>Mobil: +46 000 10 10 10</Text>
            <Text mt={2} fontWeight="bold">
              Adress:
            </Text>
            <Text mt={1}>vägen 1</Text>
            <Text>test postnummer</Text>
            <Text>test land</Text>
          </Box>
          <Box maxWidth="600px" w="100%" px={{ base: 2, lg: 4 }}>
            <Image
              src={horse}
              alt="Bild av Grevlundagården"
              borderRadius="md"
              w="100%"
              h="auto"
              objectFit="cover"
            />

            <Box mt={4} textAlign="center">
              <Text fontWeight="bold" fontSize="lg">
                Lucky luke
              </Text>
              <Text fontSize="sm" color="gray.600">
                Ägare och ryttare
              </Text>
            </Box>
          </Box>
        </Grid>
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={8}
          rowGap={10}
          mt={10}
          margin="0 auto"
        >
          <Box
            maxWidth="550px"
            w="100%"
            px={{ base: 2, lg: 4 }}
            marginTop={{ base: 8, lg: 16 }}
          >
            <Heading size="md" mb={4}>
              Kontakta oss via formuläret
            </Heading>
            <form>
              <FormControl id="name" isRequired mb={4}>
                <FormLabel>Namn</FormLabel>
                <Input placeholder="Ditt namn" />
              </FormControl>
              <FormControl id="email" isRequired mb={4}>
                <FormLabel>E-post</FormLabel>
                <Input type="email" placeholder="Din e-postadress" />
              </FormControl>
              <FormControl id="message" isRequired mb={4}>
                <FormLabel>Meddelande</FormLabel>
                <Textarea placeholder="Ditt meddelande" />
              </FormControl>
              <Button type="submit" colorScheme="teal" mt={4} bg={"#2D0400"}>
                Skicka
              </Button>
            </form>
          </Box>
          <Box
            maxWidth="550px"
            w="100%"
            px={{ base: 2, lg: 4 }}
            marginTop={{ base: 8, lg: 16 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1256.8706540184032!2d12.77803742998315!3d58.229513703608696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTjCsDEzJzQ2LjIiTiAxMsKwNDYnNDMuOCJF!5e1!3m2!1ssv!2sse!4v1731021139340!5m2!1ssv!2sse"
              width="600"
              height="450"
              loading="lazy"
            ></iframe>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default CardContact;
