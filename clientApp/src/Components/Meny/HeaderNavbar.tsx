import React from "react";
import { Box, Flex, IconButton, Image, Text } from "@chakra-ui/react";

const MainNavbar = () => {
  return (
    <Box bg="teal.500" color="white" padding="1rem" width="100%">
      <Flex align="center">
        {/* Vänster ikon */}
        <Text fontSize="xl" fontWeight="bold">
          test
        </Text>

        <Flex marginLeft="auto">
          {/* Höger länkar */}
          <IconButton
            as="a"
            href="https://www.instagram.com"
            target="_blank"
            aria-label="Instagram"
            variant="ghost"
            colorScheme="whiteAlpha"
          />
          <IconButton
            as="a"
            href="https://www.facebook.com"
            target="_blank"
            aria-label="Facebook"
            variant="ghost"
            colorScheme="whiteAlpha"
          />
        </Flex>
      </Flex>

      {/* Bild under navbar */}
      <Image alt="Banner" objectFit="cover" width="100%" marginTop="1rem" />
    </Box>
  );
};

export default MainNavbar;
