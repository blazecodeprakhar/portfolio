import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/ui/project-card";
import { ArrowRight } from "lucide-react";
import { useImagePreloader } from "@/hooks/use-image-preloader";

const allProjects = [
  {
    title: "AskAI - Intelligent Chat SaaS",
    description: "A full-stack AI chat application using React, TypeScript, and Supabase, integrated with Google Gemini AI for smart conversations and document understanding.",
    link: "https://askaichat.netlify.app/",
    image: "/assets/askai.png",
  },
  {
    title: "RenTelMe",
    description: "Developed a full-stack premium rental web app featuring secure property listings, community insights, and a modern responsive UI. (Work in Progress)",
    link: "#",
    image: "/assets/rentelme.png",
    linkText: "SOON",
  },
  {
    title: "BrightSmile Dental",
    description:
      "This website supports multiple languages with full online appointment and patient interaction features.",
    link: "https://brightsmileee.netlify.app/",
    image: "/assets/brightsmile-dental.png",
  },
  {
    title: "Territory Clash",
    description:
      "A fast-paced territory capture game built by prakhar.dev. Conquer land, protect your trail, and dominate the map!",
    link: "https://territory-clash-v2.netlify.app/",
    image: "/assets/territory-clash.png",
  },
  {
    title: "RAVVIK Global Solutions",
    description: "Built a responsive website for RAVVIK Global Solutions, showcasing indigenous defence technologies, products, and capabilities.",
    link: "https://ravvik.com/",
    image: "/assets/ravvik.png",
  },
  {
    title: "Elegant Spaces",
    description: "A luxury interior design studio website featuring service sections, portfolio gallery, testimonials, FAQ, and consultation booking—built with a clean modern UI and responsive design.",
    link: "https://elegantzspaces.netlify.app/",
    image: "/assets/elegant-spaces.jpg",
  },
  {
    title: "Sagar Fitness",
    description:
      "Sagar Fitness – Online Fitness Coaching & Transformation Website",
    link: "https://sagarfitnessdemo.netlify.app/",
    image: "/assets/sagar-fitness.png",
  },
  {
    title: "AI Image Generator",
    description: "An AI-powered image generation tool that creates unique artwork from text prompts using advanced diffusion models.",
    link: "https://blazecodeprakhar.github.io/ai-art-generator/",
    image: "/assets/ai-image-generator.png",
  },
  {
    title: "Universal Video Downloader",
    description: "A powerful, production-ready video downloader for YouTube and Instagram. Built with Node.js, Express, and yt-dlp, featuring a modern, fully responsive UI.",
    link: "https://universal-video-downloader-production.up.railway.app/",
    image: "/assets/universal-video-downloader.png",
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState(allProjects.slice(0, 3));
  const [isAnimating, setIsAnimating] = useState(false);

  // Preload all project images for smooth transitions
  useImagePreloader(allProjects.map((p) => p.image));

  // Auto-rotate projects every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setStartIndex((prev) => prev + 1); // Trigger update
        setIsAnimating(false);
      }, 500); // Wait for fade out
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevIndicesRef = useRef<number[]>([]);

  // Update visible projects when startIndex changes (randomly select 3)
  useEffect(() => {
    let indices: number[] = [];
    let attempts = 0;

    do {
      const newSet = new Set<number>();
      while (newSet.size < 3) {
        newSet.add(Math.floor(Math.random() * allProjects.length));
      }
      indices = Array.from(newSet);

      // Check if identical to previous
      const isSame =
        prevIndicesRef.current.length === 3 &&
        indices.every((val) => prevIndicesRef.current.includes(val));

      if (!isSame || allProjects.length <= 3) break;
      attempts++;
    } while (attempts < 10);

    prevIndicesRef.current = indices;
    const items = indices.map((index) => allProjects[index]);
    setVisibleProjects(items);
  }, [startIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".project-card");
            cards.forEach((card, index) => {
              card.classList.remove("opacity-0");
              card.classList.add("animate-fade-in");
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [visibleProjects]); // Re-run observer when projects change

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

          <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${startIndex}-${index}`}
                className="project-card" // Removed opacity-0 here to let the state transition handle it better, or keep it for initial load
                title={project.title}
                description={project.description}
                imgSrc={project.image}
                link={project.link}
                linkText={project.linkText}
              />
            ))}
          </div>

          <div className="flex justify-center mt-12 project-card">
            <a
              href="/projects"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>See More Projects</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
