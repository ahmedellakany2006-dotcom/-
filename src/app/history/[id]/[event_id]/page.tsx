import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getEraById, getEventById } from "@/lib/historyData";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

// Note: Next 15+ async params
export default async function HistoryArticlePage({ params }: { params: Promise<{ id: string; event_id: string }> }) {
  const resolvedParams = await params;
  const era = getEraById(resolvedParams.id);
  const event = getEventById(resolvedParams.id, resolvedParams.event_id);

  if (!era || !event) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-white flex flex-col items-center justify-center min-h-screen">
          <p className="text-red-500 font-bold text-xl">لم يتم العثور على المقال المطلوب.</p>
          <Link href="/history" className="mt-4 text-primary hover:underline">العودة للتاريخ الإسلامي</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-gray-50 min-h-screen pb-20 pt-32">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-foreground/60 mb-8">
            <Link href="/history" className="hover:text-primary transition-colors">التاريخ الإسلامي</Link>
            <span>/</span>
            <Link href={`/history/${era.id}`} className="hover:text-primary transition-colors">{era.title}</Link>
            <span>/</span>
            <span className="text-primary font-bold">{event.title}</span>
          </div>

          {/* Article Header */}
          <article className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-primary/10 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[100%] pointer-events-none" />
            
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-primary font-bold bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Clock className="w-5 h-5" />
                {event.year}
              </span>
              
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {event.title}
              </h1>
              
              <p className="text-xl text-primary font-semibold mb-10 border-r-4 border-primary pr-4">
                {event.summary}
              </p>

              {/* Content Body */}
              <div className="prose prose-lg max-w-none text-foreground/80 leading-loose">
                {event.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 text-lg md:text-xl text-justify">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center relative z-10">
              <Link 
                href={`/history/${era.id}`}
                className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary font-bold transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
                العودة إلى {era.title}
              </Link>
              
              <div className="flex items-center gap-2 text-primary/30">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
