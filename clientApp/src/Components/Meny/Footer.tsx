import { Box, Text, BoxProps } from "@chakra-ui/react";

const Footer: React.FC<BoxProps> = (props) => {
  return (
    <Box
      as="footer"
      bg="primary"
      color="menyText"
      textAlign="center"
      padding={{ base: "1.5rem", md: "2rem" }}
      position="relative"
      bottom="0"
      width="100%"
      borderTop="1px solid"
      borderColor="primary"
      {...props}
    >
      <Text fontSize="sm">
        © {new Date().getFullYear()} Stall Backen. Alla rättigheter
        förbehållna.
      </Text>
    </Box>
  );
};

export default Footer;
