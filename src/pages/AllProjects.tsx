import { useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProjectCard } from "@/components/ui/project-card";
import { ThemeProvider } from "next-themes";

const fullStackProjects = [
    {
        title: "AskAI - Intelligent Chat SaaS",
        description: "A full-stack AI chat application using React, TypeScript, and Supabase, integrated with Google Gemini AI for smart conversations and document understanding, including chat with images, PDFs, and text files.",
        link: "https://askaichat.netlify.app/",
        image: "/assets/askai.png",
    },
    {
        title: "BrightSmile Dental",
        description: "This website supports multiple languages with full online appointment and patient interaction features.",
        link: "https://brightsmileee.netlify.app/",
        image: "/assets/brightsmile-dental.png",
    },
    {
        title: "RenTelMe",
        description: "Developed a full-stack premium rental web app featuring secure property listings, community insights, and a modern responsive UI. (Work in Progress)",
        link: "https://rentelme.netlify.app",
        image: "/assets/rentelme.png",
    },
];

const websiteProjects = [
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
        description: "Sagar Fitness – Online Fitness Coaching & Transformation Website",
        link: "https://sagarfitnessdemo.netlify.app/",
        image: "/assets/sagar-fitness.png",
    },
];

const gameProjects = [
    {
        title: "Territory Clash",
        description: "A fast-paced territory capture game built by prakhar.dev. Conquer land, protect your trail, and dominate the map!",
        link: "https://territory-clash-v2.netlify.app/",
        image: "/assets/territory-clash.png",
    },
];

const aiProjects = [
    {
        title: "AskAI - Intelligent Chat SaaS",
        description: "A full-stack AI chat application using React, TypeScript, and Supabase, integrated with Google Gemini AI for smart conversations and document understanding.",
        link: "https://askaichat.netlify.app/",
        image: "/assets/askai.png",
    },
    {
        title: "AI Image Generator",
        description: "An AI-powered image generation tool that creates unique artwork from text prompts using advanced diffusion models.",
        link: "https://blazecodeprakhar.github.io/ai-art-generator/",
        image: "/assets/ai-image-generator.png",
    },
];

const otherProjects = [
    {
        title: "Universal Video Downloader",
        description: "A powerful, production-ready video downloader for YouTube and Instagram. Built with Node.js, Express, and yt-dlp, featuring a modern, fully responsive UI.",
        link: "https://universal-video-downloader-production.up.railway.app/",
        image: "/assets/universal-video-downloader.png",
    },
];

const ProjectSection = ({ title, projects }: { title: string; projects: any[] }) => {
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
                            }, index * 100);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    if (projects.length === 0) return null;

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div ref={sectionRef}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 border-l-4 border-primary pl-4">
                        {title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={`${project.title}-${index}`}
                                className="project-card opacity-0"
                                title={project.title}
                                description={project.description}
                                imgSrc={project.image}
                                link={project.link}
                                linkText={project.linkText}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const AllProjects = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <div className="min-h-screen bg-background text-foreground flex flex-col">
                <Navbar />
                <main className="flex-grow pt-24 pb-16">
                    <div className="container mx-auto px-4 md:px-6 mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            All Projects
                        </h1>
                        <p className="text-center text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
                            Explore my complete portfolio of works, ranging from full-stack applications to experimental AI tools and games.
                        </p>
                    </div>

                    <ProjectSection title="Full-Stack Web Development" projects={fullStackProjects} />
                    <ProjectSection title="Standard Websites" projects={websiteProjects} />
                    <ProjectSection title="Games" projects={gameProjects} />
                    <ProjectSection title="AI Tech" projects={aiProjects} />
                    <ProjectSection title="Other Projects" projects={otherProjects} />
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default AllProjects;
