import React, { useEffect, useState } from "react";
import {
  Badge, Box, Button, FormControl, FormLabel, Heading, HStack, IconButton, Input,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  Select, Spinner, Switch, Text, Textarea, useDisclosure, useToast, VStack,
} from "@chakra-ui/react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { api } from "../api";
import type { NewsItem } from "../api";
import { ImageUpload } from "./ImageUpload";

const emptyNews: Partial<NewsItem> = {
  title: "", slug: "", excerpt: "", content: [], image_url: "", published: 1, published_at: new Date().toISOString().split("T")[0],
};

export const AdminNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<NewsItem>>(emptyNews);
  const [contentText, setContentText] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const load = () => {
    setLoading(true);
    api.admin.getAllNews().then(setNews).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openNew = () => {
    setForm(emptyNews);
    setContentText("");
    setEditId(null);
    onOpen();
  };

  const openEdit = (n: NewsItem) => {
    setForm({ ...n });
    setContentText(Array.isArray(n.content) ? n.content.join("\n\n") : "");
    setEditId(n.id);
    onOpen();
  };

  const handleSave = async () => {
    setSaving(true);
    const data = {
      ...form,
      content: contentText.split("\n\n").map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editId) {
        await api.admin.updateNews(editId, data);
        toast({ title: "Nyhet uppdaterad", status: "success", duration: 3000 });
      } else {
        await api.admin.createNews(data);
        toast({ title: "Nyhet skapad", status: "success", duration: 3000 });
      }
      onClose();
      load();
    } catch (err: any) {
      toast({ title: "Fel", description: err.message, status: "error", duration: 4000 });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Ta bort "${title}"?`)) return;
    try {
      await api.admin.deleteNews(id);
      toast({ title: "Nyhet borttagen", status: "info", duration: 3000 });
      load();
    } catch (err: any) {
      toast({ title: "Fel", description: err.message, status: "error", duration: 4000 });
    }
  };

  const set = (key: string, value: any) => setForm((p) => ({ ...p, [key]: value }));

  if (loading) return <Box py={10} textAlign="center"><Spinner size="lg" color="brand.olive" /></Box>;

  return (
    <>
      <HStack justify="space-between" mb={6}>
        <Heading fontWeight={400} fontSize="2xl">Nyheter</Heading>
        <Button leftIcon={<FiPlus />} variant="brandDark" size="sm" onClick={openNew}>Ny nyhet</Button>
      </HStack>

      <VStack align="stretch" spacing={3}>
        {news.map((n) => (
          <HStack key={n.id} bg="white" border="1px solid" borderColor="gray.200" borderRadius="xl" p={4} spacing={4}>
            <Box flex={1} minW={0}>
              <HStack mb={1}>
                <Text fontWeight={600} fontSize="sm" noOfLines={1}>{n.title}</Text>
                {!n.published && <Badge colorScheme="yellow" fontSize="xs">Utkast</Badge>}
              </HStack>
              <Text fontSize="xs" color="brand.muted">
                {new Date(n.published_at).toLocaleDateString("sv-SE")} · {n.slug}
              </Text>
            </Box>
            <HStack spacing={1}>
              <IconButton aria-label="Redigera" icon={<FiEdit2 />} size="sm" variant="ghost" onClick={() => openEdit(n)} />
              <IconButton aria-label="Ta bort" icon={<FiTrash2 />} size="sm" variant="ghost" color="red.400"
                onClick={() => handleDelete(n.id, n.title)} />
            </HStack>
          </HStack>
        ))}
      </VStack>

      {news.length === 0 && <Text color="brand.muted" mt={4}>Inga nyheter ännu.</Text>}

      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent borderRadius="2xl">
          <ModalHeader fontWeight={400}>{editId ? "Redigera nyhet" : "Ny nyhet"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">Rubrik</FormLabel>
                <Input value={form.title || ""} onChange={(e) => set("title", e.target.value)} size="sm" />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">
                  Slug <Text as="span" fontWeight={400} textTransform="none">(lämna tomt för auto)</Text>
                </FormLabel>
                <Input value={form.slug || ""} onChange={(e) => set("slug", e.target.value)} size="sm" placeholder="ny-nyhet-slug" />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">Datum</FormLabel>
                <Input type="date" value={form.published_at || ""} onChange={(e) => set("published_at", e.target.value)} size="sm" />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">Utdrag</FormLabel>
                <Textarea value={form.excerpt || ""} onChange={(e) => set("excerpt", e.target.value)} size="sm" rows={2} />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">
                  Innehåll <Text as="span" fontWeight={400} textTransform="none">(separera stycken med tom rad)</Text>
                </FormLabel>
                <Textarea value={contentText} onChange={(e) => setContentText(e.target.value)} size="sm" rows={8} />
              </FormControl>

              <FormControl>
                <FormLabel>Bild</FormLabel>
                <ImageUpload value={form.image_url || null} onChange={(url) => set("image_url", url)} />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted" mb={0}>Publicerad</FormLabel>
                <Switch isChecked={form.published === 1} onChange={(e) => set("published", e.target.checked ? 1 : 0)} colorScheme="green" />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>Avbryt</Button>
            <Button variant="brandDark" onClick={handleSave} isLoading={saving}>{editId ? "Spara" : "Skapa"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
