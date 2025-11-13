import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

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
    }[] = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.8,
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
        if (distance < 180) {
          p.x += dx * 0.002;
          p.y += dy * 0.002;
        }
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(180, 80, 255, 0.7)";
        ctx.shadowColor = "rgba(180, 80, 255, 0.8)";
        ctx.shadowBlur = 8;
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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a10] via-[#0d0d18] to-[#07070d]"
    >
      {/* Particle Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-40"
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 animate-fade-in">
        {/* Responsive BlazeForge text */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold mb-2 sm:mb-4 tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-violet-400 drop-shadow-[0_0_25px_rgba(180,80,255,0.4)]">
            BlazeForge
          </span>
        </h1>

        {/* Smaller and tighter paragraph for phone */}
        <p className="text-base sm:text-lg md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-md sm:max-w-2xl mx-auto leading-snug sm:leading-relaxed">
          Crafting your digital presence with{" "}
          <span className="text-purple-400 font-medium">style</span> and{" "}
          <span className="text-purple-400 font-medium">performance</span>.
        </p>

        <div className="flex justify-center gap-4 sm:gap-6 text-gray-400 text-sm sm:text-lg mb-10 sm:mb-12">
          <span className="hover:text-purple-400 transition-colors">
            Developer
          </span>
          <span className="text-purple-500">•</span>
          <span className="hover:text-purple-400 transition-colors">
            Designer
          </span>
          <span className="text-purple-500">•</span>
          <span className="hover:text-purple-400 transition-colors">
            Photographer
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">
          <a
            href="#projects"
            className="px-7 sm:px-8 py-3 sm:py-4 rounded-full bg-purple-600 hover:bg-purple-500 font-semibold text-white transition-all duration-300 shadow-[0_0_15px_rgba(180,80,255,0.6)] hover:shadow-[0_0_25px_rgba(180,80,255,0.9)] transform hover:scale-105 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            View Projects
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>

          <a
            href="#contact"
            className="px-7 sm:px-8 py-3 sm:py-4 rounded-full border border-purple-400 text-purple-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 transform hover:scale-105 font-semibold text-sm sm:text-base"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
