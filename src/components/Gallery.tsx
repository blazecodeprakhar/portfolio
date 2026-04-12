"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Camera, Image as ImageIcon } from "lucide-react";

export const photos = [
  {
    id: 1,
    title: "The Midnight Wish",
    description: "There Goes My Wish! Blink and You’ll Miss It!",
    image: "assets/IMG_20240906_001512.png",
  },
  {
    id: 2,
    title: "Cosmic Revelation",
    description:
      "The celestial tapestry is torn open, letting distant worlds spill through heavy clouds.",
    image: "assets/IMG_20240506_230425.jpg",
  },
  {
    id: 3,
    title: "Galactic Gems",
    description:
      "A visual guide of the night sky showing Betelgeuse, Orion’s Belt, and Venus.",
    image: "assets/IMG_20240508_120453.jpg",
  },
  {
    id: 4,
    title: "Chasing the Horizon",
    description:
      "Moving forward into fading light, leaving motion and memory behind.",
    image: "assets/IMG_20240507_224945.jpg",
  },
  {
    id: 5,
    title: "Sunset Signal",
    description:
      "Technology rising against the raw beauty of the twilight sky.",
    image: "assets/IMG_20240601_145021.jpg",
  },
  {
    id: 6,
    title: "Nature’s Window",
    description:
      "Where green earth meets a dramatic evening sky.",
    image: "assets/IMG_20240621_224706.jpg",
  },
];

const Gallery = () => {
  const [active, setActive] = useState<number | null>(null);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (active !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [active]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="gallery"
      className="relative pt-24 md:pt-32 pb-20 md:pb-28 bg-[#0a0a10] overflow-hidden"
    >
      {/* Subtle Background Elements - Hide smoothly when modal uncovers */}
      <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 ${active !== null ? 'opacity-0' : 'opacity-100'}`} />
      <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-600/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 transition-opacity duration-700 ${active !== null ? 'opacity-0' : 'opacity-100'}`} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={headerVariants} className="text-center mb-16 md:mb-20">
            <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-purple-400 uppercase mb-3 flex items-center justify-center gap-2">
              <Camera className="w-4 h-4" /> Visual Gallery
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-violet-400 drop-shadow-[0_0_15px_rgba(180,80,255,0.3)]">Photography</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A curated collection of moments, capturing the awe of technology, nature, and the vast night sky.
            </p>
          </motion.div>

          {/* Masonry Layout via CSS columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="break-inside-avoid relative rounded-[1.5rem] overflow-hidden group cursor-pointer border border-white/[0.05] bg-white/[0.02] shadow-xl hover:shadow-[0_0_40px_rgba(180,80,255,0.15)] hover:border-purple-500/40 transition-all duration-500"
                onClick={() => setActive(index)}
              >
                {/* Image scales up slightly on hover */}
                <div className="overflow-hidden bg-[#07070d]">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-auto object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                  />
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070d] via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  {/* Sliding Text Content */}
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="flex items-center gap-2 mb-2 opacity-80">
                      <ImageIcon className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-purple-300">Highlight</span>
                    </div>
                    <h4 className="text-white font-bold text-xl mb-1.5 drop-shadow-md">{photo.title}</h4>
                    <p className="text-gray-300 text-sm line-clamp-2 drop-shadow-sm font-light leading-relaxed">
                      {photo.description}
                    </p>
                  </div>
                </div>

                {/* Center Hover Action Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="bg-black/40 backdrop-blur-md p-4 rounded-full border border-white/20 text-white scale-75 group-hover:scale-100 transition-transform duration-500 delay-75 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <ZoomIn className="w-6 h-6 text-purple-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Advanced Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActive(null)}
          >
            {/* Extremely dark blurred backdrop */}
            <div className="absolute inset-0 bg-[#07070d]/98 backdrop-blur-2xl" />
            
            {/* Fixed Close Button - Safe padding */}
            <button 
              onClick={() => setActive(null)} 
              className="fixed top-4 right-4 md:top-8 md:right-8 p-3 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 hover:bg-white/20 text-white transition-all z-50 group hover:-translate-y-1 shadow-lg"
              aria-label="Close lightbox"
            >
                <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Modal Content Structure */}
            <motion.div 
               initial={{ scale: 0.9, y: 20, opacity: 0 }}
               animate={{ scale: 1, y: 0, opacity: 1 }}
               exit={{ scale: 0.95, y: -20, opacity: 0 }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               className="relative z-10 flex flex-col items-center justify-center max-h-[90vh] max-w-7xl w-full"
               onClick={(e) => e.stopPropagation()}
            >
               {/* Image Wrapper (Fits to content natively) */}
               <div className="relative rounded-xl overflow-hidden shadow-[0_0_60px_rgba(180,80,255,0.15)] flex-shrink-1">
                  <img 
                    src={photos[active].image} 
                    alt={photos[active].title}
                    className="max-w-full max-h-[65vh] md:max-h-[75vh] object-contain rounded-xl select-none" 
                  />
               </div>

               {/* Caption Text Box */}
               <motion.div 
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="mt-6 md:mt-8 text-center px-4 flex-shrink-0"
                >
                  <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-violet-400 mb-2 md:mb-3 drop-shadow-sm">
                    {photos[active].title}
                  </h3>
                  <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
                    {photos[active].description}
                  </p>
               </motion.div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
