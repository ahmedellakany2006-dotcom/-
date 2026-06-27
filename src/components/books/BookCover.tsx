import React from 'react';

interface BookCoverProps {
  title: string;
  author: string;
  color: string;
  pattern?: string;
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({ title, author, color, pattern = 'pattern-1', className = '' }) => {
  return (
    <div 
      className={`relative w-full h-full rounded-r-2xl rounded-l-md shadow-[inset_4px_0_10px_rgba(0,0,0,0.5)] overflow-hidden ${className}`}
      style={{ backgroundColor: color }}
    >
      {/* Leather Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Book Spine Shadow */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      <div className="absolute left-1 top-0 bottom-0 w-[2px] bg-white/10" />
      <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-black/30" />

      {/* Gold Borders */}
      <div className="absolute inset-3 border-2 border-[#D4AF37]/40 rounded-sm" />
      <div className="absolute inset-4 border border-[#D4AF37]/30 rounded-sm" />

      {/* Corner Ornaments */}
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60" />
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60" />

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
        <div className="w-full flex-1 flex flex-col items-center justify-center gap-6">
          {/* Top Ornament */}
          <div className="w-16 h-8 opacity-80" style={{
            backgroundImage: `radial-gradient(circle at 50% 100%, transparent 40%, #D4AF37 40%, #D4AF37 45%, transparent 45%), radial-gradient(circle at 50% 100%, transparent 55%, #D4AF37 55%, #D4AF37 60%, transparent 60%)`,
            backgroundSize: '100% 100%',
          }} />
          
          <h3 className="text-2xl md:text-3xl font-bold text-[#FFDF73] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-tight" style={{ fontFamily: 'var(--font-amiri)' }}>
            {title}
          </h3>
          
          <p className="text-[#D4AF37] text-sm md:text-base font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] px-4 py-1 border-t border-b border-[#D4AF37]/40">
            {author}
          </p>

          {/* Bottom Ornament */}
          <div className="w-16 h-8 opacity-80" style={{
            backgroundImage: `radial-gradient(circle at 50% 0%, transparent 40%, #D4AF37 40%, #D4AF37 45%, transparent 45%), radial-gradient(circle at 50% 0%, transparent 55%, #D4AF37 55%, #D4AF37 60%, transparent 60%)`,
            backgroundSize: '100% 100%',
          }} />
        </div>
      </div>
    </div>
  );
};
