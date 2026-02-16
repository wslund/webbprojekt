import React, { useRef, useState } from "react";
import { Box, Button, Image, Input, Text, useToast, VStack } from "@chakra-ui/react";
import { FiUpload, FiX } from "react-icons/fi";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

interface Props {
  value: string | null;           // current image URL
  onChange: (url: string) => void; // called with new URL after upload
}

export const ImageUpload: React.FC<Props> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const toast = useToast();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Bara bildfiler tillåtna", status: "warning", duration: 3000 });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Max 5MB", status: "warning", duration: 3000 });
      return;
    }

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    // Convert to base64 and upload
    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/images.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          data: base64,
          filename: file.name,
          mime_type: file.type,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Uppladdning misslyckades");

      // Build full URL for the image
      const imageUrl = `${API_BASE}/images.php?id=${data.id}`;
      onChange(imageUrl);
      toast({ title: "Bild uppladdad!", status: "success", duration: 2000 });
    } catch (err: any) {
      toast({ title: "Fel vid uppladdning", description: err.message, status: "error", duration: 4000 });
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const displayUrl = preview || value;

  return (
    <VStack align="stretch" spacing={3}>
      {displayUrl && (
        <Box position="relative" borderRadius="lg" overflow="hidden" maxH="200px">
          <Image src={displayUrl} alt="Förhandsvisning" w="100%" maxH="200px" objectFit="cover" />
          <Button
            position="absolute"
            top={2}
            right={2}
            size="xs"
            colorScheme="red"
            borderRadius="full"
            onClick={() => { onChange(""); setPreview(null); }}
          >
            <FiX />
          </Button>
        </Box>
      )}

      <Input ref={inputRef} type="file" accept="image/*" onChange={handleFile} display="none" />

      <Button
        leftIcon={<FiUpload />}
        size="sm"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        isLoading={uploading}
        loadingText="Laddar upp..."
        borderRadius="lg"
      >
        {value ? "Byt bild" : "Ladda upp bild"}
      </Button>

      {!displayUrl && (
        <Text fontSize="xs" color="text.muted">Max 5MB. JPG, PNG eller WebP.</Text>
      )}
    </VStack>
  );
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Return just the base64 part (after the comma)
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
