import React, { useEffect, useState } from "react";
import {
  Box, Button, FormControl, FormLabel, Heading, HStack, IconButton, Image, Input,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,
  Select, SimpleGrid, Spinner, Text, Textarea, useDisclosure, useToast, VStack,
} from "@chakra-ui/react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { api } from "../api";
import type { Horse } from "../api";
import { ImageUpload } from "./ImageUpload";

const emptyHorse: Partial<Horse> = {
  name: "", category: "Tävlingshäst", description: "", image_url: "",
  age: null, sex: null, pedigree: "", trainer: "", starts: 0, wins: 0, placings: 0, record: "", sort_order: 0,
};

export const AdminHorses: React.FC = () => {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Horse>>(emptyHorse);
  const [editId, setEditId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const load = () => {
    setLoading(true);
    api.getHorses().then(setHorses).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openNew = () => { setForm(emptyHorse); setEditId(null); onOpen(); };
  const openEdit = (h: Horse) => { setForm({ ...h }); setEditId(h.id); onOpen(); };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) {
        await api.admin.updateHorse(editId, form);
        toast({ title: "Häst uppdaterad", status: "success", duration: 3000 });
      } else {
        await api.admin.createHorse(form);
        toast({ title: "Häst skapad", status: "success", duration: 3000 });
      }
      onClose();
      load();
    } catch (err: any) {
      toast({ title: "Fel", description: err.message, status: "error", duration: 4000 });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Ta bort "${name}"?`)) return;
    try {
      await api.admin.deleteHorse(id);
      toast({ title: "Häst borttagen", status: "info", duration: 3000 });
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
        <Heading fontWeight={400} fontSize="2xl">Hästar</Heading>
        <Button leftIcon={<FiPlus />} variant="brandDark" size="sm" onClick={openNew}>Ny häst</Button>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {horses.map((h) => (
          <HStack key={h.id} bg="white" border="1px solid" borderColor="gray.200" borderRadius="xl" p={4} spacing={4}>
            <Image src={h.image_url || ""} alt={h.name} w="80px" h="80px" objectFit="cover" borderRadius="lg" flexShrink={0} />
            <Box flex={1} minW={0}>
              <Text fontWeight={600} fontSize="sm" noOfLines={1}>{h.name}</Text>
              <Text fontSize="xs" color="brand.muted">{h.category} · {h.age || "?"} år · {h.sex || "?"}</Text>
              {h.record && <Text fontSize="xs" color="brand.olive">Rekord: {h.record}</Text>}
            </Box>
            <HStack spacing={1}>
              <IconButton aria-label="Redigera" icon={<FiEdit2 />} size="sm" variant="ghost" onClick={() => openEdit(h)} />
              <IconButton aria-label="Ta bort" icon={<FiTrash2 />} size="sm" variant="ghost" color="red.400"
                onClick={() => handleDelete(h.id, h.name)} />
            </HStack>
          </HStack>
        ))}
      </SimpleGrid>

      {horses.length === 0 && <Text color="brand.muted" mt={4}>Inga hästar ännu. Klicka "Ny häst" för att lägga till.</Text>}

      {/* Modal form */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent borderRadius="2xl">
          <ModalHeader fontWeight={400}>{editId ? "Redigera häst" : "Ny häst"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">Namn</FormLabel>
                <Input value={form.name || ""} onChange={(e) => set("name", e.target.value)} size="sm" />
              </FormControl>

              <SimpleGrid columns={2} spacing={4} w="100%">
                <FormControl>
                  <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">Kategori</FormLabel>
                  <Select value={form.category || ""} onChange={(e) => set("category", e.target.value)} size="sm">
                    <option>Tävlingshäst</option>
                    <option>Avelssto</option>
                    <option>Unghäst</option>
                    <option>Pensionär</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">Kön</FormLabel>
                  <Select value={form.sex || ""} onChange={(e) => set("sex", e.target.value || null)} size="sm">
                    <option value="">Välj...</option>
                    <option>Sto</option>
                    <option>Hingst</option>
                    <option>Valack</option>
                  </Select>
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={3} spacing={4} w="100%">
                <FormControl>
                  <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">Ålder</FormLabel>
                  <Input type="number" value={form.age ?? ""} onChange={(e) => set("age", e.target.value ? Number(e.target.value) : null)} size="sm" />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">Starter</FormLabel>
                  <Input type="number" value={form.starts ?? 0} onChange={(e) => set("starts", Number(e.target.value))} size="sm" />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">Segrar</FormLabel>
                  <Input type="number" value={form.wins ?? 0} onChange={(e) => set("wins", Number(e.target.value))} size="sm" />
                </FormControl>
              </SimpleGrid>

              <SimpleGrid columns={3} spacing={4} w="100%">
                <FormControl>
                  <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">Placeringar</FormLabel>
                  <Input type="number" value={form.placings ?? 0} onChange={(e) => set("placings", Number(e.target.value))} size="sm" />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">Rekord</FormLabel>
                  <Input value={form.record || ""} onChange={(e) => set("record", e.target.value)} size="sm" placeholder="1.12,8" />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">Sortering</FormLabel>
                  <Input type="number" value={form.sort_order ?? 0} onChange={(e) => set("sort_order", Number(e.target.value))} size="sm" />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">Tränare</FormLabel>
                <Input value={form.trainer || ""} onChange={(e) => set("trainer", e.target.value)} size="sm" />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">Stamtavla</FormLabel>
                <Input value={form.pedigree || ""} onChange={(e) => set("pedigree", e.target.value)} size="sm" placeholder="e. Far u. Mor" />
              </FormControl>

              <FormControl>
                <FormLabel>Bild</FormLabel>
                <ImageUpload value={form.image_url || null} onChange={(url) => set("image_url", url)} />
              </FormControl>

              <FormControl>
                <FormLabel fontSize="xs" fontWeight={600} textTransform="uppercase" color="brand.muted">Beskrivning</FormLabel>
                <Textarea value={form.description || ""} onChange={(e) => set("description", e.target.value)} size="sm" rows={3} />
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
