export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverColor: string;
  pages?: number;
  year?: string;
}

export const bookCategories = [
  { id: "all", title: "جميع الكتب" },
  { id: "dictionary", title: "المعاجم اللغوية" },
  { id: "hadith", title: "الحديث الشريف" },
  { id: "fiqh", title: "الفقه والعقيدة" },
  { id: "general", title: "السيرة والتاريخ" },
];

export const books: Book[] = [
  {
    id: "lisan-al-arab",
    title: "لسان العرب",
    author: "ابن منظور",
    category: "dictionary",
    description: "من أشمل وأكبر المعاجم العربية، يجمع بين دفتيه خلاصة ما سبقه من المعاجم ويعتبر المرجع الأهم في علوم اللغة العربية.",
    coverColor: "#4A0E17", // Deep Red Leather
    pages: 4500,
    year: "711 هـ",
  },
  {
    id: "sahih-bukhari",
    title: "صحيح البخاري",
    author: "الإمام البخاري",
    category: "hadith",
    description: "أصح كتاب بعد كتاب الله، يضم أحاديث النبي ﷺ مرتبة على الأبواب الفقهية، وهو المرجع الأول في الحديث النبوي الشريف.",
    coverColor: "#1A3620", // Deep Green
    pages: 7500,
    year: "256 هـ",
  },
  {
    id: "sahih-muslim",
    title: "صحيح مسلم",
    author: "الإمام مسلم",
    category: "hadith",
    description: "من أهم كتب الحديث، يمتاز بدقة الترتيب وحسن السياق وجمع الروايات المختلفة للحديث الواحد في موضع واحد.",
    coverColor: "#2F1B12", // Dark Brown
    pages: 4000,
    year: "261 هـ",
  },
  {
    id: "riyadh-as-salihin",
    title: "رياض الصالحين",
    author: "الإمام النووي",
    category: "hadith",
    description: "من أكثر الكتب انتشاراً في العالم الإسلامي، يجمع الأحاديث الصحيحة التي ترشد المسلم في عباداته وحياته اليومية.",
    coverColor: "#152238", // Deep Navy
    pages: 600,
    year: "676 هـ",
  },
  {
    id: "fath-al-bari",
    title: "فتح الباري بشرح صحيح البخاري",
    author: "ابن حجر العسقلاني",
    category: "hadith",
    description: "أعظم شروح صحيح البخاري وأكثرها شمولاً، يُعد مرجعاً لا غنى عنه لفهم أحاديث البخاري واستنباط الأحكام منها.",
    coverColor: "#3B2A1A", // Vintage Leather
    pages: 8500,
    year: "852 هـ",
  },
  {
    id: "ar-raheeq-al-makhtum",
    title: "الرحيق المختوم",
    author: "صفي الرحمن المباركفوري",
    category: "general",
    description: "بحث متميز في السيرة النبوية، حائز على المركز الأول في مسابقة رابطة العالم الإسلامي للسيرة النبوية.",
    coverColor: "#4E3629", // Espresso
    pages: 500,
    year: "1976 م",
  },
  {
    id: "al-bidayah-wan-nihayah",
    title: "البداية والنهاية",
    author: "الحافظ ابن كثير",
    category: "general",
    description: "موسوعة تاريخية ضخمة تبدأ من بدء الخلق وتنتهي بأحداث يوم القيامة، يُعد من أهم مراجع التاريخ الإسلامي.",
    coverColor: "#592116", // Burgundy
    pages: 9000,
    year: "774 هـ",
  },
  {
    id: "zad-al-maad",
    title: "زاد المعاد",
    author: "ابن قيم الجوزية",
    category: "fiqh",
    description: "كتاب شامل في الفقه والسيرة النبوية، يتناول هدي النبي ﷺ في شتى مناحي الحياة من العبادات والمعاملات.",
    coverColor: "#22332A", // Forest Green
    pages: 1200,
    year: "751 هـ",
  },
  {
    id: "tafsir-ibn-kathir",
    title: "تفسير ابن كثير",
    author: "الحافظ ابن كثير",
    category: "fiqh",
    description: "من أشهر كتب التفسير بالمأثور، يعتمد على تفسير القرآن بالقرآن والأحاديث النبوية وأقوال الصحابة والتابعين.",
    coverColor: "#3E2723", // Dark Cocoa
    pages: 3500,
    year: "774 هـ",
  }
];

export function getBookById(id: string): Book | undefined {
  return books.find(b => b.id === id);
}

export function getBooksByCategory(category: string): Book[] {
  if (category === "all") return books;
  return books.filter(b => b.category === category);
}
