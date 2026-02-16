// ═══════════════════════════════════════════════════
// API-klient — alla anrop till PHP-backenden
// Byt API_BASE när du deplojerar till webbhotellet
// ═══════════════════════════════════════════════════

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// ── Typer (matchar databasen) ──
export type Horse = {
  id: number;
  name: string;
  category: string;
  description: string;
  image_url: string | null;
  age: number | null;
  sex: "Sto" | "Hingst" | "Valack" | null;
  pedigree: string | null;
  trainer: string | null;
  starts: number;
  wins: number;
  placings: number;
  record: string | null;
  sort_order: number;
};

export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  image_url: string | null;
  published: number;
  published_at: string;
};

export type ContactMessage = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

export type AuthResponse = {
  token: string;
  user: { id: number; username: string; name: string };
};

// ── Hjälpfunktion ──
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE}/${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `API-fel: ${res.status}`);
  }

  return data as T;
}

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ═══════════════════ PUBLIKA ENDPOINTS ═══════════════════

export const api = {
  // ── Hästar ──
  getHorses: () => apiFetch<Horse[]>("horses.php"),

  getHorse: (id: number) => apiFetch<Horse>(`horses.php?id=${id}`),

  // ── Nyheter ──
  getNews: () => apiFetch<NewsItem[]>("news.php"),

  getNewsBySlug: (slug: string) => apiFetch<NewsItem>(`news.php?slug=${slug}`),

  // ── Kontakt ──
  sendContact: (data: ContactMessage) =>
    apiFetch<{ success: boolean; message: string }>("contact.php", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // ── Auth ──
  login: (username: string, password: string) =>
    apiFetch<AuthResponse>("auth.php", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  // ═══════════════════ ADMIN ENDPOINTS ═══════════════════

  admin: {
    // Hästar
    createHorse: (data: Partial<Horse>) =>
      apiFetch<Horse>("horses.php", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
      }),

    updateHorse: (id: number, data: Partial<Horse>) =>
      apiFetch<Horse>(`horses.php?id=${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
      }),

    deleteHorse: (id: number) =>
      apiFetch<{ deleted: boolean }>(`horses.php?id=${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      }),

    // Nyheter
    getAllNews: () =>
      apiFetch<NewsItem[]>("news.php?all=1", {
        headers: authHeaders(),
      }),

    createNews: (data: Partial<NewsItem>) =>
      apiFetch<NewsItem>("news.php", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
      }),

    updateNews: (id: number, data: Partial<NewsItem>) =>
      apiFetch<NewsItem>(`news.php?id=${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
      }),

    deleteNews: (id: number) =>
      apiFetch<{ deleted: boolean }>(`news.php?id=${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      }),

    // Kontaktmeddelanden
    getMessages: () =>
      apiFetch<any[]>("contact.php", {
        headers: authHeaders(),
      }),

    markRead: (id: number) =>
      apiFetch<{ updated: boolean }>(`contact.php?id=${id}`, {
        method: "PUT",
        headers: authHeaders(),
      }),

    deleteMessage: (id: number) =>
      apiFetch<{ deleted: boolean }>(`contact.php?id=${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      }),
  },
};
