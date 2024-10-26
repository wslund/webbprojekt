import { Box, Flex, IconButton, Image, Stack, Text } from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const MainNavbar = () => {
  return (
    <Stack spacing={0} margin="0" padding="0" position="relative">
      <Box bg="black" color="white" padding="0.5rem" width="100%">
        <Flex align="center">
          <Text fontSize="xl" fontWeight="bold">
            test
          </Text>
          <Flex marginLeft="auto" gap="1rem">
            <IconButton
              as="a"
              href="https://www.instagram.com"
              target="_blank"
              aria-label="Instagram"
              icon={<FaInstagram size="100%" color="#E1306C" />}
              size="lg"
              variant="ghost"
            />
            <IconButton
              as="a"
              href="https://www.facebook.com"
              target="_blank"
              aria-label="Facebook"
              icon={<FaFacebook size="100%" color="#1877F2" />}
              size="lg"
              variant="ghost"
            />
          </Flex>
        </Flex>
      </Box>
      <Image
        alt="Banner"
        src="https://images.unsplash.com/photo-1517511620798-cec17d428bc0"
        objectFit="cover"
        width="100%"
        height={"350px"}
        margin="0"
        padding="0"
        position="relative"
      />
    </Stack>
  );
};

export default MainNavbar;
