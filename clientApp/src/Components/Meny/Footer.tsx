import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="primary"
      color="textColor"
      textAlign="center"
      padding="1rem"
      position="relative"
      bottom="0"
      width="100%"
    >
      <Text>
        &copy; {new Date().getFullYear()} Ditt Företagsnamn. Alla rättigheter
        förbehållna.
      </Text>
    </Box>
  );
};

export default Footer;
