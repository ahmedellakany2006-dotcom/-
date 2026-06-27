import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { scholars } from "@/lib/scholarsData";
import { PlayCircle } from "lucide-react";

export default function ScholarsIndexPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 py-12 pt-32 min-h-screen relative overflow-hidden">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">دليل القراء</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              استمع إلى تلاوات خاشعة من القرآن الكريم بأصوات كبار قراء العالم الإسلامي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scholars.map((scholar) => (
              <Link key={scholar.id} href={`/scholars/${scholar.id}`}>
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-primary/10 hover:border-primary/30 flex flex-col h-full transform hover:-translate-y-2 text-center">
                  <div className="relative pt-8 pb-4 bg-gradient-to-br from-primary/5 to-transparent">
                    {/* Background Decor */}
                    <div className="absolute top-0 inset-x-0 h-24 bg-primary/5 rounded-b-[50%]" />
                    
                    <div className="relative w-32 h-32 mx-auto rounded-full p-1 bg-white shadow-lg border border-primary/20 group-hover:scale-105 transition-transform duration-500">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={scholar.image} 
                        alt={scholar.name} 
                        className="w-full h-full object-cover object-top rounded-full"
                      />
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md scale-0 group-hover:scale-100 transition-transform duration-300">
                        <PlayCircle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 pb-8 pt-2 flex-1 flex flex-col">
                    <h2 className="text-2xl font-bold text-primary mb-3">
                      {scholar.name}
                    </h2>
                    <p className="text-foreground/70 leading-relaxed text-sm">
                      {scholar.bio}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
