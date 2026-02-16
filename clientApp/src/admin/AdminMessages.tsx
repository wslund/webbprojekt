import React, { useEffect, useState } from "react";
import {
  Badge, Box, Button, Heading, HStack, IconButton, Spinner, Text, useToast, VStack,
} from "@chakra-ui/react";
import { FiCheck, FiTrash2 } from "react-icons/fi";
import { api } from "../api";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: number;
  created_at: string;
}

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const load = () => {
    setLoading(true);
    api.admin.getMessages().then(setMessages).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const markRead = async (id: number) => {
    try {
      await api.admin.markRead(id);
      load();
    } catch (err: any) {
      toast({ title: "Fel", description: err.message, status: "error" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Ta bort meddelandet?")) return;
    try {
      await api.admin.deleteMessage(id);
      toast({ title: "Meddelande borttaget", status: "info", duration: 3000 });
      load();
    } catch (err: any) {
      toast({ title: "Fel", description: err.message, status: "error" });
    }
  };

  if (loading) return <Box py={10} textAlign="center"><Spinner size="lg" color="brand.olive" /></Box>;

  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <>
      <HStack justify="space-between" mb={6}>
        <HStack spacing={3}>
          <Heading fontWeight={400} fontSize="2xl">Meddelanden</Heading>
          {unread > 0 && <Badge colorScheme="red" borderRadius="full" px={2}>{unread} nya</Badge>}
        </HStack>
      </HStack>

      <VStack align="stretch" spacing={3}>
        {messages.map((m) => (
          <Box
            key={m.id}
            bg={m.is_read ? "white" : "orange.50"}
            border="1px solid"
            borderColor={m.is_read ? "gray.200" : "orange.200"}
            borderRadius="xl"
            p={5}
          >
            <HStack justify="space-between" mb={2}>
              <HStack spacing={2}>
                <Text fontWeight={600} fontSize="sm">{m.name}</Text>
                <Text fontSize="xs" color="brand.muted">{m.email}</Text>
                {!m.is_read && <Badge colorScheme="orange" fontSize="xs">Ny</Badge>}
              </HStack>
              <Text fontSize="xs" color="brand.muted">
                {new Date(m.created_at).toLocaleDateString("sv-SE", {
                  day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
                })}
              </Text>
            </HStack>

            {m.subject && <Text fontSize="sm" fontWeight={500} mb={1}>{m.subject}</Text>}
            <Text fontSize="sm" color="brand.text" lineHeight={1.7} whiteSpace="pre-wrap">{m.message}</Text>

            <HStack mt={3} spacing={2}>
              {!m.is_read && (
                <Button size="xs" leftIcon={<FiCheck />} colorScheme="green" variant="ghost" onClick={() => markRead(m.id)}>
                  Markera som läst
                </Button>
              )}
              <IconButton aria-label="Ta bort" icon={<FiTrash2 />} size="xs" variant="ghost" color="red.400"
                onClick={() => handleDelete(m.id)} />
              <Button as="a" href={`mailto:${m.email}?subject=Re: ${m.subject || "Kontakt"}`} size="xs" variant="ghost" colorScheme="blue">
                Svara via mail
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>

      {messages.length === 0 && <Text color="brand.muted" mt={4}>Inga meddelanden ännu.</Text>}
    </>
  );
};
