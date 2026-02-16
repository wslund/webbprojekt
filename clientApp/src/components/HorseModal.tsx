import React from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter,
  Badge, Box, Button, Divider, Heading, HStack, Image, Text, VStack,
} from "@chakra-ui/react";
import type { Horse } from "../api";

interface Props {
  horse: Horse | null;
  isOpen: boolean;
  onClose: () => void;
}

const StatRow: React.FC<{ label: string; value?: string | null }> = ({ label, value }) => (
  <HStack justify="space-between" fontSize="sm" color="brand.text">
    <Text fontWeight={500}>{label}</Text>
    <Text color="brand.muted">{value ?? "—"}</Text>
  </HStack>
);

export const HorseModal: React.FC<Props> = ({ horse, isOpen, onClose }) => {
  if (!horse) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent borderRadius="2xl" overflow="hidden">
        <ModalCloseButton zIndex={10} bg="blackAlpha.500" color="white" borderRadius="full" _hover={{ bg: "blackAlpha.700" }} />
        <Image src={horse.image_url || ""} alt={horse.name} w="100%" h={{ base: "220px", md: "260px" }} objectFit="cover" />

        <ModalBody pt={6} pb={2}>
          <Text fontSize="0.65rem" fontWeight={600} letterSpacing="0.18em" textTransform="uppercase" color="brand.muted" mb={1}>
            {horse.category}
          </Text>
          <Heading fontWeight={400} fontSize="2xl" mb={2}>{horse.name}</Heading>
          {horse.record && (
            <Badge bg="brand.cream" color="brand.olive" borderRadius="full" px={3} py={1} fontSize="xs" fontWeight={600} mb={3}>
              Rekord: {horse.record}
            </Badge>
          )}
          <Text fontSize="sm" color="brand.muted" lineHeight={1.7}>{horse.description}</Text>

          <Divider my={5} />

          <Heading as="h3" fontSize="0.7rem" fontWeight={600} letterSpacing="0.16em" textTransform="uppercase" color="brand.olive" mb={4} fontFamily="body">
            Statistik
          </Heading>

          <VStack align="stretch" spacing={2}>
            <StatRow label="Ålder" value={horse.age ? `${horse.age} år` : null} />
            <StatRow label="Kön" value={horse.sex} />
            <StatRow label="Starter" value={horse.starts?.toString()} />
            <StatRow label="Segrar" value={horse.wins?.toString()} />
            <StatRow label="Placeringar" value={horse.placings?.toString()} />
            <StatRow label="Tränare" value={horse.trainer} />
          </VStack>

          {horse.pedigree && (
            <Box mt={4}>
              <Text fontSize="sm" fontWeight={500} mb={1}>Stamtavla</Text>
              <Text fontSize="sm" color="brand.muted">{horse.pedigree}</Text>
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} borderRadius="full" size="sm">Stäng</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
