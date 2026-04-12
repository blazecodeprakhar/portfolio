import { useEffect, useState, useRef } from "react";
import { ProjectCard } from "@/components/ui/project-card";
import { ArrowRight, Code2 } from "lucide-react";
import { useImagePreloader } from "@/hooks/use-image-preloader";
import { motion, AnimatePresence } from "framer-motion";

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
  const [startIndex, setStartIndex] = useState(0);
  const [visibleProjects, setVisibleProjects] = useState(allProjects.slice(0, 3));
  const prevIndicesRef = useRef<number[]>([]);

  // Preload all project images for smooth transitions
  useImagePreloader(allProjects.map((p) => p.image));

  // Auto-rotate projects every 12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => prev + 1);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section
      id="projects"
      className="relative pt-24 md:pt-32 pb-20 md:pb-28 bg-[#0a0a10] overflow-hidden"
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-fuchsia-600/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div variants={headerVariants} className="text-center mb-16 md:mb-20">
            <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#BD4FF4] uppercase mb-3 flex items-center justify-center gap-2">
              <Code2 className="w-4 h-4" /> Portfolio
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-[#BD4FF4] to-violet-400 drop-shadow-[0_0_15px_rgba(189,79,244,0.3)]">Works</span>
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
              A curated showcase of full-stack applications, interactive experiences, and digital products I've engineered.
            </p>
          </motion.div>

          {/* Cards Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
            <AnimatePresence mode="popLayout">
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={`${project.title}-${startIndex}-${index}`}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    imgSrc={project.image}
                    link={project.link}
                    linkText={project.linkText}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <motion.div 
            variants={headerVariants}
            className="flex justify-center mt-16 md:mt-20"
          >
            <a
              href="/projects"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#BD4FF4]/50 hover:bg-[#BD4FF4]/10 text-white font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(189,79,244,0.15)] overflow-hidden"
            >
              <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_2s_infinite]" />
              <span className="text-sm tracking-widest uppercase font-bold text-gray-300 group-hover:text-white transition-colors relative z-10">
                Explore Full Archive
              </span>
              <div className="w-8 h-8 rounded-full bg-[#BD4FF4] flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(189,79,244,0.5)]">
                <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(50%); }
        }
      `}</style>
    </section>
  );
};

export default Projects;
