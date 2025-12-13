import { useEffect, useRef } from "react";
import { ProjectCard } from "@/components/ui/project-card";

const projects = [
  {
    title: "BrightSmile Dental",
    description:
      "This website supports multiple languages with full online appointment and patient interaction features.",
    link: "https://brightsmileee.netlify.app/",
    image:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Territory Clash",
    description:
      "A fast-paced territory capture game built by prakhar.dev. Conquer land, protect your trail, and dominate the map!",
    link: "https://territory-clash.netlify.app/",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Sagar Fitness",
    description:
      "Sagar Fitness – Online Fitness Coaching & Transformation Website",
    link: "https://sagarfitness.netlify.app/",
    image:
      "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?q=80&w=2070&auto=format&fit=crop",
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
  id="projects"
  className="pt-20 md:pt-24 pb-12 md:pb-16 bg-background"
>

      <div className="container mx-auto px-4 md:px-6">
        <div ref={sectionRef}>
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            Projects
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                className="project-card opacity-0"
                title={project.title}
                description={project.description}
                imgSrc={project.image}
                link={project.link}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
