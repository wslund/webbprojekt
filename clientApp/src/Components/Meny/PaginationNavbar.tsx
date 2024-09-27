import React from "react";
import { Box, Flex, Link, Spacer } from "@chakra-ui/react";

const PaginationNavbar = () => {
  return (
    <Box bg="gray.200" padding="1rem" width="100%">
      <Flex>
        <Link href="/" marginRight="2">
          Hem
        </Link>
        <Link href="/about" marginRight="2">
          Om
        </Link>
        <Link href="/contact" marginRight="2">
          Kontakt
        </Link>
        {/* Lägg till fler länkar vid behov */}
        <Spacer />
      </Flex>
    </Box>
  );
};

export default PaginationNavbar;
