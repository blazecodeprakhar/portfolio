import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, MapPin, Mail, Phone, Briefcase, GraduationCap, Github, Linkedin, BrainCircuit, Database, Server, Component, Code2, Bot, Download } from "lucide-react";

const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  
  // Mouse tracking for parallax glows
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Check if we are on a desktop device to selectively enable parallax
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth springs for a very fluid, "underwater" feel
  const springConfig = { damping: 30, stiffness: 35 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transforms to move the glows subtly
  const leftCircleX = useTransform(springX, [-1, 1], ["calc(-50% - 40px)", "calc(-50% + 40px)"]);
  const leftCircleY = useTransform(springY, [-1, 1], ["calc(-50% - 40px)", "calc(-50% + 40px)"]);

  const rightCircleX = useTransform(springX, [-1, 1], ["calc(33% + 45px)", "calc(33% - 45px)"]);
  const rightCircleY = useTransform(springY, [-1, 1], ["calc(0% + 45px)", "calc(0% - 45px)"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Only run on non-touch desktop screens to explicitly optimize mobile performance
    if (!containerRef.current || !isDesktop) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates from -1 to 1 based on the center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    mouseX.set((x - centerX) / centerX);
    mouseY.set((y - centerY) / centerY);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="about"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-32 bg-[#07070d] overflow-hidden"
    >
      {/* Background Ambient Glows tracked to cursor + slow natural breathing */}
      <motion.div 
        style={{ x: leftCircleX, y: leftCircleY }}
        animate={{ 
          scale: [1, 1.05, 1], 
          opacity: [0.6, 0.8, 0.6] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-600/15 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" 
      />
      <motion.div 
        style={{ x: rightCircleX, y: rightCircleY }}
        animate={{ 
          scale: [1, 1.08, 1], 
          opacity: [0.5, 0.7, 0.5] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/4 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-fuchsia-600/15 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" 
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16 md:mb-24">
            <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-purple-400 uppercase mb-3">
              Discover Who I Am
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Behind the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-violet-400 drop-shadow-[0_0_15px_rgba(180,80,255,0.3)]">Code</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
            
            {/* Profile Card Section */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-5 lg:sticky lg:top-32 self-start w-full"
            >
              <div className="glass p-8 sm:p-10 lg:p-8 xl:p-10 rounded-[2rem] border border-white/[0.08] shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col items-center lg:items-start space-y-10 relative overflow-hidden bg-white/[0.01]">
                {/* Top highlight bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-violet-500 opacity-80" />

                <div className="relative group mx-auto lg:mx-0 w-full flex justify-center lg:justify-start">
                  {/* Custom Snake Border wrapper for the DP */}
                  <div className="snake-border w-56 h-56 sm:w-72 sm:h-72 lg:w-64 lg:h-64 xl:w-80 xl:h-80 mx-auto lg:mx-0 relative z-10">
                    <div className="snake-inner w-full h-full bg-[#0d0d18] overflow-hidden">
                      <img
                        src="/assets/dp.jpeg"
                        alt="Prakhar Yadav"
                        className="w-full h-full object-cover rounded-[1.6rem] opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <motion.div 
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-4 -right-2 sm:-right-4 lg:-right-6 glass px-5 py-3 rounded-2xl border border-purple-500/40 shadow-[0_0_20px_rgba(180,80,255,0.3)] backdrop-blur-md z-20 flex flex-col items-center"
                  >
                    <p className="text-lg sm:text-xl font-bold text-white mb-0 leading-tight tracking-tight">Prakhar</p>
                    <p className="text-purple-300 text-[10px] sm:text-xs font-semibold uppercase tracking-widest mt-0.5">Yadav</p>
                  </motion.div>

                  {/* Background decorative dots */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/30 to-transparent rounded-full blur-2xl z-0" />
                </div>

                {/* Socials & Resume CTA */}
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-4 w-full">
                  <a
                    href="/Prakhar_Resume.pdf"
                    download="Prakhar_Resume.pdf"
                    className="group relative flex-1 w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#BD4FF4]/50 hover:bg-[#BD4FF4]/10 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(189,79,244,0.15)] overflow-hidden"
                  >
                    <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] md:group-hover:animate-[shimmer_2s_infinite]" />
                    <span className="text-xs sm:text-sm tracking-widest uppercase font-bold text-gray-300 group-hover:text-white transition-colors relative z-10 w-full sm:w-auto text-center">
                      Download Resume
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#BD4FF4] flex items-center justify-center shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(189,79,244,0.5)]">
                      <Download className="h-4 w-4 text-white group-hover:translate-y-0.5 transition-transform" />
                    </div>
                  </a>
                  <div className="flex items-center gap-3">
                    <a href="https://github.com/blazecodeprakhar" target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/20 text-gray-300 hover:text-white transition-all transform hover:-translate-y-1 group hover:shadow-[0_0_15px_rgba(180,80,255,0.4)]">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/prakhar-yadav096/" target="_blank" rel="noopener noreferrer" className="p-3.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-fuchsia-500/50 hover:bg-fuchsia-500/20 text-gray-300 hover:text-white transition-all transform hover:-translate-y-1 group hover:shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-7 space-y-10 lg:pt-4"
            >
              {/* About Text */}
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-white">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">About Me</span>
                </h4>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-light text-justify sm:text-left">
                  I am a <strong className="text-white font-medium">Full-Stack Web Developer</strong> with hands-on experience in frontend development, backend development, REST APIs, databases, and authentication systems. I have experience building production-ready web projects and continually advancing my skills in modern web technologies.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
                {/* Experience */}
                <div className="space-y-6 md:pr-4">
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <Briefcase className="text-fuchsia-400 w-5 h-5"/> Experience
                  </h4>
                  <div className="relative border-l border-white/10 pl-6 space-y-8">
                    <div className="relative group">
                      <div className="absolute -left-[29px] bg-[#07070d] border border-fuchsia-500/50 p-1 rounded-full group-hover:border-fuchsia-400 transition-colors">
                        <div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full group-hover:scale-150 transition-transform" />
                      </div>
                      <p className="text-xs text-fuchsia-400 font-mono mb-1 tracking-wider">JUNE 2025</p>
                      <h5 className="text-white font-semibold text-base sm:text-lg">Full-Stack Developer</h5>
                      <p className="text-xs text-purple-200/60 mt-0.5">Freelance Projects</p>
                      <p className="text-sm text-gray-500 mt-3 leading-relaxed group-hover:text-gray-400 transition-colors">
                        Developed and deployed full-stack web applications, integrating frontend (React, HTML, CSS) and backend (Node.js, Express) with databases like MongoDB and Firebase. Implemented user authentication, APIs, and responsive design.
                      </p>
                    </div>

                    <div className="relative group">
                      <div className="absolute -left-[29px] bg-[#07070d] border border-purple-500/50 p-1 rounded-full group-hover:border-purple-400 transition-colors">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover:scale-150 transition-transform" />
                      </div>
                      <p className="text-xs text-purple-400 font-mono mb-1 tracking-wider">JANUARY 2026</p>
                      <h5 className="text-white font-semibold text-base sm:text-lg">AI & ML Enthusiast</h5>
                      <p className="text-xs text-purple-200/60 mt-0.5">Self-Learning</p>
                      <p className="text-sm text-gray-500 mt-3 leading-relaxed group-hover:text-gray-400 transition-colors">
                        Currently upskilling in AI/ML concepts, focusing on Python and modern AI tools. Learning model building, basic algorithms, and integrating AI functionalities into web projects for future applications.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <GraduationCap className="text-violet-400 w-5 h-5"/> Education
                  </h4>
                  <div className="relative border-l border-white/10 pl-6 space-y-8">
                    <div className="relative group">
                      <div className="absolute -left-[29px] bg-[#07070d] border border-violet-500/50 p-1 rounded-full group-hover:border-violet-400 transition-colors">
                        <div className="w-1.5 h-1.5 bg-violet-500 rounded-full group-hover:scale-150 transition-transform" />
                      </div>
                      <p className="text-xs text-violet-400 font-mono mb-1 tracking-wider">EXPECTED: MAY 2028</p>
                      <h5 className="text-white font-semibold text-base sm:text-lg leading-snug">B.Tech In Computer Science</h5>
                      <p className="text-sm text-violet-300 font-medium">(AI & ML)</p>
                      <p className="text-sm text-gray-400 mt-2">DIT University, Dehradun</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-5 pt-4">
                <h4 className="text-xl font-bold text-white">
                  Skills <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-violet-400 opacity-60 text-sm ml-2 font-normal">/ Technologies</span>
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { name: "Frontend (React, HTML5, CSS3)", icon: Component, color: "text-purple-400" },
                    { name: "Backend (Node.js, Express)", icon: Server, color: "text-fuchsia-400" },
                    { name: "Databases (MongoDB, Firebase, PostgreSQL)", icon: Database, color: "text-violet-400" },
                    { name: "API Integration & Auth", icon: Code2, color: "text-purple-300" },
                    { name: "AI-Driven Insights", icon: BrainCircuit, color: "text-fuchsia-300" },
                    { name: "AI-Powered Automation", icon: Bot, color: "text-violet-300" }
                  ].map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-purple-500/10 hover:border-purple-500/40 transition-all cursor-default group">
                      <skill.icon className={`w-4 h-4 ${skill.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* Shimmer animation for the CTA button */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(50%); }
        }
      `}</style>
    </section>
  );
};

export default About;
