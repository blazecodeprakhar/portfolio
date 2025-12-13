"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const photos = [
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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll(".gallery-item");
          items.forEach((el, i) =>
            setTimeout(() => el.classList.add("animate-fade-in"), i * 120)
          );
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "auto";
  }, [active]);

  return (
<section
  id="gallery"
  className="pt-12 md:pt-16 pb-20 md:pb-24 bg-gradient-to-b from-background to-muted/30"
>

      <div className="container mx-auto px-4 md:px-6">
        <div ref={sectionRef}>
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-3">
            Photography
          </h2>
          <p className="text-muted-foreground text-center mb-16">
            A glimpse into my creative vision
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="gallery-item opacity-0 cursor-pointer group"
                onClick={() => setActive(index)}
              >
                <div
                  className="
                    relative aspect-square rounded-2xl overflow-hidden
                    bg-white/5 backdrop-blur-xl
                    border border-white/10
                    shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                  "
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="
                      w-full h-full object-cover
                      transition-transform duration-700
                      group-hover:scale-110
                    "
                  />

                  {/* Overlay */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t from-black/90 via-black/40 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                      flex items-end p-6
                    "
                  >
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        {photo.title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        Click to view
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/95
            flex items-center justify-center
            px-4 py-6
          "
          onClick={() => setActive(null)}
        >
          <button
            className="
              absolute top-5 right-5
              p-2 rounded-full
              bg-white/10 hover:bg-white/20
              transition
            "
            onClick={() => setActive(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-2xl overflow-hidden mb-6">
              <img
                src={photos[active].image}
                alt={photos[active].title}
                className="w-full h-[60vh] object-contain"
              />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2 text-center">
              {photos[active].title}
            </h3>
            <p className="text-gray-300 text-center max-w-2xl mx-auto">
              {photos[active].description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
