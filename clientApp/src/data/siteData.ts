export type Horse = {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  stats: {
    age?: number;
    sex?: "Sto" | "Hingst" | "Valack";
    pedigree?: string;
    trainer?: string;
    starts?: number;
    wins?: number;
    placings?: number;
    record?: string;
  };
};

export const horses: Horse[] = [
  {
    id: "exempel-star",
    name: "Exempel Star",
    category: "Tävlingshäst",
    description: "Startar regelbundet och har flera pallplaceringar. Stark karaktär med en fin balans mellan fart och uthållighet.",
    imageUrl: "https://images.pexels.com/photos/1996336/pexels-photo-1996336.jpeg?auto=compress&cs=tinysrgb&w=1200",
    stats: { age: 6, sex: "Valack", starts: 28, wins: 5, placings: 12, record: "1.12,8", trainer: "Exempel Tränare", pedigree: "e. Exempelhingst u. Exempelsto" },
  },
  {
    id: "exempel-nova",
    name: "Exempel Nova",
    category: "Avelssto",
    description: "Meriterad på banan, nu en del av vår avelssatsning. Hennes avkommor visar stor potential.",
    imageUrl: "https://images.pexels.com/photos/979952/pexels-photo-979952.jpeg?auto=compress&cs=tinysrgb&w=1200",
    stats: { age: 9, sex: "Sto", starts: 34, wins: 7, placings: 18, record: "1.13,4", trainer: "Exempel Tränare", pedigree: "e. Exempelhingst u. Exempelsto" },
  },
  {
    id: "exempel-rocket",
    name: "Exempel Rocket",
    category: "Unghäst",
    description: "Lovande unghäst i uppträning med fin inställning och naturlig kapacitet.",
    imageUrl: "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1200",
    stats: { age: 2, sex: "Hingst", starts: 0, wins: 0, placings: 0, trainer: "Exempel Tränare", pedigree: "e. Exempelhingst u. Exempelsto" },
  },
];

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string[];
  imageUrl: string;
};

export const news: NewsItem[] = [
  {
    id: "1", slug: "nya-fol-pa-garden", title: "Nya föl på gården", date: "2026-01-10",
    excerpt: "Vi har välkomnat årets första föl. Läs mer om stamtavla och hur vi jobbar med de första veckorna.",
    content: [
      "Vi har välkomnat årets första föl på gården och det är alltid en speciell tid.",
      "Vårt fokus i början är trygghet, rutiner och mycket utevistelse. Det är viktigt att fölen får bygga upp sin sociala kompetens med andra hästar tidigt.",
      "Under de kommande månaderna fortsätter vi följa utvecklingen och delar fler uppdateringar här på hemsidan.",
    ],
    imageUrl: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "2", slug: "traningsuppdatering-infor-sasongen", title: "Träningsuppdatering inför säsongen", date: "2025-12-20",
    excerpt: "Vi finslipar vinterträningen med fokus på styrka, återhämtning och glädje i arbetet.",
    content: [
      "Vinterperioden handlar om att bygga styrka och hållbarhet inför den kommande tävlingssäsongen.",
      "Vi varvar arbete i backe, intervaller och lugna distanspass. Variationen är nyckeln till att hålla hästarna motiverade.",
      "Återhämtning och variation är lika viktigt som själva träningspassen — det är så vi bygger hästar som håller länge.",
    ],
    imageUrl: "https://images.pexels.com/photos/979952/pexels-photo-979952.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "3", slug: "resultat-fran-senaste-tavlingen", title: "Resultat från senaste tävlingen", date: "2025-11-30",
    excerpt: "Starka prestationer i helgens lopp. Vi sammanfattar dagen och vad som väntar härnäst.",
    content: [
      "Helgen bjöd på fina insatser och flera personbästa bland våra hästar.",
      "Vi tar med oss erfarenheterna in i nästa träningsblock och fortsätter utvecklas.",
      "Nästa start planeras inom några veckor — mer info kommer snart!",
    ],
    imageUrl: "https://images.pexels.com/photos/1996336/pexels-photo-1996336.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export type HeroSlide = {
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaPrimary?: { label: string; to: string };
  ctaSecondary?: { label: string; to: string };
};

export const heroSlides: HeroSlide[] = [
  {
    title: "Uppfödning med hållbarhet och passion.",
    subtitle: "Vi föder upp hästar i lugn miljö med fokus på temperament, hälsa och långsiktig kapacitet — från föl till tävlingsbana.",
    imageUrl: "https://images.pexels.com/photos/1996336/pexels-photo-1996336.jpeg?auto=compress&cs=tinysrgb&w=1920",
    ctaPrimary: { label: "Läs mer om oss", to: "/om-oss" },
    ctaSecondary: { label: "Se våra hästar", to: "/hastar" },
  },
  {
    title: "Travsport med hästen i centrum.",
    subtitle: "Strukturerad träning, tydliga mål och stor respekt för individen — från första jobb till tävlingsdag.",
    imageUrl: "https://images.pexels.com/photos/979952/pexels-photo-979952.jpeg?auto=compress&cs=tinysrgb&w=1920",
    ctaPrimary: { label: "Kontakta oss", to: "/kontakt" },
  },
  {
    title: "En gård att trivas på.",
    subtitle: "Kuperade hagar, närhet till banor och en vardag där hästar och människor får utrymme att må bra.",
    imageUrl: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=1920&q=80",
    ctaPrimary: { label: "Boka ett besök", to: "/kontakt" },
  },
];
