import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import type { Horse } from "../api";

interface Props {
  horse: Horse;
  onClick: () => void;
}

export const HorseCard: React.FC<Props> = ({ horse, onClick }) => {
  const subtitle = [
    horse.age && `${horse.age} år`,
    horse.sex,
    horse.record ? `Rekord ${horse.record}` : horse.starts === 0 ? "Under uppträning" : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Box
      position="relative"
      borderRadius="xl"
      overflow="hidden"
      cursor="pointer"
      sx={{ aspectRatio: "3/4" }}
      role="group"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      _focusVisible={{ outline: "3px solid", outlineColor: "blue.300", outlineOffset: "2px" }}
    >
      <Image src={horse.image_url || ""} alt={horse.name} w="100%" h="100%" objectFit="cover"
        transition="transform 0.7s cubic-bezier(0.16,1,0.3,1)" _groupHover={{ transform: "scale(1.06)" }} />
      <Box position="absolute" inset={0} bgGradient="linear(to-t, blackAlpha.700, transparent 50%)"
        transition="background 0.5s" _groupHover={{ bgGradient: "linear(to-t, blackAlpha.800, blackAlpha.100 60%)" }} />
      <Box position="absolute" bottom={0} left={0} right={0} p={6}
        transform="translateY(10px)" transition="transform 0.5s cubic-bezier(0.16,1,0.3,1)" _groupHover={{ transform: "translateY(0)" }}>
        <Text fontSize="0.65rem" fontWeight={600} letterSpacing="0.18em" textTransform="uppercase" color="brand.warm" mb={1}>
          {horse.category}
        </Text>
        <Text fontFamily="heading" fontSize="2xl" fontWeight={400} color="white" mb={1}>{horse.name}</Text>
        <Text fontSize="sm" color="whiteAlpha.600" opacity={0} maxH={0} overflow="hidden"
          transition="all 0.5s cubic-bezier(0.16,1,0.3,1)" _groupHover={{ opacity: 1, maxH: "60px", mt: 2 }}>
          {subtitle}
        </Text>
      </Box>
      <Box position="absolute" top={5} right={5} w="36px" h="36px" borderRadius="full" bg="whiteAlpha.100"
        display="flex" alignItems="center" justifyContent="center" opacity={0} transform="translateY(6px)"
        transition="all 0.4s cubic-bezier(0.16,1,0.3,1)" _groupHover={{ opacity: 1, transform: "translateY(0)" }}>
        <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2"><path d="M4 12L12 4M12 4H5M12 4v7" /></svg>
      </Box>
    </Box>
  );
};
