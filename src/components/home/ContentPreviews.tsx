"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Users, History, Library, Sparkles } from "lucide-react";

const sections = [
  {
    title: "القرآن الكريم",
    description: "تصفح واستمع إلى تلاوات خاشعة من القرآن الكريم بمختلف الروايات والقراءات.",
    icon: BookOpen,
    href: "/quran",
    gradient: "from-emerald-600 to-emerald-400",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "التاريخ الإسلامي",
    description: "استكشف أحداث التاريخ الإسلامي العظيم من العهد النبوي وحتى عصرنا الحاضر.",
    icon: History,
    href: "/history",
    gradient: "from-amber-600 to-amber-400",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "دليل القراء",
    description: "تعرف على سير القراء واستمع إلى تلاواتهم القيمة.",
    icon: Users,
    href: "/scholars",
    gradient: "from-blue-600 to-blue-400",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "المكتبة",
    description: "مكتبة ضخمة تضم أهم الكتب والمراجع في التفسير والحديث والفقه والعقيدة.",
    icon: Library,
    href: "/books",
    gradient: "from-purple-600 to-purple-400",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  }
];

export function ContentPreviews() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
              <Sparkles className="w-4 h-4" />
              أقسام الموقع
            </span>
          </div>
          <h2 className="text-4xl font-bold text-primary dark:text-emerald-400 mb-4">محتوى غني ومتنوع</h2>
          <p className="text-lg text-foreground/70 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            اكتشف محتوانا الغني الذي يغطي كافة جوانب الدين الإسلامي الحنيف، المصمم بعناية ليناسب احتياجات المسلم المعاصر.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group rounded-[2rem] overflow-hidden bg-white dark:bg-gray-800 border border-primary/10 hover:border-primary/30 shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              <div className={`h-48 relative overflow-hidden bg-gradient-to-br ${section.gradient} p-6 flex flex-col justify-end`}>
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />
                
                {/* Large Background Icon */}
                <section.icon className="absolute -bottom-8 -right-8 w-40 h-40 text-white opacity-20 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" />
                
                <div className="relative z-10 flex items-center justify-between w-full">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 text-white">
                    <section.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white drop-shadow-md">{section.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <p className="text-foreground/70 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                  {section.description}
                </p>
                <Link 
                  href={section.href}
                  className="inline-flex items-center text-primary font-bold hover:text-secondary dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                >
                  استكشف القسم
                  <svg className="w-5 h-5 mr-2 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
