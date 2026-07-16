import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { PremiumButton } from "@/components/ui/premium-button";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      colorBase: string;
    }[] = [];

    const palettes = [
      "180, 80, 255", // Purple
      "216, 70, 239", // Fuchsia
      "253, 224, 71", // Yellow
    ];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        colorBase: palettes[Math.floor(Math.random() * palettes.length)],
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Interactive "repel" physics for a more dynamic feel
        if (distance < 150) {
          p.x -= dx * 0.01;
          p.y -= dy * 0.01;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.colorBase}, 0.7)`;
        ctx.shadowColor = `rgba(${p.colorBase}, 0.8)`;
        ctx.shadowBlur = p.size * 3;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#030305]"
    >
      {/* Background Ambience / Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[45vw] md:h-[45vw] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw] rounded-full bg-yellow-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[50vw] h-[50vw] md:w-[40vw] md:h-[40vw] rounded-full bg-fuchsia-900/10 blur-[130px] pointer-events-none" />

      {/* Particle Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-50 mix-blend-screen"
      />

      {/* Grid Overlay for Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20"
        style={{ maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)" }}
      ></div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 flex flex-col items-center max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Availability Status Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-md transition-colors hover:bg-white/[0.06] cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-medium text-white/70 tracking-wide">
            Available for new opportunities
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold mb-5 md:mb-8 tracking-tighter leading-tight relative break-words"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 relative z-10">
            blaze.
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-fuchsia-500 to-yellow-500 relative z-10">
            prakhar
          </span>
          {/* Headline Background Glow */}
          <span className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 blur-3xl opacity-20 -z-10 rounded-full"></span>
        </motion.h1>

        {/* Roles */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-5 gap-y-2 text-xs sm:text-sm md:text-base font-medium text-gray-400 mb-8 py-2 md:py-2.5 px-4 sm:px-8 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm shadow-xl w-auto max-w-full"
        >
          <span className="hover:text-white transition-colors cursor-pointer">Full-Stack Developer</span>
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(250,204,21,0.8)]"></span>
          <span className="hover:text-white transition-colors cursor-pointer">Cybersecurity</span>
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
          <span className="hover:text-white transition-colors cursor-pointer">AI & Machine Learning</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-400 max-w-[280px] sm:max-w-xl md:max-w-2xl mx-auto leading-normal sm:leading-relaxed mb-10 md:mb-12 font-light"
        >
          Crafting your digital presence with{" "}
          <span className="text-white font-medium relative whitespace-nowrap">
            style
            <span className="absolute -bottom-0.5 sm:-bottom-1 left-0 w-full h-[2px] bg-purple-500/80 rounded-full blur-[0.5px]"></span>
          </span>{" "}
          and{" "}
          <span className="text-white font-medium relative whitespace-nowrap">
            performance
            <span className="absolute -bottom-0.5 sm:-bottom-1 left-0 w-full h-[2px] bg-yellow-500/80 rounded-full blur-[0.5px]"></span>
          </span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full px-2 sm:px-0"
        >
          {/* Primary Button - Smooth & Matte */}
          <a
            href="#projects"
            className="group relative px-8 py-4 h-[56px] rounded-full overflow-hidden w-full sm:w-auto min-w-[200px] flex items-center justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] bg-gradient-to-b from-purple-600 to-purple-800 shadow-[0_6px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
          >
            {/* Whisper-soft Shimmer Glass Effect */}
            <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_2s_infinite]" />

            <span className="relative z-10 flex items-center gap-3 text-sm tracking-widest uppercase font-bold text-white transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:tracking-[0.18em]">
              <span className="whitespace-nowrap">View Projects</span>

              {/* Matte Yellow Accent Icon Container */}
              <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-yellow-400 group-hover:scale-[1.1] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex-shrink-0">
                {/* Ultra-Smooth Twin Arrow Slip */}
                <ArrowRight className="absolute inset-0 m-auto h-4 w-4 text-yellow-400 group-hover:translate-x-[150%] transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
                <ArrowRight className="absolute inset-0 m-auto h-4 w-4 text-purple-900 -translate-x-[150%] group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]" />
              </div>
            </span>
          </a>

          <PremiumButton href="#contact" variant="secondary" className="h-[56px] min-w-[200px]">
            Get in Touch
          </PremiumButton>
        </motion.div>
      </motion.div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </section>
  );
};

export default Hero;
