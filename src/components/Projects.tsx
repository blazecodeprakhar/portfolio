import { ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";

const projects = [
  {
    title: "Territory Clash",
    description:
      "A fast-paced territory capture game built by BlazeForge. Conquer land, protect your trail, and dominate the map!",
    link: "https://territory-clash.netlify.app/",
    image: "/assets/territory-clash.png", // ✅ banner image
  },
  {
    title: "BlazeForge Portfolio",
    description:
      "Old version of my responsive personal portfolio website showcasing my work and skills.",
    link: "https://blazecodeprakhar.github.io/blazeforge/",
    image: "/assets/BlazeForgeold.png", // ✅ banner image
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".project-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-fade-in");
              }, index * 150);
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

  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div ref={sectionRef}>
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            Projects
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="project-card opacity-0 glass rounded-2xl overflow-hidden hover:scale-[1.03] transition-all duration-300 group shadow-lg"
              >
                {/* --- Project Banner Image --- */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {project.title}
                    </span>
                  </div>
                </div>

                {/* --- Project Details --- */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-lg font-semibold hover:scale-105 transition-transform"
                  >
                    <span>View Project</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
