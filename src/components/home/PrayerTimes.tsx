"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Loader2 } from "lucide-react";

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export function PrayerTimesWidget() {
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("جارٍ تحديد الموقع...");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=4`
            );
            const data = await res.json();
            
            setLocation("موقعك الحالي");
            
            setTimes({
              Fajr: data.data.timings.Fajr,
              Dhuhr: data.data.timings.Dhuhr,
              Asr: data.data.timings.Asr,
              Maghrib: data.data.timings.Maghrib,
              Isha: data.data.timings.Isha,
            });
          } catch (e) {
            console.error("Error fetching prayer times", e);
          } finally {
            setLoading(false);
          }
        },
        () => {
          // Fallback
          setLocation("مكة المكرمة (افتراضي)");
          fetch("https://api.aladhan.com/v1/timingsByCity?city=Makkah&country=Saudi%20Arabia&method=4")
            .then(res => res.json())
            .then(data => {
              setTimes({
                Fajr: data.data.timings.Fajr,
                Dhuhr: data.data.timings.Dhuhr,
                Asr: data.data.timings.Asr,
                Maghrib: data.data.timings.Maghrib,
                Isha: data.data.timings.Isha,
              });
              setLoading(false);
            });
        }
      );
    }
  }, []);

  const prayerNames = [
    { key: "Fajr", name: "الفجر" },
    { key: "Dhuhr", name: "الظهر" },
    { key: "Asr", name: "العصر" },
    { key: "Maghrib", name: "المغرب" },
    { key: "Isha", name: "العشاء" },
  ];

  return (
    <section className="py-16 bg-white border-b border-primary/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-primary mb-2 flex justify-center items-center gap-2"
          >
            <Clock className="w-8 h-8" />
            مواقيت الصلاة
          </motion.h2>
          <p className="text-foreground/70 flex justify-center items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
            {prayerNames.map((prayer, i) => (
              <motion.div
                key={prayer.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center border border-primary/20 shadow-sm hover:shadow-md hover:border-primary/50 transition-all group"
              >
                <h3 className="text-lg font-bold text-foreground/80 mb-2 group-hover:text-primary transition-colors">{prayer.name}</h3>
                <p className="text-3xl font-light text-primary" dir="ltr">
                  {times?.[prayer.key as keyof PrayerTimes]}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
