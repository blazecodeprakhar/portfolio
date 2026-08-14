"use client";

import { motion } from "framer-motion";
import { GitBranch, Play, Terminal, ArrowUpRight, Cpu, Layers, Moon, Monitor, Laptop } from "lucide-react";

const languages = [
  { name: "Python 3", icon: "🐍", color: "from-blue-500/10 to-yellow-500/10 border-blue-500/30 text-blue-300" },
  { name: "JavaScript", icon: "⚡", color: "from-yellow-500/10 to-amber-500/10 border-yellow-500/30 text-yellow-300" },
  { name: "C++ (GCC)", icon: "⚙️", color: "from-indigo-500/10 to-blue-500/10 border-indigo-500/30 text-indigo-300" },
  { name: "C (GCC)", icon: "🔧", color: "from-cyan-500/10 to-teal-500/10 border-cyan-500/30 text-cyan-300" },
  { name: "Java 17", icon: "☕", color: "from-orange-500/10 to-red-500/10 border-orange-500/30 text-orange-300" },
  { name: "HTML5 / Web", icon: "🌐", color: "from-red-500/10 to-pink-500/10 border-red-500/30 text-pink-300" },
  { name: "Go", icon: "🐹", color: "from-sky-500/10 to-blue-500/10 border-sky-500/30 text-sky-300" },
  { name: "Rust", icon: "🦀", color: "from-amber-600/10 to-orange-600/10 border-amber-500/30 text-amber-300" },
];

const BlazeCodeStudioSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="blazecode-studio" className="relative py-20 md:py-28 bg-[#050509] overflow-hidden border-t border-b border-white/[0.04]">
      {/* Background Gradients & Micro Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[380px] bg-gradient-to-r from-[#BD4FF4]/10 via-purple-600/10 to-[#E48A60]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center"
        >
          {/* LEFT CONTENT COLUMN */}
          <motion.div variants={itemVariants} className="lg:col-span-6 space-y-7 text-left">
            {/* Badge without Sparkles icon */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-[#BD4FF4] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300">
                NEW RELEASE • LIVE WEB COMPILER
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Try{" "}
              <span 
                className="text-transparent bg-clip-text bg-[length:200%_auto] animate-[pan-gradient_4s_linear_infinite]"
                style={{
                  backgroundImage: "linear-gradient(to right, #BD4FF4, #E48A60, #a855f7, #BD4FF4)"
                }}
              >
                BlazeCode Studio
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
              A powerful online code editor with multi-language support, real-time in-browser code execution, light/dark themes, and integrated code generator logic.
            </p>

            {/* Language Chips */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                Supported Compilers & Runtimes:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {languages.map((lang, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r ${lang.color} border border-white/10 backdrop-blur-sm hover:border-[#BD4FF4]/40 hover:-translate-y-0.5 transition-all duration-300 cursor-default`}
                  >
                    <span>{lang.icon}</span>
                    <span>{lang.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="/studio/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#BD4FF4] to-[#E48A60] text-white font-semibold text-sm tracking-wide shadow-[0_10px_25px_rgba(189,79,244,0.3)] hover:shadow-[0_15px_35px_rgba(189,79,244,0.5)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Try BlazeCode Studio</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="/studio/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] text-gray-300 font-medium text-sm transition-all"
              >
                <GitBranch className="w-4 h-4 text-[#BD4FF4]" />
                <span>Open Code IDE</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT PREVIEW CARD */}
          <motion.div variants={itemVariants} className="lg:col-span-6">
            <div className="relative rounded-2xl bg-[#0c0c14] border border-white/10 p-5 sm:p-6 shadow-2xl backdrop-blur-xl group hover:border-[#BD4FF4]/50 transition-all duration-500">
              
              {/* Top Bar Mockup */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs font-mono text-gray-400 ml-2 flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-[#BD4FF4]" />
                    BlazeCode Studio v2.0
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/30">
                    Pyodide Active
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    <Moon className="w-3 h-3" />
                    <span>Dark</span>
                  </div>
                </div>
              </div>

              {/* Code Snippet Editor Simulation */}
              <div className="font-mono text-xs text-gray-300 space-y-2 bg-[#07070e] p-4.5 rounded-xl border border-white/5 overflow-x-auto leading-relaxed">
                <div><span className="text-purple-400">import</span> pyodide</div>
                <div><span className="text-purple-400">def</span> <span className="text-blue-400">run_compiler</span>(code, lang=<span className="text-emerald-400">"python"</span>):</div>
                <div className="pl-4 text-gray-400"># BlazeCode Compiler & Code Runner Engine</div>
                <div className="pl-4">print(<span className="text-emerald-400">"Compiling python via BlazeCode..."</span>)</div>
                <div className="pl-4"><span className="text-purple-400">return</span> <span className="text-amber-300">"Execution Ready for code"</span></div>
                <div className="pt-2 text-emerald-400">&gt;&gt;&gt; Output: Program Executed Successfully in 12ms.</div>
              </div>

              {/* Bottom Simulation Bar */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-400 bg-white/[0.02] border border-white/10 px-3 py-2 rounded-lg flex-1">
                  <Terminal className="w-3.5 h-3.5 text-[#BD4FF4] shrink-0" />
                  <span className="truncate">"write a pattern printing program..."</span>
                </div>
                <a
                  href="/studio/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#BD4FF4]/20 border border-[#BD4FF4]/40 hover:bg-[#BD4FF4]/30 text-purple-200 rounded-lg font-medium flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Run</span>
                </a>
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlazeCodeStudioSection;
