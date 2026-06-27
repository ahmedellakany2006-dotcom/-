export interface SurahBase {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | object;
}

export interface SurahDetail extends SurahBase {
  ayahs: Ayah[];
}

export interface QuranApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

const BASE_URL = "https://api.alquran.cloud/v1";

/**
 * Fetches the list of all 114 Surahs
 */
export async function getSurahs(): Promise<SurahBase[]> {
  try {
    const res = await fetch(`${BASE_URL}/surah`);
    if (!res.ok) throw new Error("Failed to fetch surahs");
    const json: QuranApiResponse<SurahBase[]> = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching surahs:", error);
    return [];
  }
}

/**
 * Fetches a specific Surah with standard Arabic text (Imla'i with Tashkeel)
 * This avoids Uthmani symbols that might appear as spelling mistakes.
 */
export async function getSurahUthmani(id: string | number): Promise<SurahDetail | null> {
  try {
    const res = await fetch(`${BASE_URL}/surah/${id}/quran-simple`);
    if (!res.ok) throw new Error("Failed to fetch surah text");
    const json: QuranApiResponse<SurahDetail> = await res.json();
    return json.data;
  } catch (error) {
    console.error(`Error fetching surah ${id}:`, error);
    return null;
  }
}

/**
 * Fetches Tafsir Al-Muyassar for a specific Surah
 */
export async function getSurahTafsir(id: string | number): Promise<SurahDetail | null> {
  try {
    const res = await fetch(`${BASE_URL}/surah/${id}/ar.muyassar`);
    if (!res.ok) throw new Error("Failed to fetch surah tafsir");
    const json: QuranApiResponse<SurahDetail> = await res.json();
    return json.data;
  } catch (error) {
    console.error(`Error fetching tafsir for surah ${id}:`, error);
    return null;
  }
}

/**
 * Helper to convert english numbers to arabic numbers
 */
export function toArabicNumber(str: string | number) {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.toString().replace(/[0-9]/g, function (w) {
    return arabicNumbers[+w];
  });
}

export const SURAH_NAMES = [
  "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام", "الأعراف", "الأنفال", "التوبة", "يونس",
  "هود", "يوسف", "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف", "مريم", "طه",
  "الأنبياء", "الحج", "المؤمنون", "النور", "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
  "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس", "الصافات", "ص", "الزمر", "غافر",
  "فصلت", "الشورى", "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح", "الحجرات", "ق",
  "الذاريات", "الطور", "النجم", "القمر", "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة",
  "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم", "الملك", "القلم", "الحاقة", "المعارج",
  "نوح", "الجن", "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ", "النازعات", "عبس",
  "التكوير", "الانفطار", "المطففين", "الانشقاق", "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
  "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق", "القدر", "البينة", "الزلزلة", "العاديات",
  "القارعة", "التكاثر", "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر", "الكافرون", "النصر",
  "المسد", "الإخلاص", "الفلق", "الناس"
];
