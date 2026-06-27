export interface Scholar {
  id: string;
  name: string;
  image: string;
  bio: string;
  audioServer: string;
}

export const scholars: Scholar[] = [
  {
    id: "alafasy",
    name: "مشاري بن راشد العفاسي",
    image: "https://www.tvquran.com/uploads/authors/images/%D9%85%D8%B4%D8%A7%D8%B1%D9%8A%20%D8%A7%D9%84%D8%B9%D9%81%D8%A7%D8%B3%D9%8A.jpg",
    bio: "إمام وخطيب مسجد الدولة الكبير بدولة الكويت. يتميز بصوت عذب وإتقان لأحكام التلاوة، وله إصدارات إنشادية وقرآنية واسعة الانتشار عالمياً.",
    audioServer: "https://server8.mp3quran.net/afs/"
  },
  {
    id: "abdulbasit",
    name: "عبد الباسط عبد الصمد",
    image: "https://www.tvquran.com/uploads/authors/images/%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D8%A8%D8%A7%D8%B3%D8%B7%20%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D8%B5%D9%85%D8%AF.jpg",
    bio: "صاحب الحنجرة الذهبية وأحد أشهر قراء القرآن الكريم في العالم الإسلامي. يتميز بقوة الصوت وجمال التلاوة، وهو أول نقيب لقراء مصر.",
    audioServer: "https://server7.mp3quran.net/basit/"
  },
  {
    id: "alminshawi",
    name: "محمد صديق المنشاوي",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Elminshwey.jpg",
    bio: "أحد أعلام قراء مصر البارزين، اشتهر بقراءته الخاشعة والمبكية. نشأ في عائلة قرآنية عريقة وأتم حفظ القرآن في سن مبكرة.",
    audioServer: "https://server10.mp3quran.net/minsh/"
  },
  {
    id: "alhusary",
    name: "محمود خليل الحصري",
    image: "https://www.tvquran.com/uploads/authors/images/%D9%85%D8%AD%D9%85%D9%88%D8%AF%20%D8%AE%D9%84%D9%8A%D9%84%20%D8%A7%D9%84%D8%AD%D8%B5%D8%B1%D9%8A.jpg",
    bio: "شيخ عموم المقارئ المصرية الأسبق. يُعد أول من سجل المصحف المرتل في الإذاعة المصرية، وتميز بدقة الأحكام والترتيل المتقن.",
    audioServer: "https://server13.mp3quran.net/husr/"
  },
  {
    id: "almuaiqly",
    name: "ماهر المعيقلي",
    image: "https://www.tvquran.com/uploads/authors/images/%D9%85%D8%A7%D9%87%D8%B1%20%D8%A7%D9%84%D9%85%D8%B9%D9%8A%D9%82%D9%84%D9%8A.jpg",
    bio: "إمام وخطيب المسجد الحرام. يتميز بصوته الرخيم والخشوع في التلاوة، وله ملايين المتابعين والمستمعين حول العالم.",
    audioServer: "https://server12.mp3quran.net/maher/"
  },
  {
    id: "aldosari",
    name: "ياسر الدوسري",
    image: "https://www.tvquran.com/uploads/authors/images/%D9%8A%D8%A7%D8%B3%D8%B1%20%D8%A7%D9%84%D8%AF%D9%88%D8%B3%D8%B1%D9%8A.jpg",
    bio: "إمام الحرم المكي الشريف وأحد القراء البارزين في المملكة العربية السعودية. عُرف بتلاوته الحجازية المؤثرة والمتميزة.",
    audioServer: "https://server11.mp3quran.net/yasser/"
  },
  {
    id: "alghamdi",
    name: "سعد الغامدي",
    image: "https://www.tvquran.com/uploads/authors/images/%D8%B3%D8%B9%D8%AF%20%D8%A7%D9%84%D8%BA%D8%A7%D9%85%D8%AF%D9%8A.jpg",
    bio: "قارئ من المملكة العربية السعودية، وإمام مسجد كانو سابقاً. يمتلك صوتاً مميزاً وتلاوة هادئة مريحة للقلوب.",
    audioServer: "https://server7.mp3quran.net/s_gmd/"
  },
  {
    id: "faresabbad",
    name: "فارس عباد",
    image: "https://www.tvquran.com/uploads/authors/images/%D9%81%D8%A7%D8%B1%D8%B3%20%D8%B9%D8%A8%D8%A7%D8%AF.jpg",
    bio: "أحد القراء اليمنيين المعاصرين، اشتهر بصوته الشجي والندي الذي يبعث على الخشوع والسكينة في النفوس، وله شعبية واسعة في العالم الإسلامي.",
    audioServer: "https://server8.mp3quran.net/frs_a/"
  }
];

export function getScholarById(id: string): Scholar | undefined {
  return scholars.find(s => s.id === id);
}

export function formatSurahNumber(num: number): string {
  return String(num).padStart(3, '0');
}
