import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

interface Props {
  tag: string;
  title: string;
  subtitle?: string;
  light?: boolean; // true = white text (for dark backgrounds)
}

export const SectionHeader: React.FC<Props> = ({ tag, title, subtitle, light }) => (
  <Box textAlign="center" mb={{ base: 10, md: 14 }}>
    <Text
      fontSize="0.7rem"
      fontWeight={600}
      letterSpacing="0.2em"
      textTransform="uppercase"
      color="brand.warm"
      mb={3}
    >
      {tag}
    </Text>
    <Heading
      as="h2"
      fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
      fontWeight={300}
      lineHeight={1.15}
      color={light ? "white" : "brand.dark"}
    >
      {title}
    </Heading>
    {subtitle && (
      <Text
        mt={4}
        fontSize="md"
        color={light ? "whiteAlpha.700" : "brand.muted"}
        maxW="540px"
        mx="auto"
        lineHeight={1.7}
      >
        {subtitle}
      </Text>
    )}
  </Box>
);
