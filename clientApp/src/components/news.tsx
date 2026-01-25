export type NewsItem = {
  id: string;
  slug: string; // används i URL
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  content: string[]; // enkla textstycken
  imageUrl?: string; // valfritt
};

export const news: NewsItem[] = [
  {
    id: "1",
    slug: "nya-fol-pa-garden",
    title: "Nya föl på gården",
    date: "2026-01-10",
    excerpt:
      "Vi har välkomnat årets första föl. Läs mer om stamtavla och hur vi jobbar med de första veckorna.",
    content: [
      "Vi har välkomnat årets första föl på gården och det är alltid en speciell tid.",
      "Vårt fokus i början är trygghet, rutiner och mycket utevistelse.",
      "Under de kommande månaderna fortsätter vi följa utvecklingen och delar fler uppdateringar.",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "2",
    slug: "traningsuppdatering-infor-sasongen",
    title: "Träningsuppdatering inför säsongen",
    date: "2025-12-20",
    excerpt:
      "Vi finslipar vinterträningen med fokus på styrka, återhämtning och glädje i arbetet.",
    content: [
      "Vinterperioden handlar om att bygga styrka och hållbarhet.",
      "Vi varvar arbete i backe, intervaller och lugna distanspass.",
      "Återhämtning och variation är lika viktigt som själva träningspassen.",
    ],
  },
  {
    id: "3",
    slug: "resultat-fran-senaste-tavlingen",
    title: "Resultat från senaste tävlingen",
    date: "2025-11-30",
    excerpt:
      "Starka prestationer i helgens lopp. Vi sammanfattar dagen och vad som väntar härnäst.",
    content: [
      "Helgen bjöd på fina insatser och flera personbästa.",
      "Vi tar med oss erfarenheterna in i nästa träningsblock.",
      "Nästa start planeras inom några veckor – mer info kommer snart!",
    ],
  },
];
