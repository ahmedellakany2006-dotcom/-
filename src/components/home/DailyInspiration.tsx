"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const verses = [
  { text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا * وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ", ref: "سورة الطلاق - الآية ٢-٣" },
  { text: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا * إِنَّ مَعَ الْعُسْرِ يُسْرًا", ref: "سورة الشرح - الآية ٥-٦" },
  { text: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ", ref: "سورة البقرة - الآية ٢٨٦" },
  { text: "وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ ۚ", ref: "سورة غافر - الآية ٦٠" },
  { text: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", ref: "سورة الرعد - الآية ٢٨" },
  { text: "إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا", ref: "سورة الأحزاب - الآية ٥٦" },
  { text: "وَسَارِعُوا إِلَىٰ مَغْفِرَةٍ مِّن رَّبِّكُمْ وَجَنَّةٍ عَرْضُهَا السَّمَاوَاتُ وَالْأَرْضُ أُعِدَّتْ لِلْمُتَّقِينَ", ref: "سورة آل عمران - الآية ١٣٣" }
];

const hadiths = [
  { text: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ", ref: "رواه مسلم" },
  { text: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى", ref: "رواه البخاري ومسلم" },
  { text: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ", ref: "رواه البخاري" },
  { text: "كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ، ثَقِيلَتَانِ فِي الْمِيزَانِ، حَبِيبَتَانِ إِلَى الرَّحْمَنِ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ", ref: "رواه البخاري ومسلم" },
  { text: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعِ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ", ref: "رواه الترمذي" },
  { text: "المُسْلِمُ مَنْ سَلِمَ المُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ", ref: "رواه البخاري" },
  { text: "لا يُؤْمِنُ أحَدُكُمْ، حتَّى يُحِبَّ لأخِيهِ ما يُحِبُّ لِنَفْسِهِ", ref: "رواه البخاري ومسلم" }
];

export function DailyInspiration() {
  const [dailyVerse, setDailyVerse] = useState(verses[0]);
  const [dailyHadith, setDailyHadith] = useState(hadiths[0]);

  useEffect(() => {
    // Generate a consistent index based on the current day of the month
    const today = new Date().getDate();
    const verseIndex = today % verses.length;
    const hadithIndex = today % hadiths.length;
    
    setDailyVerse(verses[verseIndex]);
    setDailyHadith(hadiths[hadithIndex]);
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Daily Verse */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow border border-primary/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="p-3 bg-primary/10 dark:bg-emerald-500/20 rounded-2xl text-primary dark:text-emerald-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-primary dark:text-emerald-400">آية اليوم</h2>
            </motion.div>
            <div className="text-center py-6 min-h-[150px] flex flex-col justify-center">
              <p className="text-2xl md:text-3xl font-bold leading-loose text-foreground dark:text-white mb-6 font-['Amiri',serif]">
                "{dailyVerse.text}"
              </p>
              <p className="text-foreground/60 dark:text-gray-400 text-lg">{dailyVerse.ref}</p>
            </div>
          </motion.div>

          {/* Daily Hadith */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow border border-primary/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary" />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="p-3 bg-secondary/10 dark:bg-amber-500/20 rounded-2xl text-secondary dark:text-amber-400">
                <span className="text-2xl">📜</span>
              </div>
              <h2 className="text-2xl font-bold text-secondary dark:text-amber-400">حديث اليوم</h2>
            </motion.div>
            <div className="text-center py-6 min-h-[150px] flex flex-col justify-center">
              <p className="text-xl md:text-2xl font-medium leading-loose text-foreground dark:text-white mb-6">
                "{dailyHadith.text}"
              </p>
              <p className="text-foreground/60 dark:text-gray-400 text-lg">{dailyHadith.ref}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
