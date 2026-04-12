"use client";

import { motion } from "framer-motion";
import { 
  Code2, Server, Palette, Database, Sparkles, Wrench, 
  Video, Camera, Layout, FileCode2, GitBranch, ShieldAlert, Cpu
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend & Design",
    skills: [
      { name: "React.js & Ecosystem", percentage: 85, icon: <Layout className="w-5 h-5 text-purple-400" /> },
      { name: "UI / UX Engineering", percentage: 75, icon: <Palette className="w-5 h-5 text-fuchsia-400" /> },
      { name: "HTML5 & Modern CSS", percentage: 90, icon: <FileCode2 className="w-5 h-5 text-violet-400" /> },
    ]
  },
  {
    title: "Backend & Systems",
    skills: [
      { name: "Node.js & Express", percentage: 80, icon: <Server className="w-5 h-5 text-purple-400" /> },
      { name: "Database Engineering", percentage: 70, icon: <Database className="w-5 h-5 text-fuchsia-400" /> },
      { name: "RESTful API Integration", percentage: 85, icon: <Code2 className="w-5 h-5 text-violet-400" /> },
    ]
  },
  {
    title: "AI & Cybersecurity",
    skills: [
      { name: "AI/ML Basics & Python", percentage: 65, icon: <Cpu className="w-5 h-5 text-purple-400" /> },
      { name: "AI-Assisted Development", percentage: 75, icon: <Sparkles className="w-5 h-5 text-fuchsia-400" /> },
      { name: "Ethical Hacking Elements", percentage: 60, icon: <ShieldAlert className="w-5 h-5 text-violet-400" /> },
    ]
  },
  {
    title: "Tooling & Creative",
    skills: [
      { name: "Git & Version Control", percentage: 80, icon: <GitBranch className="w-5 h-5 text-purple-400" /> },
      { name: "Modern Workflows", percentage: 75, icon: <Wrench className="w-5 h-5 text-fuchsia-400" /> },
      { name: "Photo & Video Prod.", percentage: 85, icon: <Camera className="w-5 h-5 text-violet-400" /> },
    ]
  }
];

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#07070d] to-[#0a0a10] overflow-hidden"
    >
      {/* Ambient Background Glows matching the About section */}
      <div className="absolute top-1/3 right-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-purple-600/15 rounded-full blur-[100px] md:blur-[120px] pointer-events-none translate-x-1/3" />
      <div className="absolute bottom-1/4 left-0 w-[250px] md:w-[350px] h-[250px] md:h-[350px] bg-fuchsia-600/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none -translate-x-1/3" />

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
              Technical Arsenal
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-violet-400 drop-shadow-[0_0_15px_rgba(180,80,255,0.3)]">Skills</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
            {skillCategories.map((category, catIdx) => (
              <motion.div key={category.title} variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <h4 className="text-xl md:text-2xl font-bold text-white tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">{category.title}</h4>
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, index) => (
                    <div 
                      key={skill.name}
                      className="group relative rounded-2xl p-4 sm:p-5 bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/40 hover:bg-white/[0.04] transition-all duration-300 hover:shadow-[0_0_30px_rgba(180,80,255,0.1)]"
                    >
                      <div className="flex items-center gap-4 sm:gap-5">
                        {/* Icon Wrapper */}
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0d0d18] border border-white/5 group-hover:scale-110 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(180,80,255,0.4)]">
                          {skill.icon}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-[1] min-w-0 pr-2">
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="text-white font-medium text-sm sm:text-base tracking-wide group-hover:text-purple-300 transition-colors truncate">
                              {skill.name}
                            </h5>
                            <motion.span 
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ duration: 1, delay: 0.5 }}
                              viewport={{ once: true }}
                              className="text-fuchsia-400 font-bold font-mono text-sm ml-4"
                            >
                              {skill.percentage}%
                            </motion.span>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="h-1.5 w-full bg-[#07070d] rounded-full overflow-hidden border border-white/[0.05] shadow-inner relative">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.percentage}%` }}
                              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                              viewport={{ once: true }}
                              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-violet-400 group-hover:shadow-[0_0_10px_rgba(180,80,255,0.8)] transition-shadow duration-300"
                            >
                              {/* Internal shimmer effect */}
                              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Injecting tailwind animation keyframes just for the shimmer */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default Skills;
