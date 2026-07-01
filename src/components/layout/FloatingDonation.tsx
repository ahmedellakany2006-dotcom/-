'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Copy, CheckCircle2 } from 'lucide-react';

export function FloatingDonation() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const instapayNumber = "01119385138";

  const handleCopy = () => {
    navigator.clipboard.writeText(instapayNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white rounded-3xl shadow-2xl border border-primary/20 p-6 mb-4 w-[280px] overflow-hidden pointer-events-auto"
          >
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 fill-primary/20" />
              </div>
              <h3 className="font-bold text-lg text-primary mb-1">دعم الموقع</h3>
              <p className="text-xs text-foreground/60 leading-relaxed">
                تبرعك يساعدنا على استمرار وتطوير الموقع. يمكنك التبرع عبر انستاباي (Instapay)
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col items-center mb-4 border border-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${instapayNumber}`} 
                alt="Instapay QR Code" 
                className="w-32 h-32 mb-3 rounded-lg mix-blend-multiply"
              />
              <div className="text-sm font-bold text-foreground mb-1">رقم انستاباي:</div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200 w-full justify-between">
                <span className="font-mono text-primary font-bold tracking-wider">{instapayNumber}</span>
                <button onClick={handleCopy} className="text-gray-400 hover:text-primary transition-colors">
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <p className="text-[10px] text-center text-gray-400">
              استخدم كاميرا الموبايل لمسح الكود أو قم بنسخ الرقم للتحويل المباشر
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary hover:bg-primary/90 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 pointer-events-auto"
        title="دعم الموقع"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Heart className="w-6 h-6" />}
      </button>
    </div>
  );
}
