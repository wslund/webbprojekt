import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Stack,
  Input,
  Textarea,
  Button,
  Flex,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string | null;
  showPicture: boolean;
}

const ManageNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const toast = useToast();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost/PHP_Backend/get_news.php?page=1",
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      const data = await response.json();
      if (data.news) {
        setNews(data.news);
      } else {
        console.error("Hämtning misslyckades:", data.message);
        toast({
          title: "Fel",
          description: data.message || "Kunde inte hämta nyheter.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      const error = err as Error;
      console.error("Fel vid hämtning av nyheter:", error.message);
      toast({
        title: "Fel",
        description: "Kunde inte hämta nyheter: " + error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titel", title);
    formData.append("innehall", content);
    if (image) formData.append("bild", image);
    if (editingId) formData.append("id", editingId.toString());

    const url = editingId
      ? "http://localhost/PHP_Backend/update_news.php"
      : "http://localhost/PHP_Backend/add_news.php";

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        toast({
          title: editingId ? "Nyhet uppdaterad" : "Nyhet tillagd",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTitle("");
        setContent("");
        setImage(null);
        setEditingId(null);
        fetchNews();
      } else {
        toast({
          title: "Fel",
          description: data.message || "Okänt fel",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      const error = err as Error;
      console.error("Fel vid sändning:", error.message);
      toast({
        title: "Fel",
        description: "Något gick fel: " + error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (item: NewsItem) => {
    setTitle(item.title);
    setContent(item.content);
    setImage(null);
    setEditingId(item.id);
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost/PHP_Backend/delete_news.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ id }),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast({
          title: "Nyhet borttagen",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setNews(news.filter((item) => item.id !== id));
        if (editingId === id) {
          setTitle("");
          setContent("");
          setImage(null);
          setEditingId(null);
        }
      } else {
        toast({
          title: "Fel",
          description: data.message || "Kunde inte ta bort nyhet.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      const error = err as Error;
      console.error("Fel vid borttagning:", error.message);
      toast({
        title: "Fel",
        description: "Fel vid borttagning: " + error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={{ base: 4, md: 8 }} maxW="1200px" mx="auto" bg="background">
      <Heading mb={6} color="textColor">
        Hantera nyheter
      </Heading>
      <Flex direction={{ base: "column", md: "row" }} gap={8}>
        <Box
          flex="1"
          bg="secondary"
          p={{ base: 4, md: 6 }}
          borderRadius="md"
          boxShadow="sm"
          border="1px solid"
          borderColor="primary"
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Input
                placeholder="Titel"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                bg="background"
                borderColor="primary"
                color="textColor"
                _hover={{ borderColor: "secondary" }}
                _focus={{
                  borderColor: "primary",
                  boxShadow: "0 0 0 1px #2E4A2E",
                }}
              />
              <Textarea
                placeholder="Innehåll"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                bg="background"
                borderColor="primary"
                color="textColor"
                _hover={{ borderColor: "secondary" }}
                _focus={{
                  borderColor: "primary",
                  boxShadow: "0 0 0 1px #2E4A2E",
                }}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                bg="background"
                borderColor="primary"
                color="textColor"
                _hover={{ borderColor: "secondary" }}
              />
              <Button type="submit" variant="solid">
                {editingId ? "Uppdatera nyhet" : "Lägg till nyhet"}
              </Button>
              {editingId && (
                <Button
                  variant="outline"
                  borderColor="primary"
                  color="textColor"
                  _hover={{ bg: "secondary", color: "textColor" }}
                  onClick={() => {
                    setTitle("");
                    setContent("");
                    setImage(null);
                    setEditingId(null);
                  }}
                >
                  Avbryt redigering
                </Button>
              )}
            </Stack>
          </form>
        </Box>

        <Box flex="1" maxH="600px" overflowY="auto">
          <VStack spacing={4} align="stretch">
            {news.map((item) => (
              <Flex
                key={item.id}
                p={4}
                bg="secondary"
                border="1px solid"
                borderColor="primary"
                borderRadius="md"
                boxShadow="sm"
                justify="space-between"
                align="center"
                _hover={{ bg: "#E8D7B3" }}
                cursor="pointer"
              >
                <Box onClick={() => handleEdit(item)} flex="1">
                  <Text fontWeight="bold" color="textColor">
                    {item.title}
                  </Text>
                  <Text noOfLines={2} color="textColor">
                    {item.content}
                  </Text>
                  <Text fontSize="sm" color="textColor" opacity={0.7}>
                    {new Date(item.date).toLocaleDateString("sv-SE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </Box>
                <Button
                  bg="#9B2C2C"
                  color="menyText"
                  _hover={{ bg: "#7D2323" }}
                  onClick={() => handleDelete(item.id)}
                >
                  Ta bort
                </Button>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default ManageNews;
