import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-primary/20 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-3xl font-bold text-primary flex items-center gap-2 mb-4">
              <span className="text-secondary">🕌</span>
              قد أفلح المؤمنون
            </Link>
            <p className="text-foreground/70 mb-6 max-w-md">
              منصة إسلامية متكاملة تهدف إلى نشر العلم النافع، وتوفير بيئة نقية للمسلمين للتواصل، والتعلم، وتدارس القرآن الكريم والتاريخ الإسلامي.
            </p>
            <div className="text-primary font-semibold">
              ﴿ قَدْ أَفْلَحَ الْمُؤْمِنُونَ * الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ ﴾
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              <li><Link href="/quran" className="text-foreground/70 hover:text-primary transition-colors">القرآن الكريم</Link></li>
              <li><Link href="/books" className="text-foreground/70 hover:text-primary transition-colors">المكتبة</Link></li>
              <li><Link href="/scholars" className="text-foreground/70 hover:text-primary transition-colors">دليل القراء</Link></li>
              <li><Link href="/history" className="text-foreground/70 hover:text-primary transition-colors">التاريخ الإسلامي</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">المساعدة</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-foreground/70 hover:text-primary transition-colors">من نحن</Link></li>
              <li><Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors">اتصل بنا</Link></li>
              <li><Link href="/privacy" className="text-foreground/70 hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="/terms" className="text-foreground/70 hover:text-primary transition-colors">شروط الاستخدام</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-primary/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/60 text-sm">
            © {new Date().getFullYear()} قد أفلح المؤمنون. جميع الحقوق محفوظة.
          </p>
          <p className="text-foreground/60 text-sm flex items-center gap-1">
            صُنع بحب <Heart className="w-4 h-4 text-red-500 fill-red-500" /> للمسلمين
          </p>
        </div>
      </div>
    </footer>
  );
}
