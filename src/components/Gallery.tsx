import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

// Updated photo list
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
      "The celestial tapestry is torn open, letting the bright light of distant worlds spill through the heavy clouds.",
    image: "assets/IMG_20240506_230425.jpg",
  },
  {
    id: 3,
    title: "Galactic Gems",
    description:
      "A perfect visual guide to a section of the night sky, showcasing Betelgeuse, Orion's Belt, and Venus in one frame.",
    image: "assets/IMG_20240508_120453.jpg",
  },
  {
    id: 4,
    title: "Chasing the Horizon",
    description:
      "Pushing ahead into the soft light of the fading day, leaving a streak of motion blur behind.",
    image: "assets/IMG_20240507_224945.jpg",
  },
  {
    id: 5,
    title: "Sunset Signal",
    description:
      "The technological reach of man rises to meet the stunning, untamed beauty of the twilight sky.",
    image: "assets/IMG_20240601_145021.jpg",
  },
  {
    id: 6,
    title: "Nature's Window",
    description:
      "A peaceful view where the vibrant green earth meets the dramatic, soft glow of the evening sky.",
    image: "assets/IMG_20240621_224706.jpg",
  },
];

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".gallery-item");
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("animate-fade-in");
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedPhoto !== null ? "hidden" : "unset";
  }, [selectedPhoto]);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={sectionRef}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Photography
          </h2>
          <p className="text-muted-foreground text-center mb-16">
            A glimpse into my creative vision
          </p>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="gallery-item opacity-0 group cursor-pointer"
                onClick={() => setSelectedPhoto(index)}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden glass shadow-lg">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div>
                      <p className="text-white font-bold text-xl mb-1">
                        {photo.title}
                      </p>
                      <p className="text-white/80 text-sm">Click to view</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-accent/20 transition-colors"
            onClick={() => setSelectedPhoto(null)}
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <div
            className="max-w-4xl w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video rounded-2xl overflow-hidden glass mb-6 flex items-center justify-center">
              <img
                src={photos[selectedPhoto].image}
                alt={photos[selectedPhoto].title}
                className="object-contain w-full h-full"
              />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              {photos[selectedPhoto].title}
            </h3>
            <p className="text-gray-300">{photos[selectedPhoto].description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
