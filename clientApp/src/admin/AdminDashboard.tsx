import React, { useEffect, useState } from "react";
import { Box, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { api } from "../api";

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ horses: 0, news: 0, messages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getHorses(),
      api.admin.getAllNews(),
      api.admin.getMessages(),
    ]).then(([h, n, m]) => {
      setStats({ horses: h.length, news: n.length, messages: m.length });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <Box py={10} textAlign="center"><Spinner size="lg" color="brand.olive" /></Box>;

  const cards = [
    { label: "Hästar", value: stats.horses, color: "brand.olive" },
    { label: "Nyheter", value: stats.news, color: "brand.warm" },
    { label: "Meddelanden", value: stats.messages, color: "#5a6b42" },
  ];

  return (
    <>
      <Heading fontWeight={400} fontSize="2xl" mb={8}>Översikt</Heading>
      <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={5}>
        {cards.map((c) => (
          <Box key={c.label} bg="white" border="1px solid" borderColor="gray.200" borderRadius="xl" p={6}>
            <Text fontSize="xs" fontWeight={600} letterSpacing="0.14em" textTransform="uppercase" color="brand.muted" mb={2}>
              {c.label}
            </Text>
            <Text fontSize="3xl" fontWeight={300} fontFamily="heading" color={c.color}>
              {c.value}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};
