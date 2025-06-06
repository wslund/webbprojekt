import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  SimpleGrid,
  Image,
  HStack,
  useToast,
} from "@chakra-ui/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Horse {
  id: number;
  name: string;
  image: string; // Base64-sträng
  owner: string;
  info: string;
  sortOrder: number;
}

const ManageHorses: React.FC = () => {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [owner, setOwner] = useState("");
  const [info, setInfo] = useState("");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const toast = useToast();

  // Hämta hästar vid laddning
  useEffect(() => {
    fetchHorses();
  }, []);

  const fetchHorses = async () => {
    try {
      const response = await fetch(
        "http://localhost/php_backend/get_horses.php"
      );
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP-fel: ${response.status} ${text}`);
      }
      const data = await response.json();
      setHorses(data);
    } catch (err) {
      setError(`Kunde inte hämta hästar: ${(err as Error).message}`);
    }
  };

  // Hantera bilduppladdning
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Fel",
          description: "Bilden får inte vara större än 2 MB.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Hantera formulärinskick
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Du måste vara inloggad.");
      return;
    }

    try {
      let imageBase64 = imagePreview;
      if (image) {
        imageBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(image);
        });
      }

      const horseData = {
        id: editId,
        name,
        image: imageBase64 || "",
        owner,
        info,
        sortOrder,
      };

      const url = editId
        ? "http://localhost/php_backend/update_horse.php"
        : "http://localhost/php_backend/add_horse.php";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(horseData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Något gick fel.");
      }

      toast({
        title: editId ? "Häst uppdaterad" : "Häst tillagd",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setName("");
      setImage(null);
      setImagePreview("");
      setOwner("");
      setInfo("");
      setSortOrder(0);
      setEditId(null);
      fetchHorses();
    } catch (err) {
      toast({
        title: "Fel",
        description: (err as Error).message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Hantera redigering
  const handleEdit = (horse: Horse) => {
    setEditId(horse.id);
    setName(horse.name);
    setImagePreview(horse.image);
    setOwner(horse.owner);
    setInfo(horse.info);
    setSortOrder(horse.sortOrder);
  };

  // Hantera borttagning
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Du måste vara inloggad.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/php_backend/delete_horse.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Kunde inte ta bort häst.");
      }

      toast({
        title: "Häst borttagen",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      fetchHorses();
    } catch (err) {
      toast({
        title: "Fel",
        description: (err as Error).message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxWidth="1200px"
      margin="auto"
      padding={{ base: 6, md: 10 }}
      bg="background"
    >
      <Text fontSize="2xl" mb={6} fontWeight="bold" color="textColor">
        Hantera hästar
      </Text>
      {error && (
        <Text color="#9B2C2C" mb={4}>
          {error}
        </Text>
      )}

      {/* Formulär för att lägga till/redigera */}
      <Box
        as="form"
        onSubmit={handleSubmit}
        mb={10}
        bg="secondary"
        borderWidth="1px"
        borderColor="primary"
        borderRadius="md"
        p={{ base: 4, md: 6 }}
        boxShadow="sm"
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <FormControl isRequired>
            <FormLabel color="textColor">Namn</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              bg="background"
              borderColor="primary"
              color="textColor"
              _hover={{ borderColor: "secondary" }}
              _focus={{
                borderColor: "primary",
                boxShadow: "0 0 0 1px #2E4A2E",
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="textColor">Bild</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              bg="background"
              borderColor="primary"
              color="textColor"
              _hover={{ borderColor: "secondary" }}
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Förhandsvisning"
                maxH="100px"
                mt={2}
                border="1px solid"
                borderColor="primary"
                borderRadius="md"
              />
            )}
          </FormControl>
          <FormControl isRequired>
            <FormLabel color="textColor">Ägare</FormLabel>
            <Input
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              bg="background"
              borderColor="primary"
              color="textColor"
              _hover={{ borderColor: "secondary" }}
              _focus={{
                borderColor: "primary",
                boxShadow: "0 0 0 1px #2E4A2E",
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color="textColor">Info</FormLabel>
            <Textarea
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              bg="background"
              borderColor="primary"
              color="textColor"
              _hover={{ borderColor: "secondary" }}
              _focus={{
                borderColor: "primary",
                boxShadow: "0 0 0 1px #2E4A2E",
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel color="textColor">Sorteringsordning</FormLabel>
            <Input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              bg="background"
              borderColor="primary"
              color="textColor"
              _hover={{ borderColor: "secondary" }}
              _focus={{
                borderColor: "primary",
                boxShadow: "0 0 0 1px #2E4A2E",
              }}
            />
          </FormControl>
        </SimpleGrid>
        <Button mt={4} variant="solid" type="submit">
          {editId ? "Uppdatera häst" : "Lägg till häst"}
        </Button>
        {editId && (
          <Button
            mt={4}
            ml={2}
            variant="outline"
            onClick={() => {
              setEditId(null);
              setName("");
              setImage(null);
              setImagePreview("");
              setOwner("");
              setInfo("");
              setSortOrder(0);
            }}
          >
            Avbryt
          </Button>
        )}
      </Box>

      {/* Lista över hästar */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {horses.map((horse) => (
          <Box
            key={horse.id}
            bg="secondary"
            borderWidth="1px"
            borderColor="primary"
            borderRadius="md"
            p={4}
            boxShadow="sm"
          >
            <HStack justifyContent="space-between">
              <Text fontWeight="bold" color="textColor">
                {horse.name}
              </Text>
              <HStack>
                <Button
                  size="sm"
                  variant="solid"
                  onClick={() => handleEdit(horse)}
                >
                  <EditIcon style={{ color: "#F9F9F9" }} />
                </Button>
                <Button
                  size="sm"
                  bg="#9B2C2C"
                  color="menyText"
                  _hover={{ bg: "#7D2323" }}
                  onClick={() => handleDelete(horse.id)}
                >
                  <DeleteIcon style={{ color: "#F9F9F9" }} />
                </Button>
              </HStack>
            </HStack>
            {horse.image && (
              <Image
                src={horse.image}
                alt={horse.name}
                maxH="100px"
                mt={2}
                border="1px solid"
                borderColor="primary"
                borderRadius="md"
              />
            )}
            <Text color="textColor">Ägare: {horse.owner}</Text>
            <Text color="textColor">Info: {horse.info}</Text>
            <Text color="textColor">Sorteringsordning: {horse.sortOrder}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ManageHorses;
