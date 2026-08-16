"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Play, Terminal, ArrowUpRight, Cpu, Code2, Check, Copy, Zap, ShieldCheck } from "lucide-react";

// Canvas background for slowly moving & twinkling galaxy stars
const StudioStarfield = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Create stars with smooth drift velocity
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25, // slow smooth drift
      vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.6 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.012 + 0.004,
      color: Math.random() > 0.4 ? "#ffffff" : Math.random() > 0.5 ? "#CC65F5" : "#E48A60",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((s) => {
        // Slow smooth spatial motion
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Twinkle opacity oscillation
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0.1) s.speed = -s.speed;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, s.alpha));
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        if (s.size > 1.2) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = s.color;
          ctx.fill();
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

const languages = [
  {
    id: "python",
    name: "Python 3",
    icon: "🐍",
    snippet: `import pyodide
import numpy as np

# Galaxy Orbital Physics Engine
def simulate_galaxy_orbit(stars=1000):
    positions = np.random.randn(stars, 3)
    velocities = np.cross(positions, [0, 0, 1])
    return f"Simulated {stars} cosmic bodies in 3D orbit."

print(simulate_galaxy_orbit())`,
    output: ">>> Output: Simulated 1000 cosmic bodies in 3D orbit. [Execution: 4ms]",
  },
  {
    id: "js",
    name: "JavaScript",
    icon: "⚡",
    snippet: `// BlazeCode Realtime JS Engine
class CosmicEngine {
  static computeVelocity(mass, radius) {
    const G = 6.6743e-11;
    return Math.sqrt((G * mass) / radius);
  }
}

console.log(\`Orbital V: \${CosmicEngine.computeVelocity(5.97e24, 6.37e6).toFixed(2)} m/s\`);`,
    output: ">>> Output: Orbital V: 7908.43 m/s [Execution: 2ms]",
  },
  {
    id: "cpp",
    name: "C++ (GCC)",
    icon: "⚙️",
    snippet: `#include <iostream>
#include <cmath>

int main() {
    std::cout << ">>> Initializing BlazeCode 3D Physics Core..." << std::endl;
    double light_speed = 299792458.0;
    std::cout << ">>> Speed of Light: " << light_speed << " m/s" << std::endl;
    return 0;
}`,
    output: ">>> Output: Initializing BlazeCode 3D Physics Core...\n>>> Speed of Light: 2.99792e+08 m/s [Compiled in 11ms]",
  },
  {
    id: "rust",
    name: "Rust",
    icon: "🦀",
    snippet: `fn main() {
    let nodes = vec!["Orion-1", "Centauri-9", "Andromeda-X"];
    println!("🌌 Connecting to BlazeCode WebAssembly Safety Mesh...");
    for (i, node) in nodes.iter().enumerate() {
        println!("  -> Node [{}] {} online", i + 1, node);
    }
}`,
    output: ">>> Output: 🌌 Connecting to BlazeCode WebAssembly Safety Mesh...\n  -> Node [1] Orion-1 online\n  -> Node [2] Centauri-9 online\n  -> Node [3] Andromeda-X online [Ran in 6ms]",
  },
];

const BlazeCodeStudioSection = () => {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [copied, setCopied] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedLang.snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = () => {
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
    }, 700);
  };

  return (
    <section
      id="blazecode-studio"
      className="relative py-24 md:py-32 bg-[#05040a] overflow-hidden border-t border-purple-500/10"
    >
      {/* 🌌 Twinkling & Drifting Galaxy Starfield Canvas */}
      <StudioStarfield />

      {/* Galaxy Background Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[480px] bg-gradient-to-r from-purple-900/20 via-fuchsia-900/20 to-indigo-950/20 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-12 left-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* LEFT COLUMN — HEADING & RUNTIME SELECTOR */}
          <div className="lg:col-span-6 space-y-7 text-left">
            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Try{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CC65F5] via-fuchsia-400 to-[#E48A60] drop-shadow-[0_0_25px_rgba(189,79,244,0.35)]">
                BlazeCode Studio
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-300/80 text-base md:text-lg font-light leading-relaxed">
              A high-performance online code editor with real-time in-browser compilation, WebAssembly security sandboxing, and instant multi-language execution.
            </p>

            {/* Interactive Runtime Selector Pills */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Select Language Runtime:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {languages.map((lang) => {
                  const isSelected = selectedLang.id === lang.id;
                  return (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedLang(lang)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border cursor-pointer ${
                        isSelected
                          ? "bg-purple-600/30 border-purple-400 text-white shadow-[0_0_20px_rgba(189,79,244,0.35)]"
                          : "bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                      }`}
                    >
                      <span>{lang.icon}</span>
                      <span>{lang.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.02] border border-purple-500/20 text-xs font-semibold text-gray-300 backdrop-blur-md">
                <Zap className="w-4 h-4 text-purple-400" />
                <span>WebAssembly 10x Fast</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/[0.02] border border-purple-500/20 text-xs font-semibold text-gray-300 backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Pyodide Sandbox</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="/studio/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(189,79,244,0.4)] hover:shadow-[0_0_45px_rgba(189,79,244,0.7)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Launch Studio IDE</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="/studio/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/[0.04] border border-purple-500/30 hover:border-purple-400 hover:bg-purple-600/20 text-gray-200 font-bold text-sm transition-all duration-300"
              >
                <GitBranch className="w-4 h-4 text-purple-400" />
                <span>Open Compiler</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN — ELEGANT GALAXY GLASS IDE MOCKUP */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-[#090716]/90 border border-purple-500/30 p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(189,79,244,0.18)] backdrop-blur-2xl group hover:border-purple-400/60 transition-all duration-500 overflow-hidden">
              
              {/* Glowing Top Gloss Line */}
              <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent pointer-events-none" />

              {/* IDE Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs font-mono text-gray-200 ml-2 flex items-center gap-1.5 font-bold">
                    <Code2 className="w-4 h-4 text-[#CC65F5]" />
                    BlazeCode Studio v2.0
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[11px] font-semibold text-gray-300 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                  <span className="text-[10px] px-2.5 py-1 rounded-lg bg-emerald-950/70 text-emerald-400 font-bold border border-emerald-500/30">
                    Engine Active
                  </span>
                </div>
              </div>

              {/* Live Animated Code Editor Window */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLang.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {/* Code Area */}
                  <div className="font-mono text-xs sm:text-[13px] text-gray-100 bg-[#030207] p-5 sm:p-6 rounded-2xl border border-white/10 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden leading-relaxed shadow-inner min-h-[180px]">
                    <pre className="whitespace-pre-wrap font-mono m-0 p-0 text-gray-200 font-medium">
                      {selectedLang.id === "python" && (
                        <>
                          <span className="text-purple-400 font-bold">import</span> pyodide{"\n"}
                          <span className="text-purple-400 font-bold">import</span> numpy <span className="text-purple-400 font-bold">as</span> np{"\n\n"}
                          <span className="text-gray-500 italic"># Galaxy Orbital Physics Engine</span>{"\n"}
                          <span className="text-purple-400 font-bold">def</span> <span className="text-blue-400 font-bold">simulate_galaxy_orbit</span>(stars=<span className="text-amber-300">1000</span>):{"\n"}
                          {"    "}positions = np.random.randn(stars, <span className="text-amber-300">3</span>){"\n"}
                          {"    "}velocities = np.cross(positions, [<span className="text-amber-300">0</span>, <span className="text-amber-300">0</span>, <span className="text-amber-300">1</span>]){"\n"}
                          {"    "}<span className="text-purple-400 font-bold">return</span> <span className="text-emerald-400">f"Simulated &#123;stars&#125; cosmic bodies in 3D orbit."</span>{"\n\n"}
                          <span className="text-blue-300">print</span>(simulate_galaxy_orbit())
                        </>
                      )}
                      {selectedLang.id === "js" && (
                        <>
                          <span className="text-gray-500 italic">// BlazeCode Realtime JS Engine</span>{"\n"}
                          <span className="text-purple-400 font-bold">class</span> <span className="text-blue-400 font-bold">CosmicEngine</span> &#123;{"\n"}
                          {"  "}<span className="text-purple-400 font-bold">static</span> <span className="text-blue-400 font-bold">computeVelocity</span>(mass, radius) &#123;{"\n"}
                          {"    "}<span className="text-purple-400 font-bold">const</span> G = <span className="text-amber-300">6.6743e-11</span>;{"\n"}
                          {"    "}<span className="text-purple-400 font-bold">return</span> Math.sqrt((G * mass) / radius);{"\n"}
                          {"  "}&#125;{"\n"}
                          &#125;{"\n\n"}
                          console.<span className="text-blue-300">log</span>(<span className="text-emerald-400">`Orbital V: &#123;CosmicEngine.computeVelocity(5.97e24, 6.37e6).toFixed(2)&#125; m/s`</span>);
                        </>
                      )}
                      {selectedLang.id === "cpp" && (
                        <>
                          <span className="text-purple-400 font-bold">#include</span> <span className="text-emerald-400">&lt;iostream&gt;</span>{"\n"}
                          <span className="text-purple-400 font-bold">#include</span> <span className="text-emerald-400">&lt;cmath&gt;</span>{"\n\n"}
                          <span className="text-purple-400 font-bold">int</span> <span className="text-blue-400 font-bold">main</span>() &#123;{"\n"}
                          {"    "}std::cout &lt;&lt; <span className="text-emerald-400">"&gt;&gt;&gt; Initializing BlazeCode 3D Physics Core..."</span> &lt;&lt; std::endl;{"\n"}
                          {"    "}<span className="text-purple-400 font-bold">double</span> light_speed = <span className="text-amber-300">299792458.0</span>;{"\n"}
                          {"    "}std::cout &lt;&lt; <span className="text-emerald-400">"&gt;&gt;&gt; Speed of Light: "</span> &lt;&lt; light_speed &lt;&lt; <span className="text-emerald-400">" m/s"</span> &lt;&lt; std::endl;{"\n"}
                          {"    "}<span className="text-purple-400 font-bold">return</span> <span className="text-amber-300">0</span>;{"\n"}
                          &#125;
                        </>
                      )}
                      {selectedLang.id === "rust" && (
                        <>
                          <span className="text-purple-400 font-bold">fn</span> <span className="text-blue-400 font-bold">main</span>() &#123;{"\n"}
                          {"    "}<span className="text-purple-400 font-bold">let</span> nodes = <span className="text-blue-300 font-bold">vec!</span>[<span className="text-emerald-400">"Orion-1"</span>, <span className="text-emerald-400">"Centauri-9"</span>, <span className="text-emerald-400">"Andromeda-X"</span>];{"\n"}
                          {"    "}<span className="text-blue-300 font-bold">println!</span>(<span className="text-emerald-400">"Connecting to BlazeCode WebAssembly Safety Mesh..."</span>);{"\n"}
                          {"    "}<span className="text-purple-400 font-bold">for</span> (i, node) <span className="text-purple-400 font-bold">in</span> nodes.iter().enumerate() &#123;{"\n"}
                          {"        "}<span className="text-blue-300 font-bold">println!</span>(<span className="text-emerald-400">"  -&gt; Node [&#123;&#125;] &#123;&#125; online"</span>, i + <span className="text-amber-300">1</span>, node);{"\n"}
                          {"    "}&#125;{"\n"}
                          &#125;
                        </>
                      )}
                    </pre>
                  </div>

                  {/* Terminal Output */}
                  <div className="font-mono text-xs text-emerald-400 bg-emerald-950/25 p-4 rounded-xl border border-emerald-500/25 flex items-start gap-2.5 shadow-md">
                    <Terminal className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="whitespace-pre-wrap leading-relaxed">
                      {isCompiling ? ">>> Compiling code via WebAssembly Engine..." : selectedLang.output}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Interactive Simulation Bar */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-400 bg-white/[0.02] border border-white/10 px-3.5 py-2.5 rounded-xl flex-1 font-mono">
                  <Terminal className="w-3.5 h-3.5 text-[#CC65F5] shrink-0" />
                  <span className="truncate">"Executing {selectedLang.name} code..."</span>
                </div>

                <button
                  onClick={handleRunCode}
                  disabled={isCompiling}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(189,79,244,0.4)] active:scale-95 shrink-0 disabled:opacity-50 cursor-pointer"
                >
                  <Play className={`w-3.5 h-3.5 fill-current ${isCompiling ? 'animate-spin' : ''}`} />
                  <span>{isCompiling ? "Running..." : "Run Code"}</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlazeCodeStudioSection;




